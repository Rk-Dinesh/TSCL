import React, { useState, Suspense } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { SiAwsorganizations } from "react-icons/si";
import { RxHome } from "react-icons/rx";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import { GoOrganization } from "react-icons/go";
import { MdOutlineContactSupport } from "react-icons/md";
import { BsShieldExclamation } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { LuUserCircle2 } from "react-icons/lu";
import Header from "./Header";

const Layout = ({ route }) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [submenuopen, Setsubmenuopen] = useState(false);
  const navigate = useNavigate();

  const handlelogout= () => {
    navigate('/login')
  }
  
  

  const Menus = [
    { title: "Dashboard", icon: <RxHome /> },
    { title: "Organization", icon: <GoOrganization />, to: "/organization" },
    { title: "Department", icon: <SiAwsorganizations />, to: "/department" },
    {
      title: "Locality",
      icon: <FaMapLocationDot />,
      submenu: true,
     
      submenuItems: [
        { title: "Zone", to: "/zone" },
        { title: "Ward", to: "/ward" },
        { title: "Street", to: "/street"},
      ],
    },
    { title: "Complaint", icon: <MdOutlineContactSupport />, to: "/complaint" },
    { title: "Grievances", icon: <BsShieldExclamation />, to: "/grievances" },
    { title: "Admin User", icon: <MdOutlineAdminPanelSettings />, to: "/admin" },
    { title: "Public User", icon: <LuUserCircle2 />, to: "/user" },
    { title: "Setting", icon: <IoMdSettings />, to: "/setting" },
    { title: "Logout", icon: <CiLogout />,onClick:handlelogout },
  ];
  


  return (
    <div className="w-full h-screen relative flex">
      <div className="z-10 absolute bottom-0 left-1">
        <img src="./src/assets/back_logo.png" alt="img" className="w-54 h-60"/>
      </div>
      <div
        className={`bg-primary relative grid grid-rows-12 transition-all duration-100 ${
          open ? "w-1/6" : "w-1/12"
        }`}
      >
        <BsChevronDown
          className={`text-white absolute top-0 -right-0 cursor-pointer transition-transform ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
          fontSize="small"
        />

        <span className="row-span-2 flex flex-col items-center gap-6 mt-3 mb-2">
          <img
            src={"./src/assets/logo.png"}
            alt="Image"
            className={`transition-all duration-500 ${
              open ? "w-40 h-16 mt-1" : "w-14 h-14 mt-2 mr-5"
            }`}
          />
          <h1
            className={`text-xl text-white font-alegerya transition-opacity duration-500 ${
              !open && "opacity-0"
            }`}
          >
            Admin Panel
          </h1>
        </span>

        <div className="row-span-10 mt-6 ">
          <ul className="pt-2">
            {Menus.map((menu, index) => (
              <React.Fragment key={index} >
                <NavLink to={menu.to}> 
                  <li
                    className={` cursor-pointer text-md flex items-center gap-x-3 p-2 mt-1 pl-6 transition-all duration-700 hover:bg-gray-200 hover:text-primary  ${
                      location.pathname === menu.to
                        ? "bg-gray-200 text-primary transition-all duration-500"
                        : "text-white"
                    }`}
                  
                  >
                    <div className="flex items-center gap-x-3">
                      <span
                        className={`block float-left ${
                          open ? "text-2xl" : "text-3xl"
                        }`}
                      >
                        <div className="">{menu.icon}</div>
                      </span>
                      <span
                        className={`font-alegerya text-base flex-1 duration-300 ${
                          !open && "hidden"
                        }`}
                      >
                        {menu.title}
                      </span>
                    </div>

                    {menu.submenu && open && (
                      <BsChevronDown
                        className={`cursor-pointer transition-transform delay-100  ${
                          submenuopen && "rotate-180"
                        }`}
                        onClick={() => Setsubmenuopen(!submenuopen)}
                      />
                    )}
                  </li>
                </NavLink>
                {menu.submenu && submenuopen && open && (
                  <ul>
                    {menu.submenuItems.map((submenuitem, subIndex) => (
                      <NavLink to={submenuitem.to} key={subIndex}>
                        <li
                          className={` cursor-pointer font-alegerya text-sm flex items-center gap-x-4 p-2 pl-20 hover:bg-gray-200 hover:text-primary ${
                            location.pathname === submenuitem.to
                              ? "bg-gray-200 text-primary "
                              : "text-white"
                          }`}
                        >
                          {submenuitem.title}
                        </li>
                      </NavLink>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            ))}
          </ul>
        </div>
      </div>

      <div
        className={`flex flex-col bg-blue-100  no-scrollbar h-screen transition-all duration-300 overflow-hidden ${
          open ? "w-5/6" : "w-11/12"
        }`}
      >
        <Header />
        <Suspense >
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default Layout;
