import React, { Fragment, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import AddRole from "./AddRole";

const Settings = () => {
  const [isModal, setIsModal] = useState(false);
  const toggleModal = () => {
    setIsModal(!isModal);
  };
  return (
    <Fragment>
      <div className="  bg-blue-100 h-screen">
        <div className="mt-8">
          <div className="flex justify-between items-center my-2 mx-8">
            <h1 className="text-2xl font-medium ml-8"> Roles</h1>
            <a href="#">
              <button className="flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full p-2.5 w-fit justify-between mb-2" onClick={toggleModal}>
                <FaPlus /> Add New Role
              </button>
            </a>
          </div>

          <div className="bg-white mx-10 rounded-lg my-2 overflow-x-auto">
            <table className="w-full  ">
              <thead className=" border-b-2 border-gray-300">
                <th className="py-3 font-normal text-xl font-lexend ">
                  Roles Category
                </th>
                <tr className="border-b-2 border-gray-300">
                  <th className="">
                    <div className="flex gap-2 items-center mx-4 my-2 font-lexend justify-center font-semibold ">
                      S.no <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                      Role Name <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                      Status <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                      CreatedBy <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                      CreatedAt <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center font-semibold">
                      UpdatedAt <RiExpandUpDownLine />
                    </div>
                  </th>
                  <th>
                    <div className="mx-4 my-3 font-semibold font-lexend">
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                
                <tr className="border-b-2 border-gray-300">
                  <td className="">
                    <div className="items-center mx-4 my-2 font-lexend text-center">
                      1
                    </div>
                  </td>
                  <td>
                    <div className="items-center mx-4  my-2 font-lexend text-center">
                      Admin
                    </div>
                  </td>
                  <td>
                    <div className="items-center mx-4  my-2  font-lexend text-center">
                      Active
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center">
                      Admin
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center">
                      29 july 2024 - 11:30am
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center">
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
                    <div className="items-center mx-4 my-2 font-lexend text-center">
                      2
                    </div>
                  </td>
                  <td>
                    <div className="items-center mx-4  my-2 font-lexend text-center">
                      SuperAdmin
                    </div>
                  </td>
                  <td>
                    <div className="items-center mx-4  my-2  font-lexend text-center">
                      InActive
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center">
                      Admin
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center">
                      29 july 2024 - 11:30am
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2 items-center mx-4  my-2 font-lexend justify-center">
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
      </div>
      {isModal && <AddRole toggleModal={toggleModal} />}
    </Fragment>
  );
};

export default Settings;
