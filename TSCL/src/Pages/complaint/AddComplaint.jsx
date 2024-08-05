import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IoMdClose } from "react-icons/io";

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
  complaint_type: yup.string().required("Complaint_type is required"),
  dept: yup.string().required("Department is required"),
  tat_type: yup.string().required("TAT is required"),
  duration: yup.string().required("Duration is required"),
  priority: yup.string().required("Priority is required"),
});

const escdetailSchema = yup.object().shape({
  esc_type: yup.string().required("Esc_type is required"),
  durationlo: yup.string().required("L1 duration is required"),
  userlo: yup.string().required("L1 user is required"),
  durationlt: yup.string().required("L2 duration is required"),
  userlt: yup.string().required("L2 user is required"),
  durationlth: yup.string().required("L3 duration is required"),
  userlth: yup.string().required("L3 user is required"),
});

const AddComplaint = (props) => {
  const [stepNumber, setStepNumber] = useState(0);
  const { isCenters } = props;

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
      // Save the form data here
      console.log("Form submitted:", data);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="overflow-hidden shadow-lg bg-white flex items-end justify-between relative font-alegerya">
        <div className="w-[590px] min-h-[350px]">
          <div>
            <div className="flex justify-between items-center px-5 text-white bg-slate-900 h-12">
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
                          ? "bg-primary text-white"
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

              <div className="conten-box m-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  {stepNumber === 0 && (
                    <div>
                      <div className="pt-2 font-alegerya flex flex-col gap-3 my-4">
                        <div className="">
                          <h4 className="text-xl font-medium text-slate-800 ml-2">
                            Create Complaint
                          </h4>
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="complaint_type"
                          >
                            Complaint Type
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="complaint_type"
                            type="text"
                            placeholder="Complaint Type"
                            {...register("complaint_type")}
                          />
                          {errors.complaint_type && (
                            <p className="text-red-500">
                              {errors.complaint_type.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="dept"
                          >
                            Department
                          </label>
                          <select
                            className="col-span-2 block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("dept")}
                          >
                            <option hidden>Select a Department</option>
                            <option value="PWD">PWD</option>
                            <option value="Electric Board">Electric Board</option>
                            <option value="Public Commision">Public Commision</option>
                          </select>
                          {errors.dept && (
                            <p className="text-red-500">
                              {errors.dept.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="tat_type"
                          >
                            TAT Type
                          </label>
                          <select
                            className="col-span-2 block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("tat_type")}
                          >
                            <option hidden>Select Type</option>
                            <option value="Month">Month</option>
                            <option value="Days">Days</option>
                          </select>
                          {errors.tat_type && (
                            <p className="text-red-500">
                              {errors.tat_type.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="duration"
                          >
                            Duration
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="duration"
                            type="text"
                            placeholder="Duration"
                            {...register("duration")}
                          />
                          {errors.duration && (
                            <p className="text-red-500">
                              {errors.duration.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="priority"
                          >
                            Priority
                          </label>
                          <select
                            className="col-span-2 block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("priority")}
                          >
                            <option hidden>Select Priority</option>
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                          </select>
                          {errors.priority && (
                            <p className="text-red-500">
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
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="esc_type"
                          >
                            Escalation Type
                          </label>
                          <select
                            className="col-span-2 block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("esc_type")}
                          >
                            <option hidden>Select Type</option>
                            <option value="Month">Month</option>
                            <option value="days">Days</option>
                          </select>
                          {errors.esc_type && (
                            <p className="text-red-500">
                              {errors.esc_type.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="durationlo"
                          >
                            L1 Duration
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="durationlo"
                            type="text"
                            placeholder="L1 Duration"
                            {...register("durationlo")}
                          />
                          {errors.durationlo && (
                            <p className="text-red-500">
                              {errors.durationlo.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="userlo"
                          >
                            L1 User
                          </label>
                          <select
                            className="col-span-2 block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("userlo")}
                          >
                            <option hidden>Select a User</option>
                            <option value="Ravi">Ravi</option>
                            <option value="Kumar">Kumar</option>
                          </select>
                          {errors.userlo && (
                            <p className="text-red-500">
                              {errors.userlo.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="durationlt"
                          >
                            L2 Duration
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="durationlt"
                            type="text"
                            placeholder="L2 Duration"
                            {...register("durationlt")}
                          />
                          {errors.durationlt && (
                            <p className="text-red-500">
                              {errors.durationlt.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="userlt"
                          >
                            L2 User
                          </label>
                          <select
                            className="col-span-2 block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("userlt")}
                          >
                            <option hidden>Select a User</option>
                            <option value="Ravi">Ravi</option>
                            <option value="Kumar">Kumar</option>
                          </select>
                          {errors.userlt && (
                            <p className="text-red-500">
                              {errors.userlt.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="durationlth"
                          >
                            L3 Duration
                          </label>
                          <input
                            className="appearance-none border rounded-lg py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline col-span-2"
                            id="durationlth"
                            type="text"
                            placeholder="L3 Duration"
                            {...register("durationlth")}
                          />
                          {errors.durationlth && (
                            <p className="text-red-500">
                              {errors.durationlth.message}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-3 items-center">
                          <label
                            className="block text-gray-500 text-base text-start font-normal mb-2 mx-8 col-span-1"
                            htmlFor="userlth"
                          >
                            L3 User
                          </label>
                          <select
                            className="col-span-2 block px-1 py-3 text-sm text-black border border-gray-200 rounded-lg bg-gray-50 dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                            {...register("userlth")}
                          >
                            <option hidden>Select a User</option>
                            <option value="Ravi">Ravi</option>
                            <option value="Kumar">Kumar</option>
                          </select>
                          {errors.userlth && (
                            <p className="text-red-500">
                              {errors.userlth.message}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="footer flex justify-between items-center py-4 px-12">
                    <div className="flex gap-4 items-center justify-center">
                      <button
                        className="bg-slate-900 text-white h-12 w-24 rounded-md"
                        type="button"
                        onClick={() => setStepNumber(stepNumber - 1)}
                        disabled={stepNumber === 0}
                      >
                        Previous
                      </button>
                    </div>
                    <div className="flex gap-4 items-center justify-center">
                      <button
                        className="bg-slate-900 text-white h-12 w-24 rounded-md"
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
