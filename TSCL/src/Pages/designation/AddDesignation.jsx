import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const desginationSchema = yup.object().shape({
  org_name: yup
    .string()
    .test(
      "not-select",
      "Please select an Organization",
      (value) => value !== "" && value !== "Select  Organization"
    ),
  dept_name: yup
    .string()
    .test(
      "not-select",
      "Please select an Department",
      (value) => value !== "" && value !== "Select  Department"
    ),
  designation: yup.string().required("Designation is required"),
});

const AddDesgination = ({
  ExistingOrganiZations,
  ExistingDepartments,
  toggleModal,
  handlerefresh,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(desginationSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      status: "active",
      created_by_user: localStorage.getItem("name"),
    };

    try {
      setIsLoading(true)
      const response = await axios.post(
        API_ENDPOINTS.POST_DESIGANATION.url,
        formData,
        {
          headers: API_ENDPOINTS.POST_DESIGANATION.headers,
        }
      );

      if (response.status === 200) {
        toast.success("Designatiom created Successfully");
        setIsLoading(false)
        toggleModal();
        handlerefresh();
      } else {
        console.error("Error in posting data", response);
        setIsLoading(false)
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
      setIsLoading(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[522px] h-[460px] font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-8 pb-2">Add Desgination</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-3">
            <div className="mb-3">
              <label
                className="block text-gray-900 text-base font-normal mb-3"
                htmlFor="org_name"
              >
                Organization Name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="org_name"
                {...register("org_name")}
              >
                <option value="">Select Organization</option>
                {ExistingOrganiZations.map((org,index) => (
                  <option key={index} value={org.org_name}>
                    {org.org_name}
                  </option>
                ))}
              </select>
              {errors.org_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.org_name.message}
                </p>
              )}
            </div>
            <div className="mb-3">
              <label
                className="block text-gray-900 text-base font-normal mb-2"
                htmlFor="dept_name"
              >
                Department Name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="dept_name"
                {...register("dept_name")}
              >
                <option value="">Select Department</option>
                {ExistingDepartments.map((dept,index) => (
                  <option key={index} value={dept.dept_name}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
              {errors.dept_name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dept_name.message}
                </p>
              )}
            </div>
            <div>
              <label
                className="block text-gray-900 text-base font-normal mb-2"
                htmlFor="designation"
              >
                Designation
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="designation"
                type="text"
                placeholder="Designation Name"
                {...register("designation")}
              />
              {errors.designation && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.designation.message}
                </p>
              )}
            </div>
          </div>
          <SaveCancel onCancel={toggleModal} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default AddDesgination;
