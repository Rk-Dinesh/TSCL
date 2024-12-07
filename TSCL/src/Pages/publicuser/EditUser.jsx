import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../Host";
import { toast } from "react-toastify";
import decryptData from "../../Decrypt";
import SaveCancel from "../../components/SavaCancel";

const AddUserSchema = yup.object().shape({
  public_user_name: yup.string().required("User Name is required"),
  address: yup.string().required("Address is required"),
  pincode: yup.string().required("Pincode is required"),
  user_status: yup
    .string()
    .test(
      "not-select",
      "Please select an Status",
      (value) => value !== "" && value !== "Status"
    ),
});

const EditUser = (props) => {
  const { userId } = props;
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/public-user/getbyid?public_user_id=${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = decryptData(response.data.data);

        setValue("public_user_name", data.public_user_name);
        setValue("address", data.address);
        setValue("pincode", data.pincode);
        setValue("user_status", data.user_status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [userId, setValue]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    };

    try {
      const response = await axios.post(
        `${API}/public-user/update?public_user_id=${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Public User Updated Successfully");
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
      <div className="bg-white w-fit h-fit  font-lexend m-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b-2 border-gray-300 mx-10 my-5">
            <div className=" grid grid-cols-3 gap-3">
              <label
                className="block text-black text-lg font-medium mb-2 col-span-1 whitespace-nowrap"
                htmlFor="public_user_name"
              >
                Name
              </label>
              <input
                type="text"
                id="public_user_name"
                className="mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2"
                placeholder="User Name"
                {...register("public_user_name")}
              />
            </div>
            {errors.public_user_name && (
              <p className="text-red-500 text-xs text-end ">
                {errors.public_user_name.message}
              </p>
            )}
          </div>

          <div className=" flex flex-col gap-3 mx-10 my-1 ">
            {/* <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className=" text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor="Phone"
                >
                  Phone :
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
                  Email Id :
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
            </div> */}

            <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className=" text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor="address"
                >
                  Address :
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
                  Pincode :
                </label>
                <input
                  type="text"
                  id="pincode"
                  className=" text-end outline-none col-span-2"
                  placeholder="Pincode "
                  {...register("pincode")}
                />
              </div>
              {errors.pincode && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            <div>
              <div className=" grid grid-cols-3">
                <label
                  className=" text-black text-lg font-medium mb-2 col-span-2"
                  htmlFor="user_status"
                >
                  Status:
                </label>
                <select
                  className="   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none"
                  id="user_status"
                  {...register("user_status")}
                >
                  <option value="" hidden>
                    Status
                  </option>
                  <option value="active">Active</option>
                  <option value="inactive">InActive</option>
                </select>
              </div>
              {errors.user_status && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.user_status.message}
                </p>
              )}
            </div>
          </div>
          <div className="py-6">
            <SaveCancel onCancel={props.toggleModal} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
