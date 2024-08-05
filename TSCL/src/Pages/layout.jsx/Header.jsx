import React from "react";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  return (
    <div className=" flex justify-between bg-secondary p-3">
      <div className="flex gap-2 items-center  bg-slate-100  ml-3 px-3 pt-1 rounded-full">
       <img className="rounded-full" src="./src/assets/img1.png" alt="image" />
       <h1 className="text-lg">Hi, Master</h1>
      </div>

      <div className="flex gap-5 items-center pr-5">
      <IoIosNotifications  className="text-2xl"/>
      <img src="./src/assets/frame.png" alt="last" className="w-12 h-8"/>
      </div>
    </div>
  );
};

export default Header;
