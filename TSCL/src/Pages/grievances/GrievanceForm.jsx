import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchZone } from "../redux/slice/zone";
import { fetchDepartment } from "../redux/slice/department";
import { fetchComplaint } from "../redux/slice/complaint";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { API, formatDate1 } from "../../Host";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { fetchComplainttype } from "../redux/slice/complainttype";
import decryptData from "../../Decrypt";
import { RiExpandUpDownLine } from "react-icons/ri";
import { fetchWard } from "../redux/slice/ward";

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
  // zone_name: yup.string().required("Zone is required"),
  ward_name: yup.string().required("Ward is required"),
  street_name: yup.string().required("Street is required"),
  pincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits"),
  complaintaddress: yup.string().required("Complaint Address is required"),
  complaint: yup.string().required("Complaint Type is required"),
  complaint_details: yup.string().required("Description is required"),
});

const CombinedSchema = yup
  .object()
  .shape({
    ...UserInfoSchema.fields,
    ...GrievanceDetailsSchema.fields,
    // ...AttachmentSchema.fields,
  })
  .required();

const GrievanceForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSameAddress, setIsSameAddress] = useState(false);
  const [autoFillData, setAutoFillData] = useState(null);
  const [filteredWards, setFilteredWards] = useState([]);
  const [filteredStreets, setFilteredStreets] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([])
  const [files, setFiles] = useState([]);
  const [translatedLan, setTranslatedLan] = useState("");
  const token = localStorage.getItem("token");
  const [statusColors, setStatusColors] = useState({});
  const [grievance, setGrievance] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchComplaint());
    // dispatch(fetchZone());
    dispatch(fetchWard());
    dispatch(fetchComplainttype());
  }, [dispatch]);

  const Department = useSelector((state) => state.department);
  const Complaint = useSelector((state) => state.complaint);
  // const Zone = useSelector((state) => state.zone);
  const Ward = useSelector((state) => state.ward);
  const Complainttype = useSelector((state) => state.complainttype);

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
  // const zoneName = watch("zone_name");
  const wardName = watch("ward_name");
  const deptName = watch("dept_name");
  const complaintName =watch('complaint_type_title')
  const residentAddress = watch("address");

  useEffect(() => {
    axios
      .get(`${API}/new-grievance/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        const reverseData = responseData.reverse();
        setGrievance(reverseData);
      })
      .catch((error) => {
        console.error(error);
      });

    fetchActiveStatus();
  }, []);

  const fetchActiveStatus = async () => {
    try {
      const response = await axios.get(`${API}/status/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      const colorMapping = responseData.reduce((acc, status) => {
        acc[status.status_name] = status.color;
        return acc;
      }, {});

      setStatus(responseData);
      setStatusColors(colorMapping);
    } catch (err) {
      console.error("Error fetching existing ActiveStatus:", err);
    }
  };

  useEffect(() => {
    if (deptName) {
      axios
        .get(`${API}/complaint/getdept?dept_name=${deptName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          try {
            const responseData = decryptData(response.data.data);
            setFilteredComplaints(responseData);
            setValue("complaint_type_title", "");
          } catch (error) {
            console.error("Error decrypting data:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setFilteredComplaints([]);
    }
  }, [deptName]);



  useEffect(() => {
    if (wardName) {
      axios
        .get(`${API}/street/getward?ward_name=${wardName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          try {
            const responseData = decryptData(response.data.data);
            setFilteredStreets(responseData);
            setValue("street_name", "");
          } catch (error) {
            console.error("Error decrypting data:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      setFilteredStreets([]);
    }
  }, [wardName]);

  useEffect(() => {
    if (contactNumber && contactNumber.length === 10) {
      async function fetchAutoFillData() {
        try {
          const response = await axios.get(
            `${API}/public-user/getbyphone?phone=${contactNumber}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseData = decryptData(response.data.data);
          const autoFillData = responseData;
          setValue("public_user_name", autoFillData.public_user_name);
          setValue("email", autoFillData.email);
          setValue("address", autoFillData.address);
          setValue("pincode", autoFillData.pincode);
          setAutoFillData(autoFillData);
        } catch (error) {
          setAutoFillData(null);
        }
      }
      fetchAutoFillData();
    } else {
      setValue("public_user_name", "");
      setValue("email", "");
      setValue("address", "");
      setValue("pincode", "");
      setAutoFillData(null);
    }
  }, [contactNumber]);

  useEffect(() => {
    if (deptName && complaintName) {
      axios
        .get(`${API}/template/getbyquery?dept_name=${deptName}&complaint_type=${complaintName}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          try {
            const responseData = decryptData(response.data.data);
            setFilteredTemplates(responseData);
            setValue("complaint_details", "");
          } catch (error) {
            console.error("Error decrypting data:", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } 
  }, [deptName,complaintName]);


  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      toast.error("Maximum 5 files allowed");
      e.target.value = null;
    } else {
      setFiles(files);
    }
  };

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
      const complaint = Complaint.data.find(
        (complaint) => complaint.complaint_type_title === complaintTypeTitle
      );
      return complaint ? complaint.priority : null;
    };

    const getZone = (zonaName) => {
      const zone = Ward.data.find((value) => value.ward_name === zonaName);
      return zone ? zone.zone_name : null;
    };

    let public_user_id;
    if (autoFillData) {
      const response = await axios.post(`${API}/public-user/post`, userInfo);
      public_user_id = autoFillData.public_user_id;
    } else {
      const response = await axios.post(`${API}/public-user/post`, userInfo);
      public_user_id = decryptData(response.data.data);
    }
    const grievanceDetails = {
      grievance_mode: data.grievance_mode,
      complaint_type_title: data.complaint,
      dept_name: data.dept_name,
      zone_name: getZone(data.ward_name),
      ward_name: data.ward_name,
      street_name: data.street_name,
      pincode: data.pincode,
      complaintaddress: data.complaintaddress,
      complaint: data.complaint_type_title,
      complaint_details: data.complaint_details,
      public_user_id: public_user_id,
      public_user_name: data.public_user_name,
      phone: data.phone,
      status: "new",
      statusflow: "new",
      priority: getPriorityFromComplaintType(data.complaint_type_title),
    };

   

    try {
      const response1 = await axios.post(
        `${API}/new-grievance/post`,
        grievanceDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const grievanceId = await response1.data.data;

      if (response1.status === 200) {
        toast.success("Grievance created Successfully");
      }

      if (files.length > 0) {
        if (files.length > 5) {
          toast.error("File limit exceeded. Maximum 5 files allowed.");
        } else {
          try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
              formData.append("files", files[i]);
            }
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
              setFiles([]);
              toast.success("Attachment created Successfully");
            }
          } catch (error) {
            console.error(error);
            toast.error("Error creating attachment");
          }
        }
      }

      reset();

      navigate(`/view?grievanceId=${grievanceId}`)
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during submission. Please try again.");
    }
  };

  const handleTranslate = async (text, targetLanguage) => {
    try {
      const response = await axios.post(`${API}/translate/translate`, {
        text,
        targetLanguage,
      });
      return response.data.translatedText;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <div className="grid grid-cols-12 gap-3 mx-3  overflow-y-auto no-scrollbar">
      <div className="bg-blue-100 lg:col-span-6 md:col-span-12 col-span-12   text-start h-fit   font-lexend ">
        <h1 className="text-xl my-5">Grievance Form</h1>
        <div className="  bg-white w-full h-fit rounded-lg ">
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
                  Phone
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

                      {Complainttype.data &&
                        Complainttype.data.map((option,index) => (
                          <option
                            key={index}
                            value={option.complaint_type}
                          >
                            {option.complaint_type}
                          </option>
                        ))}
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
                        Department.data.map((option,index) => (
                          <option key={index} value={option.dept_name}>
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

                      {filteredComplaints &&
                        filteredComplaints.map((option,index) => (
                          <option
                            key={index}
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

                {/* <div className="flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
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
                </div> */}
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

                      {Ward.data &&
                        Ward.data.map((option,index) => (
                          <option key={index} value={option.ward_name}>
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
                        filteredStreets.map((option,index) => (
                          <option
                            key={index}
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
                <div className="flex flex-col md:grid md:grid-cols-3 font-normal mx-10">
                  <label
                    className="block text-black text-lg font-medium mb-2 md:col-span-1"
                    htmlFor="complaintaddress"
                  >
                    Complaint Address
                  </label>

                  <div className="flex flex-col md:col-span-2 border rounded p-1">
                    <div className="flex items-center gap-3 mb-2 mx-1">
                      <input
                        type="checkbox"
                        id="sameAsResidentAddress"
                        checked={isSameAddress}
                        onChange={(e) => {
                          setIsSameAddress(e.target.checked);
                          if (e.target.checked) {
                            setValue("complaintaddress", residentAddress);
                          } else {
                            setValue("complaintaddress", "");
                          }
                        }}
                      />
                      <label
                        className="text-black text-sm font-medium"
                        htmlFor="sameAsResidentAddress"
                      >
                        Same as Resident Address
                      </label>
                    </div>
                    <hr className="w-full" />
                    <textarea
                      id="complaintaddress"
                      rows="5"
                      className="block py-2.5 pl-3 w-full text-sm text-gray-900 rounded border-none outline-none focus:outline-none focus:shadow-outline mb-2"
                      placeholder="Complaint Address here..."
                      {...register("complaintaddress")} // Ensure this matches the schema
                    ></textarea>
                    {errors.complaintaddress && (
                      <p className="text-red-500 text-xs text-start px-2">
                        {errors.complaintaddress.message}
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

                  <div className="flex flex-col md:col-span-2 border rounded p-1">
                    <div className="flex justify-around items-center -mb-1 gap-3">
                    <select
                      className="block w-full  px-2 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50   hover:border-gray-200 outline-none"
                      defaultValue=""
                      onChange={(e) => {
                        const selectedTemplateId = e.target.value;
                        const selectedTemplate = filteredTemplates.find(
                          (template) => template.temp_id === selectedTemplateId
                        );
                        if (selectedTemplate) {
                          setValue("complaint_details", selectedTemplate.desc);
                        }
                      }}
                
                    >
                      <option value="" hidden>
                        Select a Template
                      </option>

                      {filteredTemplates &&
                        filteredTemplates.map((option,index) => (
                          <option
                            key={index}
                            value={option.temp_id}
                          >
                            {option.temp_title}
                          </option>
                        ))}
                    </select>
                      <select
                        className="block px-4 py-3 text-sm rounded-lg outline-none"
                        onChange={(e) => {
                          const targetLanguage = e.target.value;
                          const text = watch("complaint_details");
                          handleTranslate(text, targetLanguage).then(
                            (translatedText) => {
                              setValue("complaint_details", translatedText);
                            }
                          );
                        }}
                      >
                        <option hidden value="">
                          LAN
                        </option>
                        <option value="ta">EN - TA</option>
                        <option value="en">TA - EN</option>
                      </select>
                    </div>
                    <hr className="w-full" />
                    <textarea
                      id="complaint_details"
                      rows="5"
                      className="block py-2.5 pl-3 w-full text-sm text-gray-900 rounded border-none outline-none focus:outline-none focus:shadow-outline mb-2"
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
                <div className=" flex flex-col md:grid md:grid-cols-3    font-normal mx-10 ">
                  <label
                    className="block text-black text-lg  font-medium mb-2 md:col-span-1"
                    htmlFor="file"
                  >
                    Attachment{" "}
                    <p className="text-xs ">
                      (optional / <br /> upto 5 files allowed)
                    </p>
                  </label>
                  <div className="flex flex-col md:col-span-2">
                    <input
                      type="file"
                      id="file"
                      multiple
                      accept=".jpeg, .jpg, .png"
                      className=" w-full py-2 px-2 rounded-lg outline-none"
                      onChange={handleFileChange}
                    />
                    {files.length >= 5 && (
                      <p className="text-red-500 text-sm">
                        Maximum 5 files allowed
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className=" text-center my-3">
                <button
                  type="submit"
                  className=" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 mb-4"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className=" lg:col-span-6 md:col-span-12 col-span-12 font-lexend">
        <h1 className="text-xl my-5">Recent Grievances</h1>
        <div className="bg-white rounded-lg my-2 py-3 overflow-x-auto h-2/5 no-scrollbar">
          <table className="w-full mt-2 mx-3">
            <thead className="border-b border-gray-300">
              <tr className="">
                <th>
                  <p className=" my-2 text-start font-lexend font-normal text-base whitespace-nowrap">
                    Complaint
                  </p>
                </th>

                <th>
                  <p className="flex gap-2 items-center justify-start mx-2 my-2 font-lexend font-normal text-base whitespace-nowrap">
                  Raised by
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center justify-start mx-1  my-2 font-lexend font-normal text-base whitespace-nowrap">
                    Department
                  </p>
                </th>

                <th>
                  <p className="flex gap-2 items-center justify-center  my-2 font-lexend font-normal text-base whitespace-nowrap">
                  Assigned JE
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center justify-center  my-2 font-lexend font-normal text-base whitespace-nowrap">
                    Date/Time
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {grievance.slice(0, 10).map((report, index) => (
                <tr key={index}>
                  <td>
                    <p className="border-2 w-20 border-slate-900 rounded-lg text-center py-1 my-1 text-sm   text-slate-900"
                    onClick={() =>
                      navigate(`/view?grievanceId=${report.grievance_id}`)
                    }
                    >
                      {report.grievance_id}
                    </p>
                  </td>

                  <td>
                    {" "}
                    <p className="capitalize text-center mx-2   my-2 font-lexend whitespace-nowrap text-sm text-gray-700">
                    {report.public_user_name}
                    </p>
                  </td>
                  <td>
                    {" "}
                    <p className="capitalize text-start   my-2 font-lexend whitespace-nowrap text-sm text-gray-700">
                      {report.dept_name}
                    </p>
                  </td>
                  <td>
                  <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalize text-gray-700">
                        {report.assign_username
                          ? report.assign_username
                          : "Yet to be assigned"}
                      </p>
                  </td>
                  <td>
                  <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm text-gray-700">
                        {formatDate1(report.createdAt)}
                      </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GrievanceForm;
