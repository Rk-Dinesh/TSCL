import React, { Fragment,useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddWard from "./AddWard";

const Ward = () => {
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
      <div className="flex justify-between items-center my-2 mx-8">
        <h1 className="text-2xl font-medium ml-8">Locality</h1>
        <a href="#">
          <button className="flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between" onClick={toggleModal}>
            <FaPlus /> Add New Ward
          </button>
        </a>
      </div>


      <div className="bg-white mx-10 rounded-lg">
        <table className="w-full  ">
          <thead className=" border-b-2 border-gray-300">
            <th className="py-3 font-medium font-lexend text-xl">
              Ward Catogories
            </th>
            <tr className="border-b-2 border-gray-300">
              <th className="">
                <p className="flex gap-2 items-center mx-4 my-2 font-lexend font-semibold">
                  Ward <RiExpandUpDownLine />
                </p>
              </th>
              <th className="">
                <p className="flex gap-2 items-center mx-4 my-2 font-lexend font-semibold">
                  Zone <RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold">
                CreatedBy <RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold">
                CreatedAt<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p className="flex gap-2 items-center mx-4  my-2 font-lexend font-semibold">
                   UpdatedAt<RiExpandUpDownLine />
                </p>
              </th>
              <th>
                <p className="mx-4 my-3 font-semibold font-lexend">Action</p>
              </th>
            </tr>
          </thead>
          <tbody>
            
              <tr className="border-b-2 border-gray-300">
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend ">Ward 1</div>
                </td>
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend ">Zone 1</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2 font-lexend ">Admin</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2  font-lexend ">29 july 2024 - 11:30am</div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend ">
                  29 july 2024 - 11:30am
                  </div>
                </td>
                <td>
                  <div className="mx-4 my-3">
                    <BsThreeDotsVertical />
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend ">Ward 2</div>
                </td>
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend ">Zone 1</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2 font-lexend ">Admin</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2  font-lexend ">29 july 2024 - 11:30am</div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend ">
                  29 july 2024 - 11:30am
                  </div>
                </td>
                <td>
                  <div className="mx-4 my-3">
                    <BsThreeDotsVertical />
                  </div>
                </td>
              </tr>
              <tr className="border-b-2 border-gray-300">
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend ">Ward 1</div>
                </td>
                <td className="">
                  <div className="items-center mx-4 my-2 font-lexend ">Zone 2</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2 font-lexend ">Admin</div>
                </td>
                <td>
                  <div className="items-center mx-4  my-2  font-lexend ">29 july 2024 - 11:30am</div>
                </td>
                <td>
                  <div className="flex gap-2 items-center mx-4  my-2 font-lexend ">
                  29 july 2024 - 11:30am
                  </div>
                </td>
                <td>
                  <div className="mx-4 my-3">
                    <BsThreeDotsVertical />
                  </div>
                </td>
              </tr>
          </tbody>
        </table>
      </div>
    </div>
    {isModal && <AddWard toggleModal={toggleModal}/>}
    </Fragment>
  );
};

export default Ward;
