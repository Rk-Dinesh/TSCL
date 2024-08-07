import React, { Fragment, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { RiArrowDropDownLine } from "react-icons/ri";
import { RiExpandUpDownLine } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import AddWard from "./AddWard";
import { API } from "../../../Host";
import axios from "axios";

const Ward = () => {
  const [isModal, setIsModal] = useState(false);
  const [ExistingZones, setExistingZones] = useState(null);

  useEffect(() => {
    fetchExistingZones();
  }, []);
  const toggleModal = () => {
    setIsModal(!isModal);
  };

  const toggleCloseModal = () => {
    setIsModal(!isModal);
  };

  const fetchExistingZones = async () => {
    try {
      const response = await axios.get(`${API}/zone/get`);
      const responseData = response.data.data;
      // console.log("fetch", responseData);

      setExistingZones(responseData);
    } catch (error) {
      console.error("Error fetching existing roles:", error);
    }
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
        <div className="flex justify-between items-center my-2 mx-8">
          <h1 className="text-2xl font-medium ">Locality</h1>

          <button
            className="flex flex-row-2 gap-2  font-lexend items-center border-2 bg-blue-500 text-white rounded-full py-2 px-3 justify-between"
            onClick={toggleModal}
          >
            <FaPlus /> Add New Ward
          </button>
        </div>

        <div className="bg-white mx-6 my-3 rounded-lg">
          <table>
            <th className="pt-4 px-4 font-medium font-lexend text-lg whitespace-nowrap">
              Ward Catogories
            </th>
          </table>
          <table className="w-full  ">
            <thead className=" border-b-2 border-gray-300">
              <tr className="border-b-2 border-gray-300">
                <th className="">
                  <p className="flex gap-2 items-center justify-center mx-4 my-2 font-lexend font-semibold">
                    Ward <RiExpandUpDownLine />
                  </p>
                </th>
                <th className="">
                  <p className="flex gap-2 items-center justify-center mx-4 my-2 font-lexend font-semibold">
                    Zone <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center justify-center mx-4  my-2 font-lexend font-semibold">
                    CreatedBy <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center justify-center mx-4  my-2 font-lexend font-semibold">
                    CreatedAt
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="flex gap-2 items-center justify-center mx-4  my-2 font-lexend font-semibold">
                    UpdatedAt
                    <RiExpandUpDownLine />
                  </p>
                </th>
                <th>
                  <p className="text-center mx-4 my-3 font-semibold font-lexend">
                    Action
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b-2 border-gray-300">
                <td className="">
                  <p className="text-center mx-4 my-2 font-lexend ">Ward 1</p>
                </td>
                <td className="">
                  <p className="text-center mx-4 my-2 font-lexend ">Zone 1</p>
                </td>
                <td>
                  <p className="text-center mx-4  my-2 font-lexend ">Admin</p>
                </td>
                <td>
                  <p className="text-center mx-4  my-2  font-lexend whitespace-nowrap">
                    29 july 2024 - 11:30am
                  </p>
                </td>
                <td>
                  <p className=" text-center mx-4  my-2 font-lexend whitespace-nowrap">
                    29 july 2024 - 11:30am
                  </p>
                </td>
                <td>
                  <p className=" flex justify-center mx-4 my-3">
                    <BsThreeDotsVertical />
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {isModal && (
        <AddWard
          toggleModal={toggleModal}
          toggleCloseModal={toggleCloseModal}
          ExistingZones={ExistingZones}
        />
      )}
    </Fragment>
  );
};

export default Ward;
