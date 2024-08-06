import React from "react";

const ViewRequest = () => {
  return (
    <div className=" h-screen">
      <div className="mx-6 my-5 font-lexend overflow-y-auto">
        <p>Reply Complaint R-00122343</p>
        <div className="bg-white mt-2 pb-3">
          <p className="px-3 py-3 text-lg">Request By :</p>
          <div className="grid grid-cols-12 gap-3 mx-3 my-3">
            <div className=" col-span-3 pl-3">
              <p>Alwin G</p>
              <p>+91 00000 000000</p>
            </div>
            <div className="col-span-4">
              <div className="flex gap-3 mb-3 items-center">
                <p>Status: </p>
                <span className="text-sm border-2 border-black px-4 py-0.5 rounded-full  ">
                  New
                </span>
              </div>
              <div className="flex gap-3 items-center ">
                <p>Priority: </p>
                <span className="text-sm text-white bg-orange-400 px-4 py-1 rounded-full ">
                  High
                </span>
              </div>
            </div>
            <div className="col-span-3">
              <select className="col-span-2 block px-4 py-3 text-sm text-black border rounded-lg border-none outline-none">
                <option hidden>Assign Emp</option>
                <option value="Ravi">Ravi</option>
                <option value="Kumar">Kumar</option>
              </select>
            </div>
            <div className="col-span-2">
              <button className="bg-primary px-4 py-1.5 text-white rounded-full">
                Submit
              </button>
            </div>
          </div>
          <hr />
          <div className="grid grid-cols-12 gap-2 mx-3 my-4 ">
            <div className="col-span-6 border px-2 py-3 rounded">
              <p className="pt-2 text-lg">Grievance Details</p>
              <hr className="my-3" />
              <div className=" flex flex-col gap-3 mx-2 text-base">
                <div className="grid grid-cols-3">
                  <p className="col-span-1">Origin :</p>
                  <p>Call</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-1">Complaint Type :</p>
                  <p>Water</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-1">Department :</p>
                  <p>PWD</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-1">Zone :</p>
                  <p>Zone 1</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-1">Ward :</p>
                  <p>Ward 1</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-1">Street :</p>
                  <p>Street 1</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-1">Pincode :</p>
                  <p>600130</p>
                </div>
                <div className="grid grid-cols-3">
                  <p className="col-span-1">Description :</p>
                  <p>Water Complaint</p>
                </div>
              </div>
            </div>
            <div className="col-span-6 border px-2 py-3 rounded">
              <p className="pt-2 text-lg">Similar Request</p>
              <hr className="my-3" />
              <table className="w-full bg-gray-200 rounded ">
                <thead className="" >
                  <tr className=" ">
                    <th className="items-center py-2   font-lexend whitespace-nowrap">
                      Date/Time
                    </th>
                    <th className="items-center py-2  font-lexend whitespace-nowrap">
                      Complaint No
                    </th>
                    <th className="items-center  py-2  font-lexend whitespace-nowrap">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  <tr className="">
                    <td className="text-center py-2">15-05-2024 / 12:00 AM </td>
                    <td className="text-center py-2">R-0001122</td>
                    <td className="text-center py-2 text-green-600">In Progress</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mx-3 my-3">
            <p className="mb-2 mx-1 text-lg">Complaint History</p>
            <div className="bg-gray-100 py-3">
              <div className="mx-8">
                <p className="py-3 font-semibold ">Complaint No 024324322</p>
                <p className="py-2">Saturday 10 August</p>
                <div className="grid grid-cols-3 divide-x-2 divide-black">
                  <p>6.00 PM</p>
                  <p className="pl-5">Logged In</p>
                </div>
                <br />
                <div className="grid grid-cols-3 divide-x-2 divide-black">
                  <p>6.10 PM</p>
                  <p className="pl-5">Ticket Raised R-001222</p>
                </div>
                <br />
                <div className="grid grid-cols-3 divide-x-2 divide-black">
                  <p>6.13 PM</p>
                  <p className="pl-5">Assigned To Particular Department</p>
                </div>
                <br />
                <p className="mb-2">Saturday,10 July</p>
                <div className="grid grid-cols-3 divide-x-2 divide-black">
                  <p>6.15 PM</p>

                  <div className="col-span-2">
                  <p className="pl-5">Status:</p>
                  <p className="pl-5 text-gray-500 ">open / Inprogress / Assigned to JE / Closed</p>
                  </div>
                </div>
                <hr className="my-3" />
                <div className="grid grid-cols-3 border-2 mx-20 ">
                  <p className="text-center py-1.5">Status</p>
                  <p className="text-center bg-gray-800 col-span-2 text-white py-1.5">
                    Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRequest;
