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
  complaint_type_title: yup.string().required("Complaint Type is required"),
  dept_name: yup.string().required("Department is required"),
  zone_name: yup.string().required("Zone is required"),
  ward_name: yup.string().required("Ward is required"),
  street_name: yup.string().required("Street is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  complaint: yup.string().required("Complaint is required"),
  complaint_details: yup.string().required("Description is required"),
});

const AttachmentSchema = yup.object().shape({
  attachment: yup
    .mixed()
    .required("Attachment is required")
    .test("fileSize", "File size is too large", (value) => {
      if (value && value[0]) {
        return value[0].size <= 5000000; // 5MB
      }
      return false;
    })
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
  const [autoFillData, setAutoFillData] = useState(null);

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

  useEffect(() => {
    if (contactNumber && PublicUser.data) {
      const user = PublicUser.data.find(
        (user) => user.phone === contactNumber
      );
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
      pincode:data.pincode
    };

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
    };

    const attachmentData = {
      attachment: data.attachment[0], // Accessing the first file in case of multiple
    };

    try {
      // Replace the below console.logs with actual API calls
      console.log("User Info:", userInfo);
      console.log("Grievance Details:", grievanceDetails);
      console.log("Attachment Data:", attachmentData);

      alert("Form submitted successfully!");
      reset();
    } catch (error) {
      console.error("Submission Error:", error);
      alert("An error occurred during submission. Please try again.");
    }
  };

  return (
    <>
      <div className="bg-blue-100 flex flex-col  px-10 text-start h-fit   font-lexend overflow-y-auto no-scrollbar">
        <h1 className="text-xl my-5">Grievance Form</h1>
        <div className=" flex-col justify-center items-center w-[592px] bg-white h-fit rounded-lg">
          <div className="border-b-2 border-search">
            <h1 className=" text-xl px-3 py-3">Request by</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col flex-nowrap overflow-hidden my-5 gap-2">
            <div className="flex justify-between font-normal mx-10">
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
                  className="w-6/5 text-start border-2 w-80 rounded-lg ml-2 px-2 py-2"
                  placeholder="Phone Number"
                  {...register("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs text-start px-2">
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between font-normal mx-10">
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
                  className="w-6/5 text-start border-2 w-80 rounded-lg ml-2 px-2 py-2"
                  placeholder="User Name"
                  {...register("public_user_name")}
                  defaultValue={autoFillData ? autoFillData.public_user_name : ""}
                />
                {errors.public_user_name && (
                  <p className="text-red-500 text-xs text-start px-2">
                    {errors.public_user_name.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-between font-normal mx-10">
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
                  className="w-6/5 text-start border-2 w-80 rounded-lg ml-2 px-2 py-2"
                  placeholder="abc@gmail.com"
                  {...register("email")}
                  defaultValue={autoFillData ? autoFillData.email : ""}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs text-start px-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-between font-normal mx-10">
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
                  className="w-6/5 text-start border-2 w-80 rounded-lg ml-2 px-2 py-2"
                  placeholder="Enter your Address"
                  {...register("address")}
                  defaultValue={autoFillData ? autoFillData.address : ""}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs text-start px-2">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>

            </div>
            
            <div className=" flex-col justify-center items-center w-[592px] bg-white h-fit rounded-lg mt-3">
              <div className="border-b-2 border-search">
                <h1 className=" text-xl px-3 py-3">Grievance Details</h1>
              </div>

              <div className="flex flex-col flex-nowrap overflow-hidden my-5 gap-2">
                <div className="grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 col-span-1"
                    htmlFor="grievance_mode"
                  >
                    Origin
                  </label>
                  <div className="border  rounded-lg col-span-2">
                    <select
                      className="block w-full px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200 outline-none"
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
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.grievance_mode.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 col-span-1"
                    htmlFor="complaint_type_title"
                  >
                    Complaint Type
                  </label>
                  <div className="border  rounded-lg col-span-2">
                    <select
                      className="block w-full px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("complaint_type_title")}
                    >
                      <option value="" disabled>
                        Select a Complaint Type
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
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.complaint_type_title.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 col-span-1"
                    htmlFor="dept_name"
                  >
                    Department
                  </label>
                  <div className="border  rounded-lg col-span-2">
                    <select
                      className="block w-full px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200 outline-none"
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
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.dept_name.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 col-span-1"
                    htmlFor="zone_name"
                  >
                    Zone
                  </label>
                  <div className="border  rounded-lg col-span-2">
                    <select
                      className="block w-full px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200 outline-none"
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
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.zone_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 col-span-1"
                    htmlFor="ward_name"
                  >
                    Ward
                  </label>
                  <div className="border  rounded-lg col-span-2">
                    <select
                      className="block w-full px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("ward_name")}
                    >
                      <option value="" disabled>
                        Select a Ward
                      </option>

                      {Ward.data &&
                        Ward.data.map((option) => (
                          <option key={option.ward_id} value={option.ward_name}>
                            {option.ward_name}
                          </option>
                        ))}
                    </select>
                    {errors.ward_name && (
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.ward_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg font-medium mb-2 col-span-1"
                    htmlFor="street_name"
                  >
                    Street
                  </label>
                  <div className="border  rounded-lg col-span-2">
                    <select
                      className="block w-full px-4 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200 outline-none"
                      defaultValue=""
                      {...register("street_name")}
                    >
                      <option value="" disabled>
                        Select a Street
                      </option>

                      {Street.data &&
                        Street.data.map((option) => (
                          <option key={option.street_id} value={option.street_name}>
                            {option.street_name}
                          </option>
                        ))}
                    </select>
                    {errors.street_name && (
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.street_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-3 font-normal mx-10">
              <label
                className="block text-black text-lg font-medium mb-2 col-span-1"
                htmlFor="pincode"
              >
                Pincode
              </label>
              <div className="flex flex-col col-span-2">
                <input
                  type="text"
                  id="pincode"
                  className=" text-start border-2  rounded-lg  px-2 py-2 outline-none"
                  placeholder="Pincode"
                  {...register("pincode")}
                  defaultValue={autoFillData ? autoFillData.pincode : ""}
                />
                {errors.pincode && (
                  <p className="text-red-500 text-xs text-start px-2">
                    {errors.pincode.message}
                  </p>
                )}
              </div>
            </div>
                <div className=" grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg  font-medium mb-2 col-span-1"
                    htmlFor="complaint"
                  >
                    Complaint
                  </label>
                  <div className="flex flex-col col-span-2">
                    <input
                      type="text"
                      id="complaint"
                      className=" text-start border-2 rounded-lg  px-2 py-2 outline-none"
                      placeholder="Complaint"
                      {...register("complaint")}
                    />
                    {errors.complaint && (
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.complaint.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg  font-medium mb-2 col-span-1"
                    htmlFor="complaint_details"
                  >
                    Description
                  </label>

                  <div className="flex flex-col col-span-2">
                    <textarea
                      id="complaint_details"
                      rows="5"
                      className="block  py-2.5 pl-3  w-full text-sm text-gray-900 rounded border border-gray-300 focus:outline-none focus:shadow-outline mb-2"
                      placeholder="Description here..."
                      {...register("complaint_details")}
                    ></textarea>
                    {errors.complaint_details && (
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.complaint_details.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className=" grid grid-cols-3  font-normal mx-10 ">
                  <label
                    className="block text-black text-lg  font-medium mb-2 col-span-1"
                    htmlFor="attachment"
                  >
                    Attachment
                  </label>
                  <div className="flex flex-col col-span-2">
                    <input
                      type="file"
                      id="attachment"
                      className=" py-2 px-2 rounded-lg outline-none"
                      {...register("attachment")}
                    />
                    {errors.attachment && (
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.attachment.message}
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
