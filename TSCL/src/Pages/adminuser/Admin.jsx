import React, { Fragment, useState } from 'react'
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddAdmin from './AddAdmin';


const Admin = () => {
  const [isModal,setIsModal]=useState(false)
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
            className="  outline-none bg-transparent"
            placeholder=""
          />
        </p>
        <a href="#">
          <button className="flex gap-2 items-center border-2 border-blue-500  font-lexend bg-slate-100 text-blue-500 rounded-full p-2 w-40 justify-center">
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
        <h1 className="text-2xl font-medium ml-8 mt-1  font-lexend">Admin Details</h1>
        <a href="#">
          <button className="flex flex-row-2 gap-2  items-center border-2  font-lexend bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between" onClick={toggleModal}>
            <FaPlus /> Add New Admin 
          </button>
        </a>
      </div>
      
      <div className="bg-white mx-10 my-5 rounded-lg overflow-x-auto">
        <table className="w-full  ">
       <thead>
       <tr className="border-b-2 border-gray-300">
              <th className="py-2">
                <div className="flex gap-2 items-center mx-4 my-2 font-lexend font-semibold whitespace-nowrap">
                  S.no <RiExpandUpDownLine />
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                Username <RiExpandUpDownLine />
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                Department<RiExpandUpDownLine />
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                   Phone<RiExpandUpDownLine />
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                   Email<RiExpandUpDownLine />
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                   Status<RiExpandUpDownLine />
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                Role<RiExpandUpDownLine />
                </div>
              </th>
              <th>
                <div className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold whitespace-nowrap">
                  CreatedBy<RiExpandUpDownLine />
                </div>
              </th>
              <th>
                <div className="mx-4 my-3 font-lexend font-semibold whitespace-nowrap">
                  Action
                </div>
              </th>
            </tr>
       </thead>
          <tbody>
          
            <tr className="border-b-2 border-gray-300">
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend whitespace-nowrap"> 1</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2 font-lexend whitespace-nowrap text-center">Ravi</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2  font-lexend whitespace-nowrap text-center">PWD</div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                  1234567890 
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                  hackwit@gmail.com
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                  Active
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                 Admin 
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                  Admin
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
                  <div className="items-center mx-4 my-2 font-lexend whitespace-nowrap"> 2</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2 font-lexend whitespace-nowrap text-center">Rk</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2  font-lexend whitespace-nowrap text-center">EB</div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                  0987654321 
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                  rk@gmail.com
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                  InActive
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                 Worker
                  </div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend whitespace-nowrap justify-center">
                  Admin
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
     {isModal && <AddAdmin toggleModal={toggleModal} />}
    </Fragment>
  )
}

export default Admin
