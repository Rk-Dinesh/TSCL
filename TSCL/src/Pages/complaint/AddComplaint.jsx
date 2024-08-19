import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";
import { API } from "../../Host";
import axios from "axios";


const steps = [
  {
    id: 1,
    title: "Complaint Details",
  },
  {
    id: 2,
    title: "Escalation Details",
  },
];

const complaintdetailSchema = yup.object().shape({
  complaint_type_title: yup.string().required("complaint_type is required"),
  dept: yup
  .string()
  .test(
    "not-select",
    "select an Department",
    (value) => value !== "" && value !== "Select an Department"
  ),
  tat_type: yup
  .string()
  .test(
    "not-select",
    "select an TAT Type",
    (value) => value !== "" && value !== "Select Type"
  ),
  tat_duration: yup.string().required("Duration is required"),
  priority: yup.string().required("Priority is required"),
});

const escdetailSchema = yup.object().shape({
  escalation_type:yup
  .string()
  .test(
    "not-select",
    "select an Type",
    (value) => value !== "" && value !== "Select Type"
  ),
  escalation_l1: yup.string().required("L1 duration is required"),
  role_l1: yup
  .string()
  .test(
    "not-select",
    "select an L1 role",
    (value) => value !== "" && value !== "Select an Role"
  ),
  escalation_l2: yup.string().required("L2 duration is required"),
  role_l2: yup
  .string()
  .test(
    "not-select",
    "select an L2 role",
    (value) => value !== "" && value !== "Select an Role"
  ),
  escalation_l3: yup.string().required("L3 duration is required"),
  role_l3: yup
  .string()
  .test(
    "not-select",
    "select an L3 role",
    (value) => value !== "" && value !== "Select an Role"
  ),
});

