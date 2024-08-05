import React, { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";

const Grivences = () => {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const navigate = useNavigate();

  const handleform = () => {
    navigate("/form");
  };
  return (
    <Fragment>
      <div className="  bg-blue-100 h-screen">
        <div className="flex flex-row justify-between gap-3 p-2 mt-3 mx-8">
          <div className="items-center ">
            <h1 className="text-2xl font-medium mt-2">New Grievances</h1>
          </div>
          <div className="flex flex-row gap-7">
            <p className="flex items-center gap-3 bg-white px-2 rounded-full">
              <IoMdSearch className="text-xl" />
              <input
                type="search"
                className="  outline-none bg-transparent"
                placeholder=""
              />
            </p>
            <a href="#">
              <button className="flex gap-2 items-center border-2 font-lexend border-blue-500 bg-slate-100 text-blue-500 rounded-full p-2 w-40 justify-center">
                {" "}
                <FaPlus />
                Bulk Upload
              </button>
            </a>
            <a href="#">
              <button className="flex gap-2 items-center border-2 font-lexend bg-slate-100 text-black rounded-full p-2 w-32 justify-between">
                {" "}
                CSV <RiArrowDropDownLine />
              </button>
            </a>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="flex justify-between my-2 mx-8">
            <a href="#">
              <button
                className="flex flex-row-2 gap-2 items-center border-2 bg-blue-500 text-white font-lexend rounded-full p-2.5 w-fit justify-between"
                onClick={handleform}
              >
                <FaPlus /> Add New Grievances
              </button>
            </a>
          </div>
        </div>
        <div className="bg-white mx-10 my-5 rounded-lg overflow-x-auto">
          <table className="w-full  ">
            <thead>
            <tr className="border-b-2 border-gray-300">
                <th className="py-2">
                  <p className="flex gap-2 items-center mx-4 my-2 font-lexend font-semibold whitespace-nowrap">
                    S.no <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Name <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Contact <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Email
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Address
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Origin
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Complaint type
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Department
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Complaint
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Zone
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Ward
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Street
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                    Pincode
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="mx-4 my-3 font-lexend font-semibold whitespace-nowrap">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
             
              <tr className="border-b-2 border-gray-300">
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend whitespace-nowrap">
                    {" "}
                    1
                  </div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2 font-lexend whitespace-nowrap text-center">
                    Ravi
                  </div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2  font-lexend whitespace-nowrap text-center">
                    1234567890
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    ravi@gmail.com
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Chennai
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Origin
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Call
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    PWD
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Water
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Chennai
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Ward-52
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Skathi Nagar
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    600130
                  </div>
                </td>
                <td>
                  <div className="mx-4 my-3 whitespace-nowrap">
                    <BsThreeDotsVertical />
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend whitespace-nowrap">
                    {" "}
                    2
                  </div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2 font-lexend whitespace-nowrap text-center">
                    Rk
                  </div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2  font-lexend whitespace-nowrap text-center">
                    1234567890
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    rk@gmail.com
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    ChennaiOne
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Origin12
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Website
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    EB
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Current
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Chennai
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Ward-56
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    Shanthi Nagar
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                    6001240
                  </div>
                </td>
                <td>
                  <div className="mx-4 my-3 whitespace-nowrap">
                    <BsThreeDotsVertical />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  );
};

export default Grivences;
