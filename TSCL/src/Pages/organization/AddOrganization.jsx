import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";

const AddOrganization = (props) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white w-[522px] h-[358px]  font-lexend">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Organization</h1>
        </div>
        <div className=" font-normal mx-10 py-5">
          <p>Organization Name</p>
        </div>
        <div className="mx-10">
          
          <p className="flex items-center gap-3 border w-5/7 my-2 py-1.5  rounded-lg">
            <input
              type="search"
              className=" w-full pl-1.5 px-6 outline-none bg-transparent"
              placeholder="Type Organization name"
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
          <button className=" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5 ">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddOrganization;
