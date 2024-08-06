import React, { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddOrganization from "./AddOrganization";

const Organization = () => {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };
  return (
    <Fragment>
      <div className="  bg-blue-100 h-screen">
        <div className="flex flex-row justify-end gap-3 p-2 mt-3 mx-8">
          <p className="flex items-center gap-3 bg-white px-2 rounded-full">
            <IoMdSearch className="text-xl" />
            <input
              type="search"
              className="  outline-none bg-transparent"
              placeholder=""
            />
          </p>
          <a href="#">
            <button className="flex gap-2 items-center border-2 border-blue-500 font-lexend bg-slate-100 text-blue-500 rounded-full p-2 w-40 justify-center">
              {" "}
              <FaPlus />
              Bulk Upload
            </button>
          </a>
          <a href="#">
            <button className="flex gap-2 items-center border-2 bg-slate-100  font-lexend text-black rounded-full p-2 w-32 justify-between">
              {" "}
              CSV <RiArrowDropDownLine />
            </button>
          </a>
        </div>
        <div className="flex justify-between my-2 mx-8">
          <h1 className="text-2xl font-medium ml-8"> Organization Structure</h1>
          <a href="#">
            <button
              className="flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between mb-2"
              onClick={toggleModal}
            >
              <FaPlus /> Add New Organization
            </button>
          </a>
        </div>

        <div className="bg-white mx-10 rounded-lg my-2 overflow-x-auto">
          <table className="w-full  ">
            <thead className=" border-b-2 border-gray-300">
              <th className="py-3 font-normal text-xl font-lexend">
                Employee Details
              </th>
              <tr className="border-b-2 border-gray-300">
                <th className="">
                  <p className="flex gap-2 items-center mx-4 my-2 font-lexend justify-center font-semibold">
                    Employee <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                    Name <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                    Occupation <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                    Phone <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                    Mail id <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="mx-4 my-3 font-semibold font-lexend">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-gray-300">
                <td className="">
                  <p className="items-center mx-4 my-2 font-lexend text-center">
                    123456
                  </p>
                </td>
                <td>
                  <div className="items-center mx-4  my-2 font-lexend text-center">
                    Alwin
                  </div>
                </td>
                <td>
                  <p className="items-center mx-4  my-2  font-lexend text-center">
                    JE
                  </p>
                </td>
                <td>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center">
                    6767676767
                  </p>
                </td>
                <td>
                  <p className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center">
                    masilamani123@gmail.com
                  </p>
                </td>
                <td>
                  <p className="mx-4 my-3">
                    <BsThreeDotsVertical />
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isModal && <AddOrganization toggleModal={toggleModal} />}
    </Fragment>
  );
};

export default Organization;
