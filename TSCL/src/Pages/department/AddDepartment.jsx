import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const departmentSchema = yup.object().shape({
  org_name: yup
    .string()
    .test(
      "not-select",
      "Please select an Organization",
      (value) => value !== "" && value !== "Select  Organization"
    ),
  dept_name: yup.string().required("Department is required"),
});

const AddDepartment = ({
  ExistingOrganiZations,
  toggleModal,
  handlerefresh,
}) => {
  const [orgId, setOrgId] = useState(null);
  const [orgName, setOrgName] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(departmentSchema),
    mode: "all",
  });

  useEffect(() => {
    if (orgName) {
      const selectedOrg = ExistingOrganiZations.find(
        (org) => org.org_name === orgName
      );
      if (selectedOrg) {
        setOrgId(selectedOrg.org_id);
      }
    }
  }, [orgName, ExistingOrganiZations]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      org_id: orgId,
      status: "active",
      created_by_user: localStorage.getItem("name"),
    };

    try {
      const response = await axios.post(
        API_ENDPOINTS.POST_DEPARTMENT.url,
        formData,
        {
          headers: API_ENDPOINTS.POST_DEPARTMENT.headers,
        }
      );

      if (response.status === 200) {
        toast.success("Department created Successfully");
        toggleModal();
        handlerefresh();
      } else {
        console.error("Error in posting data", response);
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[522px] h-[368px] font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Department</h1>
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
                onChange={(e) => setOrgName(e.target.value)}
              >
                <option value="">Select Organization</option>
                {ExistingOrganiZations.map((org) => (
                  <option key={org.org_id} value={org.org_name}>
                    {org.org_name}
                  </option>
                ))}
              </select>
              {errors.org_name && (
                <p className="text-red-500">{errors.org_name.message}</p>
              )}
            </div>

            <div>
              <label
                className="block text-gray-900 text-base font-normal mb-3"
                htmlFor="dept_name"
              >
                Department Name
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="dept_name"
                type="text"
                placeholder="Department Name"
                {...register("dept_name")}
              />
              {errors.dept_name && (
                <p className="text-red-500">{errors.dept_name.message}</p>
              )}
            </div>
          </div>
          <SaveCancel onCancel={toggleModal} />
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
