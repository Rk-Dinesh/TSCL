import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaAsterisk } from "react-icons/fa";
import logo from "../../assets/images/logo1.png"
const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

const handleOtp = () =>{
    navigate('/auth')
}

const handleSignIn = () =>{
    navigate('/')
}
  
  return (
    <div className="h-screen  bg-primary py-6 flex flex-col md:items-center gap-8 justify-center ">
    
     
        <div className='flex items-center justify-center gap-3'>
        <img
          src={logo}
          alt="Image"
          className="w-24 h-24"
        />
        <p className='text-6xl text-secondary'>TSCL</p>
        </div>
        <div className='mx-3'>
        <div className="p-6  md:max-w-[600px] w-full   md:bg-white  relative rounded-lg ">
          <div className="font-lexend text-start mt-2">
            <form>
              <p className="text-xl md:text-black text-gray-200   md:mx-3 my-3">Sign Up</p>
              
              <div className="grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5">
            <label
                className=" md:text-black text-slate-800 flex text-lg font-medium mb-2 col-span-1"
                htmlFor="name"
              >
                Name<span className='md:text-red-700 text-red-900 px-2'>*</span>
              </label>
              <input
                type="text"
                id="name"
                className="md:col-span-2 col-span-1 border outline-none rounded-lg   px-5  py-1.5 bg-gray-200 md:bg-gray-50"
                placeholder="Enter your Name"
          
                />
               
            </div>
            <div className=" grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5">
            <label
                className="col-span-1 md:text-black text-slate-800 text-lg font-medium mb-2 "
                htmlFor="email"
              >
                Email Id<span className='md:text-red-700 text-red-900 px-2'>*</span>
              </label>
              <input
                type="email"
                id="email"
                className="md:col-span-2 col-span-1  border outline-none  rounded-lg py-1.5 px-5 bg-gray-200 md:bg-gray-50"
                placeholder="tscl123@gmail.com"
               
                />
               
            </div>
            <div className=" grid md:grid-cols-3 grid-col-2 font-normal md:mx-4 py-1.5">
            <label
                className=" md:text-black text-slate-800 text-lg font-medium mb-2 col-span-1"
                htmlFor="phone"
              >
                Phone Number<span className='md:text-red-700 text-red-900 px-2'>*</span>
              </label>
              <input
                type="text"
                id="phone"
                className="md:col-span-2 col-span-1 border rounded-lg  px-5 py-1.5 outline-none bg-gray-200 md:bg-gray-50"
                placeholder="123456789"
                
                />
               
            </div>
          

            <div className="grid md:grid-cols-3 grid-col-2  font-normal md:mx-4 py-1.5">
            <label
                className="flex md:text-black text-slate-800 text-lg font-medium mb-2 col-span-1"
                htmlFor="password"
              >
                Password<span className='md:text-red-700 text-red-900 px-2'>*</span>
              </label>
              <input
                type="password"
                id="password"
                className="md:col-span-2 col-span-1  border outline-none  rounded-lg py-1.5 px-5 bg-gray-200 md:bg-gray-50"
                placeholder="* * * * * * * * * * "
               
                />
               
            </div>
              <div className="flex justify-center mt-5">
                <button className="px-5 py-1.5 md:text-white text-primary text-base rounded-full md:bg-primary bg-gray-50 md:hover:bg-primary-hover" onClick={handleOtp}>
                    Send OTP
                </button>
              </div>
            </form>
            <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <span className="text-base md:text-primary text-white"onClick={handleSignIn}>
             Sign In
            </span>
          </p>
          </div>
        </div>
        </div>
   
  </div>
  )
}

export default SignUp
