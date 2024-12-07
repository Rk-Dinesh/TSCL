import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveCancel from "../../components/SavaCancel";
import { BsEyeSlashFill } from "react-icons/bs";
import { BsEyeFill } from "react-icons/bs";
import axios from "axios";
import { API } from "../../Host";
import { toast } from "react-toastify";

const passwordSchema = yup.object().shape({
  login_password: yup
    .string()
    .required("Confirm password is required")
    .test(
      "passwords-match",
      "New password and confirm password must match",
      function (value) {
        const newPassword = this.parent.new_password;
        return newPassword === value;
      }
    ),
});

const PasswordAdmin = (props) => {
  const {
    register: registerPassword,
    formState: { errors: passwordErrors },
    handleSubmit: handleSubmitPassword,
  } = useForm({
    resolver: yupResolver(passwordSchema),
    mode: "onBlur",
  });

  const [showPassword, setShowPassword] = useState(false);
  const token = localStorage.getItem("token");

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onChangePassword = async (data) => {
    const formData = {
      ...data,
    };

    try {
      const response = await axios.post(
        `${API}/user/userforgotpassword?phone=${props.phoneID}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        props.togglePassModal();
      } else {
        //console.error("Error in posting data", response);
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error in posting data", error);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white w-[380px] h-fit  font-lexend m-2 rounded">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Change Password</h1>
        </div>
        <form onSubmit={handleSubmitPassword(onChangePassword)}>
          <div className="col-span-4 my-4  px-3">
            <div className="flex items-center border-2  rounded-lg mx-2  px-2 py-2 outline-none">
              <input
                type={showPassword ? "text" : "password"}
                id="new_password"
                className="w-full md:w-72 text-start outline-none"
                placeholder="New Password"
                {...registerPassword("new_password")}
              />
              <button
                type="button"
                className="text-gray-500 hover:text-gray-900 transition duration-300 outline-none"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
              </button>
            </div>
          </div>

          <div className="col-span-4 my-4  px-3">
            <div className="flex items-center border-2  rounded-lg mx-2  px-2 py-2 outline-none">
              <input
                type={showPassword ? "text" : "password"}
                id="login_password"
                className="w-full md:w-72 text-start outline-none "
                placeholder="Confirm Password"
                {...registerPassword("login_password")}
              />
              <button
                type="button"
                className="text-gray-500 hover:text-gray-900 transition duration-300 outline-none"
                onClick={handleTogglePasswordVisibility}
              >
                {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
              </button>
            </div>
            {passwordErrors.login_password && (
              <p className="text-red-500 text-xs text-start px-2 pt-2">
                {passwordErrors.login_password.message}
              </p>
            )}
          </div>
          <div className="py-6">
            <SaveCancel onCancel={props.togglePassModal} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordAdmin;
