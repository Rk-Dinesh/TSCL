import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../Host";
import { useDispatch, useSelector } from "react-redux";

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

const AddDepartment = (props) => {
  
  const { ExistingOrganiZations } = props;
  const [orgId, setorgId] = useState(null);
  const [OrgName, setOrgName] = useState(null);
  //console.log(ExistingOrganiZations);

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
    if (OrgName) {
      const selectedorg = ExistingOrganiZations.find(
        (org) => org.org_name === OrgName
      );
      if (selectedorg) {
        setorgId(selectedorg.org_id);
      }
    }
  }, [OrgName, ExistingOrganiZations]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      org_id: orgId,
      status: "inactive",
      created_by_user: "admin",
    };

    // console.log(formData);

    try {
      const response = await axios.post(`${API}/department/post`, formData);

      if (response.status === 200) {
        toast.success("Department created Successfully");
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
      <div className="bg-white w-[522px] h-[368px]  font-lexend">
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
                  <option key={org.org_name} value={org.org_name}>
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
                placeholder="Add Department Name"
                {...register("dept_name")}
              />
              {errors.dept_name && (
                <p className="text-red-500">{errors.dept_name.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mx-10 gap-5 ">
            <button
              className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
              onClick={props.toggleCloseModal}
            >
              cancel
            </button>
            <button className=" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
