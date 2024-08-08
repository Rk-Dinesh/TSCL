import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { RiArrowDropDownLine } from "react-icons/ri";

const AddGrivencesSchema = yup.object().shape({
  name: yup.string().required("name type is required"),
  contact_number: yup.string().required("contact number  is required"),
  Email_id: yup.string().required("Email id is required"),
  address: yup.string().required("address is required"),
});

const GrievanceForm = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(AddGrivencesSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    console.log("data", data);
  };

  return (
    <>
      <div className="bg-blue-100 flex flex-col  px-10 text-start h-fit   font-lexend overflow-y-auto no-scrollbar">
        <h1 className="text-xl my-5">Grievance Form</h1>
        <div className=" flex-col justify-center items-center w-[592px] bg-white h-fit rounded-lg">
          <div className="border-b-2 border-search">
            <h1 className=" text-xl px-3 py-3">Request by</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col flex-nowrap overflow-hidden my-5 gap-2">
            <div className=" flex justify-between font-normal mx-10 ">
                <label
                  className="block text-black text-lg  font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-6/5 text-start border-2 w-80 rounded-lg ml-2 px-2 py-2"
                  placeholder=" User Name"
                  {...register("name")}
                />
                {/* {errors.Contact_Number && (
                  <p className="text-red-500 text-xs text-end px-10">
                    {errors.Contact_Number.message}
                  </p>
                )} */}
              </div>
              <div className=" flex justify-between font-normal mx-10 ">
                <label
                  className="block text-black text-lg  font-medium mb-2"
                  htmlFor="Contact_Number"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="Contact_Number"
                  className="w-6/5 text-start border-2 w-80 rounded-lg ml-2 px-2 py-2"
                  placeholder="Phone Number"
                  {...register("Contact_Number")}
                />
                {/* {errors.Contact_Number && (
                  <p className="text-red-500 text-xs text-end px-10">
                    {errors.Contact_Number.message}
                  </p>
                )} */}
              </div>
              <div className=" flex justify-between font-normal mx-10 ">
                <label
                  className="block text-black text-lg font-medium mb-2"
                  htmlFor="email"
                >
                  Email id
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-6/5 text-start border-2 w-80 rounded-lg ml-2 px-2 py-2"
                  placeholder="abc@gmail.com id"
                  {...register("email")}
                />
                {/* {errors.Email_id && (
                  <p className="text-red-500 text-xs text-end px-10">
                    {errors.Email_id.message}
                  </p>
                )} */}
              </div>
              <div className=" flex justify-between font-normal mx-10 ">
                <label
                  className="block text-black text-lg font-medium mb-2 py-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="pincode"
                  id="address"
                  className="w-6/5 text-start border-2 w-80 rounded-lg ml-2 px-2"
                  placeholder="Address"
                  {...register("address")}
                />
                {/* {errors.address && (
                  <p className="text-red-500 text-xs text-end px-10">
                    {errors.address.message}
                  </p>
                )} */}
              </div>
            </div>
          </form>
        </div>
        <div className=" flex-col justify-center items-center w-[592px] bg-white h-fit rounded-lg mt-3">
          <div className="border-b-2 border-search">
            <h1 className=" text-xl px-3 py-3">Grievance Details</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col flex-nowrap overflow-hidden my-5 gap-2">
              <div className="grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor=" Name"
                >
                  Origin
                </label>
                <div className="border  rounded-lg col-span-2">
                <select
                  className="block w-full px-1 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                  defaultValue="Select an Organization"
                >
                  <option  hidden>
                  Select an Origin
                  </option>

                  <option value="active">Whatsapp </option>
                  <option value="inactive"> Call</option>
                  <option value="inactive"> Website</option>

                </select> 
                </div>
              </div>
              <div className="grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor=" Name"
                >
                  Complaint Type
                </label>
                <div className="border  rounded-lg col-span-2">
                <select
                  className="block w-full px-1 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                  defaultValue="Select an Organization"
                >
                  <option  hidden>
                  Select an Complaint Type
                  </option>

                  <option value="active">Water</option>
                  <option value="inactive"> Sewage</option>
                  <option value="inactive"> Electric related</option>

                </select> 
                </div>
              </div>
              <div className="grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor=" Name"
                >
                 Department
                </label>
                <div className="border  rounded-lg col-span-2">
                <select
                  className="block w-full px-1 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                  defaultValue="Select an Organization"
                >
                  <option  hidden>
                  Select an Department
                  </option>

                  <option value="active">PWD </option>
                  <option value="inactive"> Electric Board</option>
                  <option value="inactive"> Public Commision</option>

                </select> 
                </div>
              </div>
              
              <div className="grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor=" Name"
                >
                  Zone
                </label>
                <div className="border  rounded-lg col-span-2">
                <select
                  className="block w-full px-1 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                  defaultValue="Select an Organization"
                >
                  <option  hidden>
                  Select an Zone
                  </option>

                  <option value="active">Zone 1 </option>
                  <option value="inactive"> Zone 2</option>
                  <option value="inactive"> Zone 3</option>

                </select> 
                </div>
              </div>
              <div className="grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor=" Name"
                >
                  Ward
                </label>
                <div className="border  rounded-lg col-span-2">
                <select
                  className="block w-full px-1 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                  defaultValue="Select an Organization"
                >
                  <option  hidden>
                  Select an Ward
                  </option>

                  <option value="active">Ward 1 </option>
                  <option value="inactive"> Ward 2</option>
                  <option value="inactive"> Ward 3</option>

                </select> 
                </div>
              </div>
              <div className="grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor=" Name"
                >
                 Street
                </label>
                <div className="border  rounded-lg col-span-2">
                <select
                  className="block w-full px-1 py-3  text-sm text-black border border-gray-200 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-200 dark:placeholder-gray-400 dark:text-black hover:border-gray-200"
                  defaultValue="Select an Organization"
                >
                  <option  hidden>
                  Select an Street
                  </option>

                  <option value="active">Street 1 </option>
                  <option value="inactive"> Street 2</option>
                  <option value="inactive"> Street 3</option>

                </select> 
                </div>
              </div>
              <div className=" grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg  font-medium mb-2 col-span-1"
                  htmlFor="Contact_Number"
                >
                  Pincode
                </label>
                <div className="border flex rounded-lg col-span-2">
                  <input
                    type="text"
                    id="name"
                    className="w-6/5 text-start py-2 w-80 rounded-lg outline-none ml-2 px-2"
                    placeholder="Pincode"
                    {...register(" Name")}
                  />
                  
                </div>
              </div>
              <div className=" grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg  font-medium mb-2 col-span-1"
                  htmlFor="Contact_Number"
                >
                  Complaint
                </label>
                <div className="border flex rounded-lg col-span-2">
                  <input
                    type="text"
                    id="name"
                    className="w-6/5 text-start py-2 w-80 rounded-lg outline-none ml-2 px-2"
                    placeholder="Complaint"
                    {...register(" Name")}
                  />
                  
                </div>
              </div>
              <div className=" grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg  font-medium mb-2 col-span-1"
                  htmlFor="Contact_Number"
                >
                  Description
                </label>
                
                <textarea
                        id="text"
                        rows="5"
                        className="block  py-2.5 pl-3 col-span-2 w-full text-sm text-gray-900 rounded border border-gray-300 focus:outline-none focus:shadow-outline mb-2"
                        placeholder="Description here..."
                        {...register("text")}
                      ></textarea>
                  
               
              </div>
            <div className=" grid grid-cols-3  font-normal mx-10 ">
                <label
                  className="block text-black text-lg  font-medium mb-2 col-span-1"
                  htmlFor="Contact_Number"
                >
                 Attachment
                </label>
                <div className="border flex rounded-lg col-span-2">
                  <input
                    type="file"
                    id="name"
                    className="w-5/6  py-2 rounded-lg outline-none ml-2 px-7"
                    placeholder="name"
                    {...register(" Name")}
                  />
                  
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className=" text-center my-3">
          <button className=" text-white bg-primary text-base font-lexend rounded-full px-4 py-1.5 ">
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default GrievanceForm;
