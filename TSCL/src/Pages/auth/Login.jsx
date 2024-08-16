import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/logo1.png"
import { FaAsterisk } from "react-icons/fa";
const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const handlesignUp = () =>{
    navigate('/signup')
}

const handlesignIn = () =>{
  navigate('/organization')
}
  
  return (
    <div className="h-screen  bg-primary py-6 flex flex-col items-center gap-8 justify-center ">
    
     
        <div className='flex items-center gap-3'>
        <img
          src={logo}
          alt="Image"
          className="w-24 h-24"
        />
        <p className='text-6xl text-secondary'>TSCL</p>
        </div>
        <div className="p-6  md:w-[600px]   bg-white relative rounded-lg m-5">
          <div className="font-lexend text-start mt-2">
            <form>
              <p className="text-xl  mx-3 my-2">Sign In</p>
              
            <div className=" grid grid-cols-3  font-normal mx-6 py-3">
            <label
                className="flex text-black text-lg font-medium mb-2 "
                htmlFor="email"
              >
                Email / Phone<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="email"
                id="email"
                className="col-span-2  border rounded-lg py-1.5 px-2 outline-none"
                placeholder="email address or phone number"
               
                />
               
            </div>

            <div className=" grid grid-cols-3  font-normal mx-6 py-3">
            <label
                className="flex text-black text-lg font-medium mb-2"
                htmlFor="password"
              >
               Password<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="password"
                id="password"
                className="col-span-2  border  rounded-lg py-1.5 px-2 outline-none"
                placeholder="* * * * * * * * *"
               
                />
               
            </div>
              <div className="flex justify-center mt-5">
                <button className="px-5 py-1.5 text-white text-base rounded-full bg-primary hover:bg-primary-hover" onClick={handlesignIn}>
                    Login
                </button>
              </div>
            </form>
            <p className="text-sm text-center mt-3">
           Don't have an account?{" "}
            <span className="text-base text-primary" onClick={handlesignUp}>
              Sign Up
            </span>
          </p>
          </div>
        </div>
      
   
  </div>
  )
}

export default Login
