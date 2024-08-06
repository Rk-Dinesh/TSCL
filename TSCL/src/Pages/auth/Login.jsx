import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { FaAsterisk } from "react-icons/fa";
const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
const login = () =>{
    navigate('/organization')
}
  
  return (
    <div className="min-h-screen  bg-primary py-6 flex flex-col justify-center">
    <div className="flex gap-3  justify-center bg-primary text-center">
      <div className="flex flex-col items-center gap-8 rounded-3xl">
        <div className='flex items-center gap-3'>
        <img
          src='./src/assets/logo1.png'
          alt="Image"
          className="w-24 h-24"
        />
        <p className='text-6xl text-secondary'>TSCL</p>
        </div>
        <div className="p-6 w-[600px]  bg-white relative rounded-lg mt-3">
          <div className="font-lexend text-start mt-2">
            <form>
              <p className="text-2xl  mx-3 my-2">Sign in</p>
              
              <div className=" grid grid-cols-3  font-normal mx-6 py-3">
            <label
                className=" text-black flex text-lg font-medium mb-2"
                htmlFor="name"
              >
                Name<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="text"
                id="name"
                className=" border-2 rounded-lg  border-search px-2 col-span-2"
                placeholder="Enter your Name"
          
                />
               
            </div>
            <div className=" grid grid-cols-3  font-normal mx-6 py-3">
            <label
                className="col-span-1 text-black text-lg font-medium mb-2"
                htmlFor="phone"
              >
                Phone Number<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="text"
                id="phone"
                className="col-span-2 border-2 rounded-lg border-search px-2"
                placeholder="123456789"
                
                />
               
            </div>
            <div className=" grid grid-cols-3  font-normal mx-6 py-3">
            <label
                className="flex text-black text-lg font-medium mb-2"
                htmlFor="email"
              >
                Emial id<span className='text-red-700 px-2'>*</span>
              </label>
              <input
                type="email"
                id="email"
                className="col-span-2  border-2  rounded-lg border-search px-2"
                placeholder="tscl123@gmail.com"
               
                />
               
            </div>
              <div className="flex justify-center mt-5">
                <button className="px-4 py-1.5 text-white text-base rounded-full bg-primary hover:bg-primary-hover" onClick={login}>
                    Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Login
