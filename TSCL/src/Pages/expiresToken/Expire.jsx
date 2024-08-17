import React,{useEffect} from 'react'
import { IoMdClose } from "react-icons/io";
import { WiTime8 } from "react-icons/wi";
import { useNavigate } from 'react-router-dom';

const Expire = () => {
    const navigate = useNavigate();
  
    const handleLogout = () => {
      sessionStorage.removeItem('token');
      navigate('/');
    };
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
    <div className="bg-white w-[420px] h-[280px] font-lexend m-2 rounded-lg">
        <div>
        <div className="flex justify-between items-center px-5 text-white bg-red-700 h-12 flex-wrap rounded-t-lg">
              <p className="text-lg">Session Expired</p>
              <button  className="">
                <IoMdClose className="text-2xl" onClick={handleLogout}/>
              </button>
            </div>
        </div>
        <div className='flex items-center gap-3 justify-center my-3 mt-8'>
        <WiTime8 className='text-5xl text-red-700'/>
        <p className='text-base'>Your session has expired.</p>
        </div>
        <p className='text-base text-center my-4'>You will be redirected to login page.</p>
       <div className='flex justify-end mr-10 mt-8'>
       <button className='px-8 py-2.5 bg-red-500 text-white rounded text-base ' onClick={handleLogout}>OK</button>
       </div>
      </div>
  </div>
  )
}

export default Expire