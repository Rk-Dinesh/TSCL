import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveCancel from "../../components/SavaCancel";
import { useDispatch, useSelector } from "react-redux";
import { fetchDepartment } from "../redux/slice/department";
import { API } from "../../Host";
import decryptData from "../../Decrypt";

const TemplateSchema = yup.object().shape({
  temp_title: yup.string().required("Template title is required"),
  dept_name: yup
    .string()
    .test(
      "not-select",
      "Please select a Department",
      (value) => value && value !== "Select Department"
    ),
  complaint_type: yup
    .string()
    .test(
      "not-select",
      "Please select a Complaint Type",
      (value) => value && value !== "Select Complaint Type"
    ),
  desc: yup.string().required("Description is required"),
});

const EditTemplate = (props) => {
  const dispatch = useDispatch();
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const { tempId } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(TemplateSchema),
    mode: "all",
  });

  const deptName = watch("dept_name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/template/getbyid?temp_id=${tempId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = decryptData(response.data.data);
        setValue("temp_title", data.temp_title);
        setValue("dept_name", data.dept_name);
        setValue("complaint_type", data.complaint_type);
        setValue("desc", data.desc);
      } catch (error) {
        console.error("Error fetching data", error);
        toast.error("Failed to fetch template data");
      }
    };
    fetchData();
  }, [tempId, setValue, token]);

  useEffect(() => {
    dispatch(fetchDepartment());
  }, [dispatch]);

  const Department = useSelector((state) => state.department);

  useEffect(() => {
    if (deptName) {
      const fetchComplaints = async () => {
        try {
          const response = await axios.get(`${API}/complaint/getdept?dept_name=${deptName}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const responseData = decryptData(response.data.data);
          setFilteredComplaints(responseData);
          setValue("complaint_type", "");
        } catch (error) {
          console.error("Error fetching complaints", error);
          toast.error("Failed to fetch complaint types");
        }
      };
      fetchComplaints();
    } else {
      setFilteredComplaints([]);
    }
  }, [deptName, setValue, token]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    };

    try {
      setIsLoading(true)
      const response = await axios.post(`${API}/template/update?temp_id=${tempId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Updated Successfully");
        setIsLoading(false)
        props.toggleModal();
        props.handlerefresh();
      } else {
        console.error("Error in posting data", response);
        setIsLoading(false)
        toast.error("Failed to update template");
      }
    } catch (error) {
      console.error("Error in posting data", error);
      setIsLoading(false)
      toast.error("Failed to update template");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[522px] font-lexend p-3">
        <div className="border-b-2 border-gray-300 mx-6">
          <h1 className="text-xl font-medium pt-6 pb-2">Edit Template</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-6 pb-3">
          <div className="my-2">
            <label className="block text-gray-900 text-base font-normal mb-1" htmlFor="temp_title">
              Template Title
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="temp_title"
              type="text"
              placeholder="Template Title"
              {...register("temp_title")}
            />
            {errors.temp_title && <p className="text-red-500">{errors.temp_title.message}</p>}
          </div>

          <div className="mb-3">
            <label className="block text-gray-900 text-base font-normal mb-1" htmlFor="dept_name">
              Department
            </label>
            <select
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="dept_name"
              {...register("dept_name")}
            >
              <option value="">Select Department</option>
              {Department.data &&
                Department.data.map((option,index) => (
                  <option key={index} value={option.dept_name}>
                    {option.dept_name}
                  </option>
                ))}
            </select>
            {errors.dept_name && <p className="text-red-500">{errors.dept_name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-900 text-base font-normal mb-1" htmlFor="complaint_type">
              Complaint Type
            </label>
            <select
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="complaint_type"
              {...register("complaint_type")}
            >
              <option value="">Select Complaint Type</option>
              {filteredComplaints &&
                filteredComplaints.map((option,index) => (
                  <option key={index} value={option.complaint_type_title}>
                    {option.complaint_type_title}
                  </option>
                ))}
            </select>
            {errors.complaint_type && <p className="text-red-500">{errors.complaint_type.message}</p>}
          </div>

          <div className="my-2">
            <label className="block text-gray-900 text-base font-normal mb-1" htmlFor="desc">
              Description
            </label>
            <textarea
              id="desc"
              rows="5"
              className="block py-2.5 pl-3 w-full text-sm text-gray-900 rounded border outline-none focus:outline-none focus:shadow-outline mb-2"
              placeholder="Description here..."
              {...register("desc")}
            ></textarea>
            {errors.desc && (
              <p className="text-red-500 text-xs text-start px-2">{errors.desc.message}</p>
            )}
          </div>

          <SaveCancel onCancel={props.toggleModal} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default EditTemplate;
