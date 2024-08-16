import React from "react";
import { IoIosNotifications } from "react-icons/io";
import frame from "../../assets/images/frame.png"
import master from "../../assets/images/img1.png"


const Header = () => {
  return (
    <div className=" flex justify-between bg-secondary p-3">
      <div className="flex gap-2 items-center  bg-slate-100  md:ml-3 ml-24 px-2 mx-1 pt-1 rounded-full">
       <img className="rounded-full " src={master} alt="image" />
       <h1 className="md:text-lg text-xs">Hi, Master</h1>
      </div>

      <div className="flex gap-5 items-center pr-5">
      <IoIosNotifications  className="text-2xl"/>
      <img src={frame} alt="last" className="w-12 h-8"/>
      </div>
    </div>
  );
};

export default Header;
