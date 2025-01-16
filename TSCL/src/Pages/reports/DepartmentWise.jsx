import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo1.png";
import axios from "axios";
import { API } from "../../Host";

const DepartmentWise = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [department, setDepartment] = useState("");
  const [error, setError] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/new-grievance/departmentGrievanceCounts`
        );
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!startDate || !endDate || !department) {
      setError("All fields are required.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("End date cannot be before start date.");
      return;
    }

    if (new Date(endDate) > new Date()) {
      setError("End date cannot be in the future.");
      return;
    }

    setError("");
    const formData = {
      startDate,
      endDate,
      department,
    };

    try {
      const response = await axios.get(
        `${API}/new-grievance/departmentGrievanceCounts`,
        {
          params: formData,
        }
      );
      setReport(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("There was an error fetching the data.");
    }
  };

  return (
    <div className="mx-3 my-3">
      <div className="bg-white rounded-lg font-lexend py-3 px-8">
        <h3 className="text-primary font-semibold text-lg my-2">
          Department Wise Report
        </h3>
        <div className="grid grid-cols-12 gap-8 items-center">
          <div className="col-span-4">
            <label htmlFor="" className="block my-2 text-slate-700">
              Select Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              max={new Date().toISOString().split("T")[0]}
              className="outline-none border-2 border-gray-300 rounded-md py-2.5 px-5 w-full text-gray-500"
            />
          </div>
          <div className="col-span-4">
            <label htmlFor="" className="block my-2 text-slate-700">
              Select End Date
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              max={new Date().toISOString().split("T")[0]}
              className="outline-none border-2 border-gray-300 rounded-md py-2.5 px-5 w-full text-gray-500"
            />
          </div>
          <div className="col-span-4">
            <label htmlFor="" className="block my-2 text-slate-700">
              Select Department
            </label>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="outline-none border-2 border-gray-300 rounded-md py-2.5 px-4 w-full text-gray-500"
            >
              <option value="">Select a Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Public Health">Public Health</option>
            </select>
          </div>
        </div>
        {error && <p className="text-red-500 my-2">{error}</p>}
        <div className="flex justify-end gap-3 my-3">
          <select
            name=""
            id=""
            className="outline-none border-2 text-primary border-gray-300 rounded-md py-1.5 px-3 w-32 "
          >
            <option value="">Export</option>
            <option value="csv">CSV</option>
            <option value="pdf">PDF</option>
          </select>
          <button
            onClick={handleSubmit}
            className="w-32 py-1.5 text-white outline-none bg-primary rounded-md"
          >
            Continue
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto my-6 bg-white p-2 shadow-lg rounded-lg font-lexend">
        <div className="bg-blue-800 text-white p-4 -m-2 rounded-t-lg">
          <div className="flex items-start justify-between mt-3 mx-6">
            <img src={logo} alt="Image" className="w-20 h-20 -mt-3" />
            <div>
              <h1 className="text-lg font-semibold text-center">
                Madurai Municipal Corporation
              </h1>
              <p className="text-sm text-center mt-2 text-gray-300">
                Department Wise report
              </p>
              <p className="text-sm text-center mt-2 text-gray-300">
                {startDate} - {endDate}
              </p>
            </div>
            <div>
              <p className="text-sm">
                Date:{" "}
                <span className="font-medium">
                  {new Date().toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300 text-sm mt-4">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th
                className="border border-gray-300 px-4 py-3 text-left"
                rowSpan={2}
              >
                S.no
              </th>
              <th
                className="border border-gray-300 px-4 py-3 text-left"
                rowSpan={2}
              >
                Department
              </th>
              <th
                className="border border-gray-300 px-4 py-3 text-center"
                colSpan="4"
              >
                Total
              </th>
              <th
                className="border border-gray-300 px-4 py-3 text-center"
                colSpan="3"
              >
                Repeated
              </th>
            </tr>
            <tr className="bg-gray-100 text-gray-500">
              <th className="border border-gray-300 px-4 py-3 text-center">
                Received
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center">
                Resolved
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center">
                Escalated
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center">
                Pending
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center">
                Received
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center">
                Resolved
              </th>
              <th className="border border-gray-300 px-4 py-3 text-center">
                Escalated
              </th>
            </tr>
          </thead>
          <tbody>
            {report.map((data, index) => (
              <tr key={index} className="text-gray-500">
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-3">
                  {data.department}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {data.total.count}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {data.total.resolved}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {data.total.escalated}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {data.total.pending}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {data.repeated.count}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {data.repeated.resolved}
                </td>
                <td className="border border-gray-300 px-4 py-3 text-center">
                  {data.repeated.escalated}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-gray-600 text-xs my-3 text-center">
          <p>
            Report generated on {new Date().toLocaleDateString()} &nbsp;&nbsp; |
            &nbsp;&nbsp; Powered by Madurai Municipal Corporation
          </p>
        </div>
      </div>
    </div>
  );
};

export default DepartmentWise;
