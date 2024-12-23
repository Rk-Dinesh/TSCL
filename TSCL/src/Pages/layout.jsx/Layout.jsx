import React, { useState, Suspense } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { BsChevronDown } from "react-icons/bs";
import { TiThMenu } from "react-icons/ti";
import { ImUserTie } from "react-icons/im";
import { FaAlignRight } from "react-icons/fa6";
import { SiAwsorganizations } from "react-icons/si";
import { RxHome } from "react-icons/rx";
import { FaMapLocationDot } from "react-icons/fa6";
import { IoMdSettings } from "react-icons/io";
import { ImUserCheck } from "react-icons/im";
import { GoOrganization } from "react-icons/go";
import { MdModeComment, MdOutlineContactSupport } from "react-icons/md";
import { BsShieldExclamation } from "react-icons/bs";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { FaRegCircleUser } from "react-icons/fa6";
import { AiFillAlert } from "react-icons/ai";
import { CiBoxList } from "react-icons/ci";
import { CgTemplate } from "react-icons/cg";
import Header from "./Header";
import logo from "../../assets/images/logo1.png"
import Loading from "../../Loading";

const Layout = ({ permissions }) => {
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [submenuopen, Setsubmenuopen] = useState(false);
 
  const Menus = [
    //permissions["dashboard"] && { title: "Dashboard", icon: <RxHome />, to: "/dashboard" },
    permissions["dashboard"] && { title: "Dashboard", icon: <RxHome />, to: "/dashboard" },
    permissions["organization"] && { title: "Organization", icon: <GoOrganization />, to: "/organization" },
    permissions["department"] && { title: "Department", icon: <SiAwsorganizations />, to: "/department" },
    permissions["zone"] || permissions["ward"] || permissions["street"] ? {
      title: "Locality",
      icon: <FaMapLocationDot />,
      submenu: true,
      submenuItems: [
        permissions["zone"] && { title: "Zone", to: "/zone" },
        permissions["ward"] && { title: "Ward", to: "/ward" },
        permissions["street"] && { title: "Street", to: "/street" }
      ].filter(Boolean) 
    } : null,
    permissions["organization"] && { title: "Enquiry Resource", icon: <MdModeComment />, to: "/origin" },
    permissions["complaint"] && { title: "Complaint", icon: <MdOutlineContactSupport />, to: "/complaint" },
    permissions["complainttype"] && { title: "Complaint Type", icon: <CiBoxList />, to: "/complainttype" },
    permissions["grievance"] && { title: "Grievances", icon: <BsShieldExclamation />, to: "/grievances" },
    permissions["requestview1"] && { title: "Operator", icon: <BsShieldExclamation />, to: "/requestview1" },
    permissions["requestview2"] && { title: "Dept Head", icon: <BsShieldExclamation />, to: "/requestview2" },
    permissions["requestview3"] && { title: "JE", icon: <BsShieldExclamation />, to: "/requestview3" },
    permissions["requestview4"] && { title: "commisioner", icon: <BsShieldExclamation />, to: "/requestview4" },
    permissions["designation"] && { title: "Designation", icon: <ImUserTie />, to: "/designation" },
    permissions["emp"] && { title: "Employee", icon: <ImUserCheck />, to: "/emp" },
    permissions["admin"] && { title: "Admin User", icon: <MdOutlineAdminPanelSettings />, to: "/admin" },
    permissions["user"] && { title: "Public User", icon: <FaRegCircleUser />, to: "/user" },
    permissions["status"] && { title: "Status", icon: <FaAlignRight />, to: "/status" },
    permissions["escalate"] && { title: "Escalation", icon: <AiFillAlert />, to: "/escalate" },
    permissions["escalation"] && { title: "Escalation", icon: <AiFillAlert />, to: "/escalation" },
    permissions["template"] && { title: "Template", icon: <CgTemplate />, to: "/template" },
    permissions["setting"] && { title: "Setting", icon: <IoMdSettings />, to: "/setting" },
    
   
  ].filter(Boolean); 
  

  return (
    <div className="w-full h-screen relative  md:flex">
    
      <div
        className={` md:relative md:grid md:grid-rows-12 absolute   transition-all duration-100 ${
          open ? "md:w-1/6 w-3/6 h-screen bg-primary" : "md:w-1/12 md:bg-primary"
        }`}
      >
        <TiThMenu
          className={`absolute top-4 right-2 cursor-pointer transition-transform text-2xl ${open ? "text-white " : "md:text-white text-black "}  `}
          onClick={() => setOpen(!open)}
          fontSize="small"
        />

        <span className="row-span-2 flex flex-col items-center gap-6 mt-3 mb-2">
          <img
            src={logo}
            alt="Image"
            className={`transition-all duration-500 ${
              open ? "w-20 h-20 mt-1" : "md:w-14 md:h-14 md:mt-12 md:mr-5 w-9 h-9 mr-10"
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

        <div className="row-span-10 mt-4  overflow-auto no-scrollbar">
          <ul className="pt-2">
            {Menus.map((menu, index) => (
              <React.Fragment key={index} >
                <NavLink to={menu.to}> 
                  <li
                    className={` cursor-pointer text-md flex items-center gap-x-3 p-2 mt-1 pl-3 transition-all duration-700 hover:bg-gray-200 hover:text-primary   ${
                      location.pathname === menu.to 
                        ? `${ open ?  "bg-gray-200 text-primary transition-all duration-500" : "md:bg-gray-200 md:text-primary md:transition-all md:duration-500 duration-75"}`
                        : "text-white  "
                    }`}
                   
                  >
                    <div className="flex items-center gap-x-2">
                      <span
                        className={`md:block md:float-left ${
                          open ? "md:text-2xl" : "md:text-3xl md:ml-3 md:opacity-100 opacity-0"
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
                          className={` cursor-pointer font-alegerya text-sm flex items-center gap-x-2 p-2 pl-20 hover:bg-gray-200 hover:text-primary ${
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
          open ? "md:w-5/6 sm:w-full" : "md:w-11/12 sm:w-full"
        }`}
      >
        <Header />
        <Suspense fallback={<Loading />} >
          <Outlet />
        </Suspense>
      </div>

    </div>
  );
};

export default Layout;
