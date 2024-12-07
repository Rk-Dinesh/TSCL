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
      "Please select an Department",
      (value) => value !== "" && value !== "Select  Department"
    ),
  complaint_type: yup
    .string()
    .test(
      "not-select",
      "Please select an Complaint Type",
      (value) => value !== "" && value !== "Select  Complaint Type"
    ),
  desc: yup.string().required("Description is required"),
});

const AddTemplate = (props) => {
  const dispatch = useDispatch();
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const token = localStorage.getItem("token");

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
    dispatch(fetchDepartment());
  }, [dispatch]);

  const Department = useSelector((state) => state.department);

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
            setValue("complaint_type", "");
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

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      created_by_user: localStorage.getItem("name"),
    };

    

    try {
      const response = await axios.post(`${API}/template/post`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      if (response.status === 200) {
        toast.success(" created Successfully");
        props.toggleModal();
        props.handlerefresh();
      } else {
        console.error("Error in posting data", response);
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white w-[522px]   font-lexend p-3">
        <div className="border-b-2 border-gray-300 mx-6">
          <h1 className="text-xl font-medium pt-6 pb-2">Add Template</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mx-6 pb-3">
          <div className=" my-2">
            <label
              className="block text-gray-900 text-base font-normal mb-1"
              htmlFor="complaint_type"
            >
              Template Title
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="temp_title"
              type="text"
              placeholder="Template Title"
              {...register("temp_title")}
            />
            {errors.temp_title && (
              <p className="text-red-500">{errors.temp_title.message}</p>
            )}
          </div>
          <div className="mb-3">
            <label
              className="block text-gray-900 text-base font-normal mb-1"
              htmlFor="dept_name"
            >
              Department
            </label>
            <select
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="dept_name"
              {...register("dept_name")}
            >
              <option value="">Select Departmnet</option>
              {Department.data &&
                Department.data.map((option) => (
                  <option key={option.dept_id} value={option.dept_name}>
                    {option.dept_name}
                  </option>
                ))}
            </select>
            {errors.dept_name && (
              <p className="text-red-500">{errors.dept_name.message}</p>
            )}
          </div>
          <div className="">
            <label
              className="block text-gray-900 text-base font-normal mb-1"
              htmlFor="complaint_type"
            >
              Complaint Type
            </label>
            <select
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="complaint_type"
              {...register("complaint_type")}
            >
              <option value="">Select Complaint Type</option>
              {filteredComplaints &&
                filteredComplaints.map((option) => (
                  <option
                    key={option.complaint_id}
                    value={option.complaint_type_title}
                  >
                    {option.complaint_type_title}
                  </option>
                ))}
            </select>
            {errors.dept_name && (
              <p className="text-red-500">{errors.dept_name.message}</p>
            )}
          </div>
          <div className=" my-2">
            <label
              className="block text-gray-900 text-base  font-normal mb-1 "
              htmlFor="desc"
            >
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
              <p className="text-red-500 text-xs text-start px-2">
                {errors.desc.message}
              </p>
            )}
          </div>

          <SaveCancel onCancel={props.toggleModal} />
        </form>
      </div>
    </div>
  );
};

export default AddTemplate;
