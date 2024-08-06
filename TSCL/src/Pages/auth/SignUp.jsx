import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaAsterisk } from "react-icons/fa";
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
    navigate('/login')
}
  
  return (
    <div className="h-screen  bg-primary py-6 flex flex-col items-center gap-8 justify-center ">
    
     
        <div className='flex items-center gap-3'>
        <img
          src='./src/assets/logo1.png'
          alt="Image"
          className="w-24 h-24"
        />
        <p className='text-6xl text-secondary'>TSCL</p>
        </div>
        <div className="p-6  md:w-[600px]   bg-white relative rounded-lg m-5">
          <div className="font-lexend text-start mt-2">
            <form>
              <p className="text-xl  mx-3 my-3">Sign Up</p>
              
              <div className=" grid grid-cols-3  font-normal mx-6 py-1.5">
            <label
                className=" text-black flex text-lg font-medium mb-2"
                htmlFor="name"
              >
                Name<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="text"
                id="name"
                className=" border outline-none rounded-lg   px-2 col-span-2 py-1.5"
                placeholder="Enter your Name"
          
                />
               
            </div>
            <div className=" grid grid-cols-3  font-normal mx-6 py-1.5">
            <label
                className="flex text-black text-lg font-medium mb-2"
                htmlFor="email"
              >
                Email Id<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="email"
                id="email"
                className="col-span-2  border outline-none  rounded-lg py-1.5 px-2"
                placeholder="tscl123@gmail.com"
               
                />
               
            </div>
            <div className=" grid grid-cols-3  font-normal mx-6 py-1.5">
            <label
                className="col-span-1 text-black text-lg font-medium mb-2"
                htmlFor="phone"
              >
                Phone Number<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="text"
                id="phone"
                className="col-span-2 border rounded-lg  px-2 py-1.5 outline-none"
                placeholder="123456789"
                
                />
               
            </div>
          

            <div className=" grid grid-cols-3  font-normal mx-6 py-1.5">
            <label
                className="flex text-black text-lg font-medium mb-2"
                htmlFor="password"
              >
                Password<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="password"
                id="password"
                className="col-span-2  border outline-none  rounded-lg py-1.5 px-2"
                placeholder="* * * * * * * * * * "
               
                />
               
            </div>
              <div className="flex justify-center mt-5">
                <button className="px-4 py-1.5 text-white text-base rounded-full bg-primary hover:bg-primary-hover" onClick={handleOtp}>
                    Send OTP
                </button>
              </div>
            </form>
            <p className="text-sm text-center mt-3">
            Already have an account?{" "}
            <span className="text-base text-primary"onClick={handleSignIn}>
             Sign In
            </span>
          </p>
          </div>
        </div>
      
   
  </div>
  )
}

export default SignUp
