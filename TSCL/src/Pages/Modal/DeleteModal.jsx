import React from "react";
import { TiWarning } from "react-icons/ti";
import { PiWarningCircleLight } from "react-icons/pi";
import { IoMdClose } from "react-icons/io";

const DeleteModal = (props) => {
    
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="  overflow-hidden shadow-lg  bg-white flex  items-end justify-between relative font-lexend rounded-xl">
        <div className="w-[360px] min-h-[230px] ">
          <div className="flex justify-end items-center  text-black   pr-1 pt-1">
            <button onClick={props.toggleDeleteModal}>
              <IoMdClose className="text-2xl font-semibold m-2" />
            </button>
          </div>
          <div className="flex  justify-center -mt-2">
            <PiWarningCircleLight className=" text-5xl text-blue-500 mb-3 " />
          </div>
          <p className="text-center text-lg font-semibold py-2">
            Are you sure! you want to Delete?
          </p>
          <div className=" flex justify-end text-center py-3 mx-3 gap-3 ">
          <div
              className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
              onClick={props.toggleDeleteModal}
            >
              Cancel
            </div>
            <button
              className="text-white bg-primary font-lexend rounded-3xl px-5 py-1.5"
              onClick={props.delete}
            >
              Delete
            </button>
            &nbsp;&nbsp;&nbsp;&nbsp;
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
