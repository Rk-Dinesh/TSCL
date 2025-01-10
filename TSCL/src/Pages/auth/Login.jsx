import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo1.png";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { API } from "../../Host";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

const UserSchema = yup.object().shape({
  identifier: yup.string().required("Identifier is required"),
  login_password: yup.string().required("password is required"),
});

const Login = ({ setToken }) => {
  const navigate = useNavigate();
  const [timeoutId, setTimeoutId] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(UserSchema),
    mode: "all",
  });

  function getTokenExpirationDuration(token) {
    const decodedToken = jwtDecode(token);
    const expirationTime = decodedToken.exp;
    const currentTime = Math.floor(Date.now() / 1000);
    const expirationDuration = expirationTime - currentTime;
    return expirationDuration;
  }

  const onSubmit = async (data) => {
    let isRegularUserLoggedIn = false;
    let token = null;

    try {
      const response = await axios.post(`${API}/user/loginweb`, data);

      if (response.status === 200) {
        isRegularUserLoggedIn = true;
        token = response.data.token;
        const decodedToken = jwtDecode(token);
        localStorage.setItem("dept", decodedToken.dept);
        localStorage.setItem("code", decodedToken.code);
        localStorage.setItem("role", decodedToken.role);
        localStorage.setItem("name", decodedToken.name);
        localStorage.setItem("designation", decodedToken.designation);
      }
    } catch (error) {
      // console.error("Error logging in as user", error);
    }
    if (isRegularUserLoggedIn === true) {
      const tokenExpirationDuration = getTokenExpirationDuration(token);
      setToken(token);
      localStorage.setItem("token", token);
      toast.success("Logged in successfully");
      navigate("/dashboard");
      const timeoutId = setTimeout(() => {
        navigate("/token");
      }, tokenExpirationDuration * 1000);
      setTimeoutId(timeoutId);
    } else {
      toast.error("Invalid Credentials");
    }
  };

  return (
    <div className="h-screen  bg-primary py-6 flex flex-col md:items-center gap-8 justify-center ">
      <div className="flex flex-col items-center justify-center gap-1 ">
        <img src={logo} alt="Image" className="w-24 h-24" />
        <p className="text-3xl font-semibold drop-shadow-xl text-secondary">MADURAI SMART CITY</p>
      </div>
      <div className="mx-3  ">
        <div className="p-6  md:max-w-[600px] w-full  md:bg-white  rounded-lg ">
          <div className="font-lexend text-start mt-2">
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="text-lg font-medium md:text-black text-gray-200  md:mx-2  my-2 ">
                SIGN IN
              </p>

              <div className=" grid md:grid-cols-3 grid-col-2 items-center font-normal md:mx-4 py-3">
                <label
                  className="flex md:text-black text-slate-800 text-base font-medium  col-span-1 "
                  htmlFor="identifier"
                >
                  Email / Phone
                  <span className="md:text-red-700 text-red-900 px-2">*</span>
                </label>
                <input
                  type="text"
                  id="identifier"
                  className="md:col-span-2 col-span-1 w-full border rounded-lg py-1.5 px-5 outline-none"
                  placeholder="Email  / Mobile number"
                  {...register("identifier")}
                />
                {errors.identifier && (
                  <p className="md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3">
                    {errors.identifier.message}
                  </p>
                )}
              </div>

              <div className=" grid md:grid-cols-3 grid-col-2 items-center   font-normal md:mx-4 py-3">
                <label
                  className="md:text-black text-slate-800  text-base font-medium  col-span-1"
                  htmlFor="login_password"
                >
                  Password
                  <span className="md:text-red-700 text-red-900 px-2">*</span>
                </label>
                <input
                  type="password"
                  id="login_password"
                  className="md:col-span-2 col-span-1 w-full  border  rounded-lg py-1.5 px-2 outline-none"
                  placeholder="* * * * * * * * "
                  {...register("login_password")}
                />
                {errors.login_password && (
                  <p className="md:text-red-500  text-red-700 md:text-xs text-sm text-end mt-1 md:col-span-3">
                    {errors.login_password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center mt-5">
                <button className="px-5 py-1.5 md:text-white text-primary text-base rounded-full md:bg-primary bg-gray-50 md:hover:bg-primary-hover">
                  Login
                </button>
              </div>
            </form>
            {/* <p className="text-sm text-center mt-3">
              Don't have an account?{" "}
              <span className="text-base md:text-primary text-white" onClick={handlesignUp}>
                Sign Up
              </span>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
