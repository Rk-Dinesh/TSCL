import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const AddWard = (props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white w-[522px] h-[358px]  font-lexend">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Ward</h1>
        </div>
        <div className=" font-normal mx-10 py-5">
          <p>Select Zone</p>
        </div>
        <div className="mx-10">
        <select
                  className="block w-full px-1 py-3  text-sm text-black border border-gray-900 rounded-lg bg-gray-50  dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black hover:border-gray-900"
                  defaultValue="Select an Organization"
                >
                  <option  hidden>
                  Select an Zone
                  </option>

                  <option value="active">Zone 1</option>
                  <option value="inactive">Zone 2</option>
                </select>
          <p className="flex  gap-3 border w-5/7 my-2 py-1.5 rounded-lg">
            <input
              type="search"
              className=" w-full pl-1.5 outline-none bg-transparent"
              placeholder="Type Ward Name"
            />
          </p>
        </div>
        <div className="flex justify-end mt-16 mx-10 gap-5 ">
          <button
            className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
            onClick={props.toggleModal}
          >
            cancel
          </button>
          <button className=" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddWard;
