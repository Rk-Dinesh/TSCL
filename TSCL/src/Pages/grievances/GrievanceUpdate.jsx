import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { API } from "../../Host";
import { fetchDepartment } from "../redux/slice/department";
import { fetchZone } from "../redux/slice/zone";
import decryptData from "../../Decrypt";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  grievance_mode: yup.string().required("Grievance mode is required"),
  dept_name: yup.string().required("Department is required"),
  complaint: yup.string().required("Complaint is required"),
  zone_name: yup.string().required("Zone is required"),
  ward_name: yup.string().required("Ward is required"),
  street_name: yup.string().required("Street is required"),
  complaintaddress: yup
    .string()
    .required("Complaint address is required")
    .min(5, "Address should have at least 5 characters"),
  complaint_details: yup
    .string()
    .required("Complaint details are required")
    .min(10, "Details should have at least 10 characters"),
});

const UpdateGrievanceForm = () => {
  const navigate = useNavigate()
  const grievanceId = new URLSearchParams(window.location.search).get(
    "grievanceId"
  );

  const [Departments, setDepartments] = useState([]);
  const [Zone, setZone] = useState([]);
  const [initialValues, setInitialValues] = useState(null)

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await axios.get(
          API_ENDPOINTS.GET_DEPT_DESIGNATIONACTIVE.url,
          {
            headers: API_ENDPOINTS.GET_DEPT_DESIGNATIONACTIVE.headers,
          }
        );
        const responseData = decryptData(response.data.data);
        setDepartments(responseData);
      } catch (error) {
        console.error("Error fetching existing Departments:", error);
      }
    };

    const fetchZones = async () => {
      try {
        const response = await axios.get(`${API}/zone/getactive`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = decryptData(response.data.data);
        setZone(responseData);
      } catch (error) {
        console.error("Error fetching existing roles:", error);
      }
    };

    fetchDepartment();
    fetchZones();
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      grievance_mode: "",
      dept_name: "",
      complaint: "",
      zone_name: "",
      ward_name: "",
      street_name: "",
      complaintaddress: "",
      complaint_details: "",
    },
  });

  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [filteredWards, setFilteredWards] = useState([]);
  const [filteredStreets, setFilteredStreets] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`${API}/new-grievance/getbyid?grievance_id=${grievanceId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const responseData = decryptData(response.data.data);
        setInitialValues(responseData);
        //console.log(responseData);

        Object.keys(responseData).forEach((key) => {
          setValue(key, responseData[key]);
        });
      })
      .catch((error) => console.error("Error fetching grievance data:", error));
  }, [grievanceId, setValue]);

  const deptName = watch("dept_name");
  const zoneName = watch("zone_name");
  const wardName = watch("ward_name");

  useEffect(() => {
    if (deptName) {
      axios
        .get(`${API}/complaint/getdept?dept_name=${deptName}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const responseData = decryptData(response.data.data);
          setFilteredComplaints(responseData);
          setValue("complaint", "");
        })
        .catch((error) => console.error("Error fetching complaints:", error));
    } else {
      setFilteredComplaints([]);
    }
  }, [deptName]);

  useEffect(() => {
    if (zoneName) {
      axios
        .get(`${API}/ward/getzone?zone_name=${zoneName}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const responseData = decryptData(response.data.data);
          setFilteredWards(responseData);
          setValue("ward_name", "");
        })
        .catch((error) => console.error("Error fetching wards:", error));
    } else {
      setFilteredWards([]);
      setFilteredStreets([]);
    }
  }, [zoneName]);

  useEffect(() => {
    if (wardName) {
      axios
        .get(`${API}/street/getward?ward_name=${wardName}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const responseData = decryptData(response.data.data);
          setFilteredStreets(responseData);
          setValue("street_name", "");
        })
        .catch((error) => console.error("Error fetching streets:", error));
    } else {
      setFilteredStreets([]);
    }
  }, [wardName]);

  const onSubmit = async (data) => {
    try {
     
      let logDetails = "";
  
      if (data.grievance_mode !== initialValues.grievance_mode) {
        logDetails += `Grievance Mode changed from '${initialValues.grievance_mode}' to '${data.grievance_mode}'. `;
      }
      if (data.dept_name !== initialValues.dept_name) {
        logDetails += `Department Name changed from '${initialValues.dept_name}' to '${data.dept_name}'. `;
      }
      if (data.complaint !== initialValues.complaint) {
        logDetails += `Complaint changed from '${initialValues.complaint}' to '${data.complaint}'. `;
      }
      if (data.ward_name !== initialValues.ward_name) {
        logDetails += `Ward Name changed from '${initialValues.ward_name}' to '${data.ward_name}'. `;
      }
      if (data.street_name !== initialValues.street_name) {
        logDetails += `Street Name changed from '${initialValues.street_name}' to '${data.street_name}'. `;
      }
      if (data.complaintaddress !== initialValues.complaintaddress) {
        logDetails += `Complaint Address changed from '${initialValues.complaintaddress}' to '${data.complaintaddress}'. `;
      }
      if (data.complaint_details !== initialValues.complaint_details) {
        logDetails += `Complaint Details changed from '${initialValues.complaint_details}' to '${data.complaint_details}'. `;
      }
  
      // If no changes were made, set a default message
      if (!logDetails) {
        logDetails = "No significant changes were made.";
      }
  
      // Prepare formData for updating the grievance
      const formData = {
        grievance_mode: data.grievance_mode,
        dept_name: data.dept_name,
        complaint: data.complaint,
        ward_name: data.ward_name,
        street_name: data.street_name,
        complaintaddress: data.complaintaddress,
        complaint_details: data.complaint_details,
      };
  
      // API call to update grievance
      const response = await axios.put(
        `${API}/new-grievance/update-grievance?grievance_id=${grievanceId}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      toast.success("Grievance updated successfully!");
  
      // Log changes to grievance logs
      await axios.post(
        `${API}/grievance-log/post`,
        {
          grievance_id: grievanceId,
          log_details: `${logDetails} by opertor ${localStorage.getItem('name')}`,
          created_by_user: localStorage.getItem("name"),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Navigate back to the request view
      navigate("/requestview1");
    } catch (error) {
      console.error("Error updating grievance:", error);
      toast.error("Failed to update grievance");
    }
  };
  

  return (
    <div className="max-w-5xl mx-8 bg-white shadow-md rounded-lg p-6 mt-8 font-lexend">
      <h2 className="text-xl font-bold mb-6 text-gray-800">Update Grievance</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Grievance Mode
            </label>
            <input
              type="text"
              {...register("grievance_mode")}
              className="w-full border border-gray-300 bg-gray-200 rounded-lg p-2 outline-none"
              readOnly
            />
            {errors.grievance_mode && (
              <p className="text-red-500 text-sm">
                {errors.grievance_mode.message}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              {...register("dept_name")}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            >
              <option value="">Select</option>
              {Departments &&
                Departments.map((dept) => (
                  <option key={dept.id} value={dept.dept_name}>
                    {dept.dept_name}
                  </option>
                ))}
            </select>
            {errors.dept_name && (
              <p className="text-red-500 text-sm">{errors.dept_name.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Complaint
            </label>
            <select
              {...register("complaint")}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            >
              <option value="">Select</option>
              {filteredComplaints.map((complaint) => (
                <option
                  key={complaint.id}
                  value={complaint.complaint_type_title}
                >
                  {complaint.complaint_type_title}
                </option>
              ))}
            </select>
            {errors.complaint && (
              <p className="text-red-500 text-sm">{errors.complaint.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Zone
            </label>
            <select
              {...register("zone_name")}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            >
              <option value="">Select</option>
              {Zone &&
                Zone.map((zone) => (
                  <option key={zone.id} value={zone.zone_name}>
                    {zone.zone_name}
                  </option>
                ))}
            </select>
            {errors.zone_name && (
              <p className="text-red-500 text-sm">{errors.zone_name.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Ward
            </label>
            <select
              {...register("ward_name")}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            >
              <option value="">Select</option>
              {filteredWards.map((ward) => (
                <option key={ward.id} value={ward.ward_name}>
                  {ward.ward_name}
                </option>
              ))}
            </select>
            {errors.ward_name && (
              <p className="text-red-500 text-sm">{errors.ward_name.message}</p>
            )}
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Street
            </label>
            <select
              {...register("street_name")}
              className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            >
              <option value="">Select</option>
              {filteredStreets.map((street) => (
                <option key={street.id} value={street.street_name}>
                  {street.street_name}
                </option>
              ))}
            </select>
            {errors.street_name && (
              <p className="text-red-500 text-sm">
                {errors.street_name.message}
              </p>
            )}
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Complaint Address
          </label>
          <input
            type="text"
            {...register("complaintaddress")}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none"
          />
          {errors.complaintaddress && (
            <p className="text-red-500 text-sm">
              {errors.complaintaddress.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Complaint Details
          </label>
          <textarea
            {...register("complaint_details")}
            className="w-full border border-gray-300 rounded-lg p-2 outline-none"
            rows="4"
          />
          {errors.complaint_details && (
            <p className="text-red-500 text-sm">
              {errors.complaint_details.message}
            </p>
          )}
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Update Grievance
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateGrievanceForm;
