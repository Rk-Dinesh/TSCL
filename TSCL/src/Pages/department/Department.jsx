import React, { Fragment, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import AddDepartment from './AddDepartment';

const Department = () => {
    const [isModal,setIsModal]=useState(false);
    const toggleModal=()=>{
        setIsModal(!isModal)
    }
  return (
    <Fragment>
  
       <div className="  bg-blue-100 h-screen">
      <div className="flex flex-row justify-end gap-3 p-2 mt-3 mx-8">
        <p className="flex items-center gap-3 bg-white px-2 rounded-full">
        <IoMdSearch className="text-xl"/>
          <input
            type="search"
            className=" font-lexend outline-none bg-transparent"
            placeholder="Search for Request"
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
      <div className="flex justify-between my-2 mx-8">
        <h1 className="text-2xl font-medium ml-8 font-lexend" >Department</h1>
        <a href="#">
          <button className="flex flex-row-2 gap-2  items-center border-2 bg-blue-500 text-white font-lexend rounded-full p-2.5 w-fit justify-between" onClick={toggleModal}>
            <FaPlus /> Add New Department
          </button>
        </a>
      </div>

      <div className="bg-white mx-10  rounded-lg">
        <table className="w-full  ">
          <thead className="">
            <tr className="text-xl  border-b-2 border-gray-300 ">
              <th className="text-start font-normal px-6 py-2 font-lexend
              ">Department</th>
              <th className="text-start font-normal font-lexend">Status</th>
              <th className="text-start font-normal font-lexend ">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
            <td>
              <div className="flex gap-2 items-center mx-4 my-3">
                <img src="./src/assets/table.png" alt="logo" />
                <p className="font-lexend">Public Work Department</p>
              </div>
            </td>
            <td>
            <select
                  className="block w-2/6 px-1 py-3  text-sm text-black border border-gray-900 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black"
                 
                >
                  <option disabled hidden>
                    Choose a document
                  </option>

                  <option value="active">Active</option>
                  <option value="inactive">InActive</option>
                </select>
            </td>
            <td>
              <button className="border-2 border-gray-300 text-sm px-4 py-2 rounded-lg flex  gap-5">
                <MdOutlineModeEdit className="text-xl" />
                <RiDeleteBin6Line className="text-xl" />{" "}
              </button>
            </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
   
    {isModal && <AddDepartment toggleModal={toggleModal}/>}
    </Fragment>
  )
}

export default Department
