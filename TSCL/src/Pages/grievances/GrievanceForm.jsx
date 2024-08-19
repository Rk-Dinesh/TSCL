import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchZone } from "../redux/slice/zone";
import { fetchWard } from "../redux/slice/ward";
import { fetchStreet } from "../redux/slice/street";
import { fetchDepartment } from "../redux/slice/department";
import { fetchComplaint } from "../redux/slice/complaint";
import { fetchPublic_User } from "../redux/slice/public_user";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API } from "../../Host";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate} from "react-router-dom";

// Validation Schemas
const UserInfoSchema = yup.object().shape({
  public_user_name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Contact number is required")
    .matches(/^[0-9]{10}$/, "Contact number must be 10 digits"),
  email: yup
    .string()
    .required("Email id is required")
    .email("Invalid email format"),
  address: yup.string().required("Address is required"),
});

const GrievanceDetailsSchema = yup.object().shape({
  grievance_mode: yup.string().required("Origin is required"),
  complaint_type_title: yup.string().required("Complaint  is required"),
  dept_name: yup.string().required("Department is required"),
  zone_name: yup.string().required("Zone is required"),
  ward_name: yup.string().required("Ward is required"),
  street_name: yup.string().required("Street is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  complaint: yup.string().required("Complaint Type is required"),
  complaint_details: yup.string().required("Description is required"),
});

const AttachmentSchema = yup.object().shape({
  file: yup.mixed().test("fileSize", "File size is too large", (value) => {
    if (value && value[0]) {
      return value[0].size <= 5000000; // 5MB
    }
    return true; // Allow no file
  }),
});

const CombinedSchema = yup
  .object()
  .shape({
    ...UserInfoSchema.fields,
    ...GrievanceDetailsSchema.fields,
    ...AttachmentSchema.fields,
  })
  .required();

const GrievanceForm = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
const [autoFillData, setAutoFillData] = useState(null);
const [filteredWards, setFilteredWards] = useState([]);
const [filteredStreets, setFilteredStreets] = useState([]);
const token = sessionStorage.getItem('token'); 

useEffect(() => {
  dispatch(fetchDepartment());
  dispatch(fetchComplaint());
  dispatch(fetchZone());
  dispatch(fetchWard());
  dispatch(fetchStreet());
  dispatch(fetchPublic_User());
}, [dispatch]);

const Department = useSelector((state) => state.department);
const Complaint = useSelector((state) => state.complaint);
const Zone = useSelector((state) => state.zone);
const Ward = useSelector((state) => state.ward);
const Street = useSelector((state) => state.street);
const PublicUser = useSelector((state) => state.publicUser);

const {
  register,
  formState: { errors },
  handleSubmit,
  reset,
  setValue,
  watch,
} = useForm({
  resolver: yupResolver(CombinedSchema),
  mode: "onBlur",
});

const contactNumber = watch("phone");
const zoneName = watch("zone_name"); 
const wardName = watch("ward_name");

useEffect(() => {
  if (zoneName) {
    const filteredWards = Ward.data.filter((ward) => ward.zone_name === zoneName);
    setFilteredWards(filteredWards);
  } else {
    setFilteredWards([]);
  }
}, [zoneName, Ward.data]);

useEffect(() => {
  if (wardName) {
    const filteredStreets = Street.data.filter(
      (street) => street.ward_name === wardName
    );
    setFilteredStreets(filteredStreets);
  } else {
    setFilteredStreets([]);
  }
}, [wardName, Street.data]);

useEffect(() => {
  if (contactNumber && PublicUser.data) {
    const user = PublicUser.data.find((user) => user.phone === contactNumber);
    if (user) {
      setAutoFillData(user);
      setValue("public_user_name", user.public_user_name);
      setValue("email", user.email);
      setValue("address", user.address);
      setValue("pincode", user.pincode);
    } else {
      setAutoFillData(null);
    }
  }
}, [contactNumber, PublicUser.data, setValue]);

const onSubmit = async (data) => {
  const userInfo = {
    public_user_name: data.public_user_name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    pincode: data.pincode,
    login_password: "tscl@123",
    verification_status: "active",
    user_status: "active",
  };

  const getPriorityFromComplaintType = (complaintTypeTitle) => {
    const complaint = Complaint.data.find((complaint) => complaint.complaint_type_title === complaintTypeTitle);
    return complaint ? complaint.priority : null;
  };

  let public_user_id;
  if (autoFillData) {
    const response = await axios.post(`${API}/public-user/post`, userInfo);
    public_user_id = autoFillData.public_user_id;
  } else {
    const response = await axios.post(`${API}/public-user/post`, userInfo);
    public_user_id = response.data.data.public_user_id;
  }

  const grievanceDetails = {
    grievance_mode: data.grievance_mode,
    complaint_type_title: data.complaint_type_title,
    dept_name: data.dept_name,
    zone_name: data.zone_name,
    ward_name: data.ward_name,
    street_name: data.street_name,
    pincode: data.pincode,
    complaint: data.complaint,
    complaint_details: data.complaint_details,
    public_user_id: public_user_id,
    public_user_name: data.public_user_name,
    phone: data.phone,
    status: "new",
    statusflow: "new",
    priority: getPriorityFromComplaintType(data.complaint_type_title),
  };

  const attachmentData = data.file
    ? {
        file: data.file[0],
      }
    : null;

  try {
    const response1 = await axios.post(
      `${API}/new-grievance/post`,
      grievanceDetails,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
    );

    const grievanceId = await response1.data.data.grievance_id;

    if (response1.status === 200) {
      toast.success("Grievance created Successfully");
    }

    if (attachmentData) {
      const fileInput = document.getElementById("file");
      const file = fileInput.files ? fileInput.files[0] : null;
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("grievance_id", grievanceId);
        formData.append("created_by_user", "admin");

        const response3 = await axios.post(
          `${API}/new-grievance-attachment/post`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response3.status === 200) {
          toast.success("Attachment created Successfully");
        }
      }
    }

    reset();
    navigate("/view", {
      state: { grievanceId: grievanceId },
    });
  } catch (error) {
    toast.error("An error occurred during submission. Please try again.");
  }
};

  return (
    <>
      <div className="bg-blue-100 flex flex-col  md:px-8 px-3 text-start h-fit   font-lexend overflow-y-auto no-scrollbar">
        <h1 className="text-xl my-5">Grievance Form</h1>
        <div className="  bg-white max-w-[592px] h-fit rounded-lg ">
          <div className="border-b-2 border-search">
            <h1 className=" text-xl px-3 py-3">Request by</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col flex-wrap overflow-hidden my-5 gap-2">
              <div className="flex flex-col md:flex-row  md:justify-between font-normal mx-10">
                <label
                  className="block text-black text-lg font-medium mb-2"
                  htmlFor="phone"
                >
                  Contact Number
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="phone"
                    className="w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none"
                    placeholder="Phone Number"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs text-start px-2 pt-2">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row  md:justify-between font-normal mx-10">
                <label
                  className="block text-black text-lg font-medium mb-2"
                  htmlFor="public_user_name"
                >
                  Name
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="public_user_name"
                    className="w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none"
                    placeholder="User Name"
                    {...register("public_user_name")}
                    defaultValue={
                      autoFillData ? autoFillData.public_user_name : ""
                    }
                  />
                  {errors.public_user_name && (
                    <p className="text-red-500 text-xs text-start px-2 pt-2">
                      {errors.public_user_name.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col md:flex-row  md:justify-between font-normal mx-10">
                <label
                  className="block text-black text-lg font-medium mb-2"
                  htmlFor="email"
                >
                  Email id
                </label>
                <div className="flex flex-col">
                  <input
                    type="email"
                    id="email"
                    className="w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none"
                    placeholder="abc@gmail.com"
                    {...register("email")}
                    defaultValue={autoFillData ? autoFillData.email : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs text-start px-2 pt-2">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col md:flex-row  md:justify-between font-normal mx-10">
                <label
                  className="block text-black text-lg font-medium mb-2 py-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <div className="flex flex-col">
                  <input
                    type="text"
                    id="address"
                    className="w-full md:w-80 text-start border-2  rounded-lg ml-2 px-2 py-2 outline-none"
                    placeholder="Enter your Address"
                    {...register("address")}
                    defaultValue={autoFillData ? autoFillData.address : ""}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs text-start px-2 pt-2">
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className=" flex-col justify-center items-center max-w-[592px] bg-white h-fit rounded-lg mt-5">
              <div className="border-b-2 border-search">
                <h1 className=" text-xl px-3 py-3">Grievance Details</h1>
              </div>

              <div className="flex flex-col flex-wrap overflow-y-auto my-5 gap-2 no-scrollbar">
                <div className="flex flex-col md:grid md:grid-cols-3  font-normal mx-10  ">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="grievance_mode"
                  >
                    Origin
                  </label>
                  <div className=" md:col-span-2">
                    <select
                      className="block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("grievance_mode")}
                    >
                      <option value="" disabled>
                        Select an Origin
                      </option>
                      <option value="Whatsapp">Whatsapp</option>
                      <option value="Call">Call</option>
                      <option value="Website">Website</option>
                    </select>
                    {errors.grievance_mode && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.grievance_mode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="complaint"
                  >
                    Complaint Type
                  </label>
                  <div className=" md:col-span-2">
                    <select
                      className="block w-full   px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("complaint")}
                    >
                      <option value="" disabled>
                        Select a Complaint Type
                      </option>

                      <option value="Organization">Organization</option>
                      <option value="Association">Association</option>
                      <option value="Individual">Individual</option>
                    </select>
                    {errors.complaint && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.complaint.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="complaint_type_title"
                  >
                    Complaint
                  </label>
                  <div className=" md:col-span-2">
                    <select
                      className="block w-full   px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("complaint_type_title")}
                    >
                      <option value="" disabled>
                        Select a Complaint 
                      </option>

                      {Complaint.data &&
                        Complaint.data.map((option) => (
                          <option
                            key={option.complaint_id}
                            value={option.complaint_type_title}
                          >
                            {option.complaint_type_title}
                          </option>
                        ))}
                    </select>
                    {errors.complaint_type_title && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.complaint_type_title.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="dept_name"
                  >
                    Department
                  </label>
                  <div className="md:col-span-2">
                    <select
                      className="block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("dept_name")}
                    >
                      <option value="" disabled>
                        Select a Department
                      </option>
                      {Department.data &&
                        Department.data.map((option) => (
                          <option key={option.dept_id} value={option.dept_name}>
                            {option.dept_name}
                          </option>
                        ))}
                    </select>
                    {errors.dept_name && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.dept_name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="zone_name"
                  >
                    Zone
                  </label>
                  <div className="md:col-span-2">
                    <select
                      className="block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("zone_name")}
                    >
                      <option value="" disabled>
                        Select a Zone
                      </option>

                      {Zone.data &&
                        Zone.data.map((option) => (
                          <option key={option.zone_id} value={option.zone_name}>
                            {option.zone_name}
                          </option>
                        ))}
                    </select>
                    {errors.zone_name && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.zone_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="ward_name"
                  >
                    Ward
                  </label>
                  <div className=" md:col-span-2">
                    <select
                      className="block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("ward_name")}
                    >
                      <option value="" disabled>
                        Select a Ward
                      </option>

                      {filteredWards &&
                        filteredWards.map((option) => (
                          <option key={option.ward_id} value={option.ward_name}>
                            {option.ward_name}
                          </option>
                        ))}
                    </select>
                    {errors.ward_name && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.ward_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="street_name"
                  >
                    Street
                  </label>
                  <div className="md:col-span-2">
                    <select
                      className="block w-full  px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("street_name")}
                    >
                      <option value="" disabled>
                        Select a Street
                      </option>

                      {filteredStreets &&
                        filteredStreets.map((option) => (
                          <option
                            key={option.street_id}
                            value={option.street_name}
                          >
                            {option.street_name}
                          </option>
                        ))}
                    </select>
                    {errors.street_name && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.street_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="gflex flex-col md:grid md:grid-cols-3   font-normal mx-10">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="pincode"
                  >
                    Pincode
                  </label>
                  <div className="flex flex-col md:col-span-2">
                    <input
                      type="text"
                      id="pincode"
                      className="w-full text-start border-2  rounded-lg  px-2 py-2 outline-none"
                      placeholder="Pincode"
                      {...register("pincode")}
                      defaultValue={autoFillData ? autoFillData.pincode : ""}
                    />
                    {errors.pincode && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.pincode.message}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className=" flex flex-col md:grid md:grid-cols-3   font-normal mx-10 ">
                  <label
                    className="block text-black text-lg  font-medium mb-2 md:col-span-1"
                    htmlFor="complaint_details"
                  >
                    Description
                  </label>

                  <div className="flex flex-col md:col-span-2">
                    <textarea
                      id="complaint_details"
                      rows="5"
                      className="block  py-2.5 pl-3  w-full  text-sm text-gray-900 rounded border border-gray-300 focus:outline-none focus:shadow-outline mb-2"
                      placeholder="Description here..."
                      {...register("complaint_details")}
                    ></textarea>
                    {errors.complaint_details && (
                      <p className="text-red-500 text-xs text-start px-2 ">
                        {errors.complaint_details.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
                  <label
                    className="block text-black text-lg  font-medium mb-2 md:col-span-1"
                    htmlFor="file"
                  >
                    Attachment <p className="text-xs ">(optional)</p>
                  </label>
                  <div className="flex flex-col md:col-span-2">
                    <input
                      type="file"
                      id="file"
                      className=" w-full py-2 px-2 rounded-lg outline-none"
                      {...register("file")}
                    />
                    {errors.file && (
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.file.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className=" text-center my-3">
                <button
                  type="submit"
                  className=" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 "
                  
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default GrievanceForm;
