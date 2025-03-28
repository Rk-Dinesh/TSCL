import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";
import { API } from "../../Host";
import axios from "axios";
import decryptData from "../../Decrypt";

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
  dept_name: yup
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
  escalation_type: yup
    .string()
    .test(
      "not-select",
      "select an Type",
      (value) => value !== "" && value !== "Select Type"
    ),
  escalation_l1: yup.number().required("L1 duration is required"),
  role_l1: yup
    .string()
    .test(
      "not-select",
      "select an L1 role",
      (value) => value !== "" && value !== "Select an Role"
    ),
  escalation_l2: yup.string().optional(),
  role_l2: yup.string().optional(),
  escalation_l3: yup.string().optional(),
  role_l3: yup.string().optional(),
  status: yup
    .string()
    .test(
      "not-select",
      "Please select an Status",
      (value) => value !== "" && value !== "Status"
    ),
});

const EditComplaint = (props) => {
  const [stepNumber, setStepNumber] = useState(0);
  const [deptName, setDeptName] = useState(null);
  const [role1, setRole1] = useState(null);
  const [role2, setRole2] = useState(null);
  const [role3, setRole3] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
    const [ExistingDesignation, setExistingDesignation] = useState([])

  const { ExistingDept,  comptId } = props;

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
    setValue,
  } = useForm({
    resolver: yupResolver(currentStepSchema),
    mode: "all",
  });

  useEffect(()=>{
    axios
    .get(`${API}/designation/getactive`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const responseData = decryptData(response.data.data);
      const reverseData = responseData.reverse();
      setExistingDesignation(reverseData);
    })
    .catch((error) => {
      console.error(error);
    });
  },[])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/complaint/getbyid?complaint_id=${comptId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = decryptData(response.data.data);

        setValue("complaint_type_title", data.complaint_type_title);
        setValue("dept_name", data.dept_name);
        setDeptName(data.dept_name);
        setValue("tat_type", data.tat_type);
        setValue("tat_duration", data.tat_duration);
        setValue("priority", data.priority);
        setValue("escalation_type", data.escalation_type);
        setValue("escalation_l1", data.escalation_l1);
        setValue("role_l1", data.role_l1);
        setRole1(data.role_l1);
        setValue("escalation_l2", data.escalation_l2);
        setValue("role_l2", data.role_l2);
        setRole2(data.role_l2);
        setValue("escalation_l3", data.escalation_l3);
        setValue("role_l3", data.role_l3);
        setRole3(data.role_l3);
        setValue("status", data.status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [comptId, setValue]);

  const onSubmit = async (data) => {
    if (stepNumber !== steps.length - 1) {
      setStepNumber(stepNumber + 1);
    } else {
      
      const formData = {
        ...data,
      };

      try {
        setIsLoading(true)
        const response = await axios.post(
          `${API}/complaint/update?complaint_id=${comptId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          toast.success("Complaint Updated Successfully");
          setIsLoading(false)
          props.toggleModal();
          props.handlerefresh();
        } else {
          console.error("Error in posting data", response);
          setIsLoading(false)
          toast.error("Failed to Upload");
        }
      } catch (error) {
        console.error("Error in posting data", error);
        setIsLoading(false)
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center flex-wrap">
      <div className="overflow-hidden shadow-lg bg-white flex items-end justify-between relative font-alegerya mx-2 ">
        <div className="min-w-[390px] min-h-[350px] ">
          <div>
            <div className="flex justify-between items-center px-5 text-white bg-primary h-12 flex-wrap">
              <p className="">New Complaint</p>
              <button onClick={props.toggleModal} className="">
                <IoMdClose className="text-2xl" />
              </button>
            </div>
            <div>
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
                            Complaint
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline  col-span-2"
                            id="complaint_type_title"
                            type="text"
                            placeholder="Complaint"
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
                            htmlFor="dept_name"
                          >
                            Department
                          </label>
                          <select
                            className="col-span-2  block outline-none px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50     hover:border-gray-200"
                            {...register("dept_name")}
                            id="dept_name"
                          >
                            <option value={deptName}>{deptName}</option>
                            {ExistingDept.map((dept,index) => (
                              <option key={index} value={dept.dept_name}>
                                {dept.dept_name}
                              </option>
                            ))}
                          </select>
                          {errors.dept_name && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.dept_name.message}
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
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50     hover:border-gray-200"
                            {...register("tat_type")}
                            id="tat_type"
                          >
                            <option value="" hidden>
                              Select Type
                            </option>
                            <option value="month">Month</option>
                            <option value="day">Days</option>
                            {/* <option value="minute">Minute</option> */}
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
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50     hover:border-gray-200"
                            {...register("priority")}
                            id="priority"
                          >
                            <option value="" hidden>
                              Select Priority
                            </option>
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
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50     hover:border-gray-200"
                            {...register("escalation_type")}
                            id="escalation_type"
                          >
                            <option value="" hidden>
                              Select Type
                            </option>
                            <option value="month">Month</option>
                            <option value="day">Days</option>
                            {/* <option value="minute">Minute</option> */}
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
                            type="number"
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
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50     hover:border-gray-200"
                            {...register("role_l1")}
                            id="role_l1"
                          >
                            <option value={role1} disabled>
                              {role1}
                            </option>
                            {ExistingDesignation && ExistingDesignation.map((role, index) => (
                              <option key={index} value={role.designation}>
                                {role.designation}
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
                            type="number"
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
                            className="col-span-2  outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50     hover:border-gray-200"
                            {...register("role_l2")}
                            id="role_l2"
                          >
                            <option value={role2} disabled>
                              {role2}
                            </option>
                            {ExistingDesignation && ExistingDesignation.map((role, index) => (
                              <option key={index} value={role.designation}>
                                {role.designation}
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
                            type="number"
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
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50     hover:border-gray-200"
                            {...register("role_l3")}
                            id="role_l3"
                          >
                            <option value={role3} disabled>
                              {role3}
                            </option>
                            {ExistingDesignation && ExistingDesignation.map((role, index) => (
                              <option key={index} value={role.designation}>
                                {role.designation}
                              </option>
                            ))}
                          </select>
                          {errors.role_l3 && (
                            <p className="text-red-500 text-sm text-center -mt-3">
                              {errors.role_l3.message}
                            </p>
                          )}
                        </div>
                        <div className=" grid grid-cols-3 items-center gap-3">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="status"
                          >
                            Status:
                          </label>
                          <select
                            className="col-span-2 outline-none block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50     hover:border-gray-200"
                            id="status"
                            {...register("status")}
                          >
                            <option value="" hidden>
                              Status
                            </option>
                            <option value="active">Active</option>
                            <option value="inactive">InActive</option>
                          </select>
                          {errors.status && (
                            <p className="text-red-500 text-xs text-center mb-3 ">
                              {errors.status.message}
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

export default EditComplaint;
