import React from "react";
import logo from "../../assets/images/logo1.png"

const DepartmentWise = () => {
  return (
    <div className="mx-3 my-3">
      <div className="bg-white rounded-lg font-lexend py-4 px-8">
        <h3 className="text-primary font-semibold text-lg my-2">
          Department Wise Report
        </h3>
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-4 ">
            <label htmlFor="" className="block my-2 text-slate-700">
              Select Date Range
            </label>
            <input
              type="date"
              name=""
              id=""
              className="outline-none border-2 border-gray-300 rounded-md py-3 px-5 w-full text-gray-500"
            />
          </div>
          <div className="col-span-4 ">
            <label htmlFor="" className="block my-2 text-slate-700 ">
              Select Date Range
            </label>
            <input
              type="date"
              name=""
              id=""
              className="outline-none border-2 border-gray-300 rounded-md py-3 px-5 w-full text-gray-500"
            />
          </div>
          <div className="col-span-4 ">
            <label htmlFor="" className="block my-2 text-slate-700">
              Select Department
            </label>
            <select
              name=""
              id=""
              className="outline-none border-2 border-gray-300 rounded-md py-3 px-4 w-full text-gray-500"
            >
              <option value="">Hi</option>
              <option value="heloo">Hello</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 my-3">
          <select
            name=""
            id=""
            className="outline-none border-2 text-primary border-gray-300 rounded-md py-2 px-3 w-36 "
          >
            <option value="">Export</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
          <button className="w-36 py-2 text-white outline-none bg-primary rounded-md">
            Continue
          </button>
        </div>
      </div>
      <div class="max-w-4xl mx-auto my-6  bg-white shadow-lg rounded-lg font-lexend">
        <div class="bg-blue-800 text-white p-4 rounded-t-lg">
          <div class="flex items-start justify-between mt-3 mx-6">
            <img src={logo} alt="Image" className="w-20 h-20 -mt-3"/>
            <div>
              <h1 class="text-lg font-semibold text-center">Madurai Municipal Corporation</h1>
              <p class="text-sm text-center mt-2 text-gray-300">Department Wise report</p>
              <p class="text-sm text-center mt-2 text-gray-300">01.01.2025 - 10.01.2025</p>
            </div>
            <div>
              <p class="text-sm">
                Date: <span class="font-medium">10.01.2025</span>
              </p>
            </div>
          </div>
        </div>
        <table class="w-full border-collapse border border-gray-300 text-sm mt-4 ">
          <thead>
            <tr class="bg-gray-100 text-gray-700">
              <th class="border border-gray-300 px-4 py-3 text-left"rowSpan={2}>S.no</th>
              <th class="border border-gray-300 px-4 py-3 text-left" rowSpan={2}>
                Department
              </th>
              <th
                class="border border-gray-300 px-4 py-3 text-center"
                colspan="4"
              >
                Total
              </th>
              <th
                class="border border-gray-300 px-4 py-3 text-center"
                colspan="3"
              >
                Repeated
              </th>
            </tr>
            <tr class="bg-gray-100 text-gray-500">
              
              <th class="border border-gray-300 px-4 py-3 text-center">
                Received
              </th>
              <th class="border border-gray-300 px-4 py-3 text-center">
                Resolved
              </th>
              <th class="border border-gray-300 px-4 py-3 text-center">
                Escalated
              </th>
              <th class="border border-gray-300 px-4 py-3 text-center">
                Pending
              </th>
              <th class="border border-gray-300 px-4 py-3 text-center">
                Received
              </th>
              <th class="border border-gray-300 px-4 py-3 text-center">
                Resolved
              </th>
              <th class="border border-gray-300 px-4 py-3 text-center">
                Escalated
              </th>
            </tr>
          </thead>
          <tbody>
            <tr class="text-gray-500">
              <td class="border border-gray-300 px-4 py-3 text-center">1</td>
              <td class="border border-gray-300 px-4 py-3">Revenue</td>
              <td class="border border-gray-300 px-4 py-3 text-center">12</td>
              <td class="border border-gray-300 px-4 py-3 text-center">1</td>
              <td class="border border-gray-300 px-4 py-3 text-center">9</td>
              <td class="border border-gray-300 px-4 py-3 text-center">11</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
            </tr>
            <tr class="text-gray-500">
              <td class="border border-gray-300 px-4 py-3 text-center">2</td>
              <td class="border border-gray-300 px-4 py-3">Town Planning</td>
              <td class="border border-gray-300 px-4 py-3 text-center">12</td>
              <td class="border border-gray-300 px-4 py-3 text-center">1</td>
              <td class="border border-gray-300 px-4 py-3 text-center">9</td>
              <td class="border border-gray-300 px-4 py-3 text-center">11</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
            </tr>
            <tr class="text-gray-500">
              <td class="border border-gray-300 px-4 py-3 text-center">3</td>
              <td class="border border-gray-300 px-4 py-3">Engineering</td>
              <td class="border border-gray-300 px-4 py-3 text-center">12</td>
              <td class="border border-gray-300 px-4 py-3 text-center">1</td>
              <td class="border border-gray-300 px-4 py-3 text-center">9</td>
              <td class="border border-gray-300 px-4 py-3 text-center">11</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
              <td class="border border-gray-300 px-4 py-3 text-center">0</td>
            </tr>
           
          </tbody>
        </table>
        <div class="text-gray-600 text-xs my-3 text-center">
          <p>
            Report generated on 10.01.2025 &nbsp;&nbsp; | &nbsp;&nbsp; Powered
            by madurai municipal corporation
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentWise;
