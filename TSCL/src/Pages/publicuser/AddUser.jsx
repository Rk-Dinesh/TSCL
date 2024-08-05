import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
// import { useFormAction } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

const AddUserSchema = yup.object().shape({
  user: yup.string().required("Department is required"),
  phone: yup.string().required("phone is required"),
  email: yup.string().required("email is required"),
  address: yup.string().required("address is required"),
  password: yup.string().required("password is required"),
  pincode: yup.string().required("pincode is required"),
  status: yup.string().required("status is required"),
  last_login: yup.string().required("last login is required"),
  created_by: yup.string().required("created by is required"),
  // created_time: yup.string().required("created time is required"),
  //  updated: yup.string().required("updated is required"),
});

const AddUser = (props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(AddUserSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    console.log("data", data);
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white w-fit h-fit  font-lexend">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b-2 border-gray-300 mx-10 mb-3">
            <div className=" flex pt-5 items-center gap-6">
              <label
                className="block text-black text-lg font-medium mb-2"
                htmlFor="user"
              >
                User Details
              </label>
              <input
                type="text"
                id="user"
                className="mx-2 font-lexend px-2 text-sm outline-none"
                placeholder="User Name"
                {...register("user")}
              />
              {errors.user && (
                <p className="text-red-500 text-xs text-end px-10">
                  {errors.user.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className=" flex justify-between font-normal mx-10 py-2">
              <label
                className=" text-black text-lg font-medium mb-2"
                htmlFor="Phone"
              >
                Phone No:
              </label>
              <input
                type="text"
                id="phone"
                className="w-6/5 text-end outline-none"
                placeholder="Phone Number"
                {...register("phone")}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs text-end px-10">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className=" flex justify-between font-normal mx-10 py-2">
              <label
                className=" text-black text-lg font-medium mb-2"
                htmlFor="email"
              >
                Email id:
              </label>
              <input
                id="email"
                type="email"
                className="w-6/5 text-end outline-none px-2"
                placeholder="abc@gmail.com"
                {...register("email")}
              />
              {errors.email && (
                <p className=" text-red-500 text-xs text-end px-10">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className=" flex justify-between font-normal mx-10 py-2">
              <label
                className=" text-black text-lg font-medium mb-2"
                htmlFor="address"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                className="w-6/5 text-end outline-none px-2"
                placeholder="Address"
                {...register("address")}
              />
              {errors.address && (
                <p className=" text-red-500 text-xs text-end px-10">
                  {errors.address.message}
                </p>
              )}
            </div>
            <div className=" flex justify-between font-normal mx-10 py-2">
              <label
                className=" text-black text-lg font-medium mb-2"
                htmlFor="pincode"
              >
                Pincode:
              </label>
              <input
                type="pincode"
                id="pincode"
                className="w-6/5 text-end outline-none px-2"
                placeholder="000 000"
                {...register("pincode")}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs text-end px-10">
                  {errors.pincode.message}
                </p>
              )}
            </div>
            <div className=" flex justify-between font-normal mx-10 py-2">
              <label
                className=" text-black text-lg font-medium mb-2"
                htmlFor="status"
              >
                Status:
              </label>
              <select className="block w-2/6 px-1 py-3  text-sm text-black border border-gray-900 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black border-none">
                <option hidden>Status</option>

                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
              {/* {errors.status && (
                <p className="text-red-500 text-xs text-end px-10">{errors.status.message}</p>
              )} */}
            </div>

            <div className=" flex justify-between font-normal mx-10 py-2">
              <label
                className=" text-black text-lg font-medium mb-2"
                htmlFor="password"
              >
                Login Password:
              </label>
              <input
                type="password"
                id="password"
                className="w-6/5 text-end outline-none px-2"
                placeholder="*******"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-xs text-end px-10">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end  py-6 mx-10  gap-5 ">
            <button
              className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
              onClick={props.toggleModal}
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

export default AddUser;
