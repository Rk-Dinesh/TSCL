import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../Host";
import { toast } from "react-toastify";

const AddAdminSchema = yup.object().shape({
  user_name: yup.string().required("User Name is required"),
  dept_name:yup.string().required("Department is required"),
  phone: yup.string().required("Phone Number is required"),
  email: yup.string().required("Email Id  is required"),
  address: yup.string().required("Address is required"),
  login_password: yup.string().required("password is required"),
  pincode: yup.string().required("Pincode is required"),
  // status: yup
  // .string()
  // .test(
  //   "not-select",
  //   "Please select an Status",
  //   (value) => value !== "" && value !== "Status"
  // ),
  role: yup
  .string()
  .test(
    "not-select",
    "Please select an Role",
    (value) => value !== "" && value !== "Role"
  )
});

const AddAdmin = (props) => {

  const { ExistingRoles,ExistingDept } = props;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(AddAdminSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      status:"active",
      created_by_user:"admin"
    };

    // console.log(formData);

    try {
      const response = await axios.post(`${API}/user/post`, formData);

      if (response.status === 200) {
        toast.success("Admin created Successfully");
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
    <div className="bg-white w-fit h-fit  font-lexend">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="border-b-2 border-gray-300 mx-10 my-5">
          <div className=" grid grid-cols-3 gap-3">
            <label
              className="block text-black text-lg font-medium mb-2 col-span-1"
              htmlFor="user_name"
            >
              User Name
            </label>
            <input
              type="text"
              id="user_name"
              className="mx-2 font-lexend px-2 text-sm outline-none col-span-2"
              placeholder="User Name"
              {...register("user_name")}
            />
          </div>
          {errors.user_name && (
            <p className="text-red-500 text-xs text-end ">
              {errors.user_name.message}
            </p>
          )}
        </div>

        <div className=" flex flex-col gap-3 mx-10 my-1 ">

        <div>
            <div className="grid grid-cols-3 gap-3">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-2"
                htmlFor="dept_name"
              >
                Department:
              </label>
              <select className="   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none"
              id="dept_name"
               {...register("dept_name")}
               >
                <option value="">Department</option>
                {ExistingDept.map((dept) => (
                  <option key={dept.dept_id} value={dept.dept_name}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.dept_name && (
              <p className="text-red-500 text-xs text-end ">
                {errors.dept_name.message}
              </p>
            )}
          </div>

          <div>
            <div className="grid grid-cols-3 gap-3">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-1"
                htmlFor="Phone"
              >
                Phone No:
              </label>
              <input
                type="text"
                id="phone"
                className="w-6/5 text-end outline-none col-span-2"
                placeholder="Phone Number"
                {...register("phone")}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-xs text-end ">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <div className="grid grid-cols-3 gap-3">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-1"
                htmlFor="email"
              >
                Email Id:
              </label>
              <input
                type="email"
                id="email"
                className=" text-end outline-none col-span-2"
                placeholder="abc@gmail.com"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs text-end ">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="grid grid-cols-3 gap-3">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-1"
                htmlFor="address"
              >
                Address:
              </label>
              <input
                type="text"
                id="address"
                className=" text-end outline-none col-span-2"
                placeholder="Address"
                {...register("address")}
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-xs text-end ">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <div className="grid grid-cols-3 gap-3">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-1"
                htmlFor="pincode"
              >
                Pincode:
              </label>
              <input
                type="text"
                id="pincode"
                className=" text-end outline-none col-span-2"
                placeholder="Pincode Number"
                {...register("pincode")}
              />
            </div>
            {errors.pincode && (
              <p className="text-red-500 text-xs text-end ">
                {errors.pincode.message}
              </p>
            )}
          </div>

          {/* <div>
            <div className=" grid grid-cols-3">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-2"
                htmlFor="status"
              >
                Status:
              </label>
              <select className="   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none"
              id="status"
               {...register("status")}
               >
                <option value="">Status</option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
            </div>
            {errors.status && (
              <p className="text-red-500 text-xs text-end ">
                {errors.status.message}
              </p>
            )}
          </div> */}

          <div>
            <div className=" grid grid-cols-3">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-2"
                htmlFor="role"
              >
                Role:
              </label>
              <select className="   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none"
              id="role"
               {...register("role")}
               >
                <option value="">Role</option>
                {ExistingRoles.map((role) => (
                  <option key={role.role_name} value={role.role_name}>
                    {role.role_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.role && (
              <p className="text-red-500 text-xs text-end ">
                {errors.role.message}
              </p>
            )}
          </div>

          <div>
            <div className="grid grid-cols-3 gap-3">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-1"
                htmlFor="login_password"
              >
                Password:
              </label>
              <input
                type="password"
                id="login_password"
                className=" text-end outline-none col-span-2"
                placeholder="Password"
                {...register("login_password")}
              />
            </div>
            {errors.login_password && (
              <p className="text-red-500 text-xs text-end ">
                {errors.login_password.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end  py-6 mx-10 my-3 gap-5 ">
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

export default AddAdmin;