const AddComplaint = (props) => {
  const [stepNumber, setStepNumber] = useState(0);

  const {ExistingDept,ExistingRoles} = props
  

  let currentStepSchema;
  switch (stepNumber) {
    case 0:
      currentStepSchema = complaintdetailSchema;
      break;
    case 1:
      currentStepSchema = escdetailSchema;
      break;
    default:
      currentStepSchema = complaintdetailSchema;
  }

  useEffect(() => {}, [stepNumber]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    if (stepNumber !== steps.length - 1) {
      setStepNumber(stepNumber + 1);
    } else {
      const formData = {
        ...data,
        status: "active",
        created_by_user: "admin",
      };
  
      // console.log(formData);
  
      try {
        const token = sessionStorage.getItem('token'); 
        const response = await axios.post(`${API}/complaint/post`, formData,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          toast.success("Complaint created Successfully");
          props.toggleModal();
          props.handlerefresh();
        } else {
          console.error("Error in posting data", response);
          toast.error("Failed to Upload");
        }
      } catch (error) {
        console.error("Error in posting data", error);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center flex-wrap">
      <div className="overflow-hidden shadow-lg bg-white flex items-end justify-between relative font-alegerya mx-2 ">
        <div className="min-w-[390px] min-h-[350px] ">
          <div>
            <div className="flex justify-between items-center px-5 text-white bg-gray-700 h-12 flex-wrap">
              <p className="">New Complaint</p>
              <button onClick={props.toggleModal} className="">
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            <div >
              <div className="flex items-center gap-9 relative justify-center mx-60 py-1 rounded-full bg-slate-200 mt-4">
                {steps.map((item, i) => (
                  <div
                    className="relative items-center item flex last:flex-none group"
                    key={i}
                  >
                    <div
                      className={`${
                        stepNumber >= i
                          ? "bg-black text-white"
                          : "bg-white text-slate-900"
                      } transition duration-150 icon-box h-8 w-8 rounded-full flex flex-col items-center justify-center relative z-[66] text-base font-medium`}
                    >
                      <span>{i + 1}</span>
                    </div>
                    {i !== steps.length - 1 && (
                      <div
                        className={`${
                          stepNumber > i ? "bg-green-900" : "bg-[#E0EAFF]"
                        } absolute top-1/2 h-[2px] w-full z-[65]`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="conten-box mx-8 my-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {stepNumber === 0 && (
                    <div>
                      <div className="pt-2 font-alegerya flex flex-col gap-3 my-4">
                        <div className="">
                          <h4 className="text-xl font-medium text-slate-800 ml-2">
                            Create Complaint
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="complaint_type_title"
                          >
                            Complaint Type
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline  col-span-2"
                            id="complaint_type_title"
                            type="text"
                            placeholder="Complaint Type"
                            {...register("complaint_type_title")}
                          />
                          {errors.complaint_type_title && (
                            <p className="text-red-500 text-sm text-start -mt-3">
                              {errors.complaint_type_title.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="dept"
                          >
                            Department
                          </label>
                          <select
                            className="col-span-2  block outline-none px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("dept")}
                            id="dept"
                          >
                            <option value="">Select an Department</option>
                            {ExistingDept.map((dept) => (
                            <option key={dept.dept_id} value={dept.dept_name}>
                              {dept.dept_name}
                            </option>
                             ))}
                          </select>
                          {errors.dept && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.dept.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="tat_type"
                          >
                            TAT Type
                          </label>
                          <select
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("tat_type")}
                            id="tat_type"
                          >
                            <option value="">Select Type</option>
                            <option value="Month">Month</option>
                            <option value="Days">Days</option>
                          </select>
                          {errors.tat_type && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.tat_type.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="tat_duration"
                          >
                            Duration
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="tat_duration"
                            type="text"
                            placeholder="Duration"
                            {...register("tat_duration")}
                          />
                          {errors.tat_duration && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.tat_duration.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="priority"
                          >
                            Priority
                          </label>
                          <select
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("priority")}
                            id="priority"
                          >
                            <option value="">Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                          {errors.priority && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.priority.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {stepNumber === 1 && (
                    <div>
                      <div className="pt-2 font-alegerya flex flex-col gap-3 my-4">
                        <div className="">
                          <h4 className="text-xl font-medium text-slate-800 ml-2">
                            Escalation Details
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="escalation_type"
                          >
                            Escalation Type
                          </label>
                          <select
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("escalation_type")}
                            id="escalation_type"
                          >
                            <option value="">Select Type</option>
                            <option value="Month">Month</option>
                            <option value="days">Days</option>
                          </select>
                          {errors.escalation_type && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.escalation_type.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="escalation_l1"
                          >
                            L1 Duration
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="escalation_l1"
                            type="text"
                            placeholder="L1 Duration"
                            {...register("escalation_l1")}
                          />
                          {errors.escalation_l1 && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.escalation_l1.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="role_l1"
                          >
                            L1 Role
                          </label>
                          <select
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("role_l1")}
                            id="role_l1"
                          >
                            <option value="">Select an Role</option>
                            {ExistingRoles.map((role) => (
                  <option key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </option>
                ))}
                          </select>
                          {errors.role_l1 && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.role_l1.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="escalation_l2"
                          >
                            L2 Duration
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="escalation_l2"
                            type="text"
                            placeholder="L2 Duration"
                            {...register("escalation_l2")}
                          />
                          {errors.escalation_l2 && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.escalation_l2.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="role_l2"
                          >
                            L2 Role
                          </label>
                          <select
                            className="col-span-2  outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("role_l2")}
                            id="role_l2"
                          >
                            <option value="">Select an Role</option>
                            {ExistingRoles.map((role) => (
                  <option key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </option>
                ))}
                          </select>
                          {errors.role_l2 && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.role_l2.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="escalation_l3"
                          >
                            L3 Duration
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="escalation_l3"
                            type="text"
                            placeholder="L3 Duration"
                            {...register("escalation_l3")}
                          />
                          {errors.escalation_l3 && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.escalation_l3.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="role_l3"
                          >
                            L3 Role
                          </label>
                          <select
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("role_l3")}
                            id="role_l3"
                          >
                            <option value="">Select an Role</option>
                            {ExistingRoles.map((role) => (
                  <option key={role.role_id} value={role.role_name}>
                    {role.role_name}
                  </option>
                ))}
                          </select>
                          {errors.role_l3 && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.role_l3.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="footer flex justify-between items-center py-4 px-12">
                    <div className="flex gap-4 items-center justify-center">
                      <button
                        className="bg-primary text-white px-4 py-1.5 rounded-full"
                        type="button"
                        onClick={() => setStepNumber(stepNumber - 1)}
                        disabled={stepNumber === 0}
                      >
                        Previous
                      </button>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                      <button
                        className="bg-primary text-white px-6 py-1.5 rounded-full"
                        type="submit"
                      >
                        {stepNumber === steps.length - 1 ? "Save" : "Next"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddComplaint;
