import React from "react";
import { useState, useEffect } from "react";
import { AiFillAlert } from "react-icons/ai";
import { TbCheckupList } from "react-icons/tb";
import { HiClipboardList } from "react-icons/hi";
import axios from "axios";
import { API } from "../../../Host";
import { useNavigate } from "react-router-dom";
import API_ENDPOINTS from "../../../ApiEndpoints/api/ApiClient";
import decryptData from "../../../Decrypt";

const EngineerMetrics = () => {
  const token = localStorage.getItem("token");
  const [count, setCount] = useState({});
  const [workLoadData, setWorkLoadData] = useState([]);
  const [percentData, setPercentData] = useState([]);
  const [avgrsolution, setAvgrsolution] = useState([]);
  const [escalate, setEscalate] = useState([]);
  const [analysis, setAnalysis] = useState([]);
  const [Departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrievanceCounts();
    fetchEngineerWorkLoad();
    fetchpercentage();
    fetchAvergResolution();
    fetchEscalation();
    fetchComparitiveAnalysis();
    fetchDepartments();
  }, []);

  const handleNavigate = () => {
    navigate("/dashboardview");
  };

  const fetchGrievanceCounts = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/grievancecounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data;

      setCount(responseData);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchEngineerWorkLoad = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/engineerload`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWorkLoadData(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchpercentage = async () => {
    try {
      const response = await axios.get(
        `${API}/new-grievance/beforeescalation`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPercentData(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchEscalation = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/afterescalation`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEscalate(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchAvergResolution = async () => {
    try {
      const response = await axios.get(
        `${API}/new-grievance/averageresolution`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAvgrsolution(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchComparitiveAnalysis = async () => {
    try {
      const response = await axios.get(
        `${API}/new-grievance/compartiveanalysis`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAnalysis(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.GET_DEPARTMENT.url, {
        headers: API_ENDPOINTS.GET_DEPARTMENT.headers,
      });
      const responseData = decryptData(response.data.data);
      setDepartments(responseData);
    } catch (error) {
      console.error("Error fetching existing Departments:", error);
    }
  };

  const handleDept = async (depts) => {
    setSelectedDepartment(depts);
  };

  const filters = avgrsolution.filter((report) => {
    return selectedDepartment === "All"
      ? report
      : report.department === selectedDepartment;
  });

  return (
    <div className="  font-lexend mx-2 my-5 h-screen  ">
      <div>
        {count && (
          <div className="grid grid-cols-12 gap-3 my-3">
            {[
              {
                label: "Grievances Received",
                value: count.totalGrievances?.[0]?.total ?? 0,
                icon: HiClipboardList,
                color: "sky-600",
                navigate: () => {
                  navigate("/dashboardview", {
                    state: { endpoint: "get" },
                  });
                },
              },
              {
                label: "Grievances Resolved",
                value: count.resolvedGrievances?.[0]?.resolved ?? 0,
                icon: TbCheckupList,
                color: "green-600",
                navigate: () => {
                  navigate("/dashboardview", {
                    state: { endpoint: "byclosed" },
                  });
                },
              },
              {
                label: "Escalated Grievances",
                value: count.escalatedGrievances?.[0]?.escalated ?? 0,
                icon: AiFillAlert,
                color: "red-700",
                navigate: () => {
                  navigate("/escalation");
                },
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`md:col-span-4 sm:col-span-6 col-span-12 border-2 bg-white p-4 rounded-lg shadow-md ${
                  item.onClick ? "cursor-pointer" : ""
                }`}
                onClick={item.onClick ?? item.navigate}
              >
                <p className="text-lg text-gray-700 font-medium">
                  {item.label}
                </p>
                <div className="flex mt-1 justify-between items-end">
                  <p className="text-3xl px-3 text-gray-700 font-medium">
                    {item.value}
                  </p>
                  <item.icon className={`text-4xl text-${item.color}`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-3  mt-3 mb-2">
        <div className="md:col-span-6 col-span-12 p-3 border-2 bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
          <div className="flex justify-between mb-1">
            <p className="text-[#023047] text-lg font-medium">
              Resolution Rate:
            </p>
          </div>
          <p className="mx-1 text-sm mb-2 whitespace-nowrap text-gray-600">
            Percentage of grievances resolved within a specified period <br />{" "}
            compared to those received.
          </p>
          <div className="grid grid-cols-3 gap-2 mt-3">
            <div className="bg-[#219ebc] p-4 rounded-lg shadow-md">
              <p className="text-white text-sm">Grievances Received</p>
              <p className="text-2xl text-white  font-bold">
                {percentData.totalGrievancesReceived
                  ? percentData.totalGrievancesReceived
                  : 0}
              </p>
            </div>
            <div className="bg-[#3d5b81] p-4 rounded-lg shadow-md">
              <p className="text-white text-sm">Resolved Grievances</p>
              <p className="text-2xl text-white font-bold">
                {percentData.generalResolved ? percentData.generalResolved : 0}
              </p>
            </div>
            <div className="bg-[#023047] p-3.5 rounded-lg shadow-md">
              <p className="text-white text-sm">General Percentage</p>
              <p className="text-2xl text-white font-bold mt-1">
                {percentData.generalPercentage
                  ? percentData.generalPercentage
                  : 0}
                %
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="bg-[#3d5b81] p-3.5 rounded-lg shadow-md">
              <p className="text-white text-sm">Resolved Before Escalation</p>
              <p className="text-2xl text-white font-bold">
                {percentData.totalGrievancesResolvedWithinPeriod
                  ? percentData.totalGrievancesResolvedWithinPeriod
                  : 0}
              </p>
            </div>
            <div className="bg-[#023047] p-3.5 rounded-lg shadow-md">
              <p className="text-white text-sm">
                Percentage Resolved Before Escalation
              </p>
              <p className="text-2xl text-white font-bold mt-1">
                {percentData.totalPercentageResolved
                  ? percentData.totalPercentageResolved
                  : 0}
                %
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-6 col-span-12 p-3 border-2 bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
          <div className="flex justify-between mb-1">
            <p className="text-[#023047] text-lg font-medium">
              Escalation Rate:
            </p>
          </div>
          <p className="mx-1 text-sm mb-4 whitespace-nowrap text-gray-600">
            Percentage of grievances escalated to different levels.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#219ebc] p-4 rounded-lg shadow-md">
              <p className="text-white text-sm">Total Grievances</p>
              <p className="text-2xl text-white font-bold">
                {escalate.totalGrievances ? escalate.totalGrievances : 0}
              </p>
            </div>
            <div className="bg-[#023047] p-4 rounded-lg shadow-md">
              <p className="text-white text-sm">Percentage Escalated</p>
              <p className="text-2xl text-white font-bold">
                {escalate.percentageEscalated
                  ? escalate.percentageEscalated
                  : 0}
                %
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-[#f6ee21] p-4 rounded-lg shadow-md">
              <p className="text-black text-sm">Escalated L1</p>
              <p className="text-2xl  text-black font-bold">
                {escalate.escalatedL1 ? escalate.escalatedL1 : 0}
              </p>
            </div>
            <div className="bg-[#f69220] p-4 rounded-lg shadow-md">
              <p className="text-black text-sm">Escalated L2</p>
              <p className="text-2xl text-black font-bold">
                {escalate.escalatedL2 ? escalate.escalatedL2 : 0}
              </p>
            </div>
            <div className="bg-[#da1b20] p-4 rounded-lg shadow-md">
              <p className="text-white text-sm">Escalated L3</p>
              <p className="text-2xl text-white font-bold">
                {escalate.escalatedL3 ? escalate.escalatedL3 : 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3  mt-3 mb-3">
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
          <p className="text-[#023047] text-lg font-medium mb-1 mx-3">
            Engineer Work Load :
          </p>
          <p className="mx-3 text-sm mb-2 text-gray-600">
            Average resolution time by Engineers by department.
          </p>
          <table className="w-full mt-1 my-2 ">
            <thead className=" border-b border-gray-300  py-2  ">
              <tr>
                <th className="text-start text-slate-700 font-semibold pl-5 py-2">
                  <p>Enigneer Name</p>
                </th>
                <th className="text-start text-slate-700 font-semibold pl-5 py-2">
                  <p> Solved</p>
                </th>
                <th className="text-center text-slate-700 font-semibold py-2">
                  <p>Grievances</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {workLoadData &&
                workLoadData.map((work, index) => (
                  <tr className=" border-b border-gray-300  py-2 " key={index}>
                    <td className="text-start text-gray-600 pl-5 py-2">
                      {work.engineer}
                    </td>
                    <td className="text-start text-gray-600 pl-5 py-2">
                      {work.closedCount}
                    </td>
                    <td className="text-center text-gray-600 py-2">
                      {work.count}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="md:col-span-6 col-span-12   ">
          <p className="text-[#023047] text-lg font-medium my-1  whitespace-nowrap bg-white rounded-lg py-1 px-3">
            Comparative Analysis :{" "}
          </p>
          <div className="md:col-span-6 col-span-12 mt-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-1">Current Month</p>
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium text-slate-700">
                  Grievances:{" "}
                  {analysis.currentMonthGrievances
                    ? analysis.currentMonthGrievances
                    : 0}
                </p>
                <p className="text-lg font-medium text-slate-700">
                  Resolved:{" "}
                  {analysis.currentMonthResolvedGrievances
                    ? analysis.currentMonthResolvedGrievances
                    : 0}
                </p>
                <p className="text-lg font-medium text-slate-700">
                  Escalated:{" "}
                  {analysis.currentMonthEscalatedGrievances
                    ? analysis.currentMonthEscalatedGrievances
                    : 0}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium text-green-600">
                  Resolved :{" "}
                  {analysis.currentMonthPercentageResolved
                    ? analysis.currentMonthPercentageResolved
                    : 0}
                  %
                </p>
                <p className="text-lg font-medium text-red-600">
                  Escalated :{" "}
                  {analysis.currentMonthPercentageEscalated
                    ? analysis.currentMonthPercentageEscalated
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
          <div className="md:col-span-6 col-span-12 mt-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <p className="text-gray-600 text-sm mb-1">Previous Month</p>
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium text-slate-700">
                  Grievances:{" "}
                  {analysis.previousMonthGrievances
                    ? analysis.previousMonthGrievances
                    : 0}
                </p>
                <p className="text-lg font-medium text-slate-700">
                  Resolved:{" "}
                  {analysis.previousMonthResolvedGrievances
                    ? analysis.previousMonthResolvedGrievances
                    : 0}
                </p>
                <p className="text-lg font-medium text-slate-700">
                  Escalated:{" "}
                  {analysis.previousMonthEscalatedGrievances
                    ? analysis.previousMonthEscalatedGrievances
                    : 0}
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-lg font-medium text-green-600">
                  Resolved :{" "}
                  {analysis.previousMonthPercentageResolved
                    ? analysis.previousMonthPercentageResolved
                    : 0}
                  %
                </p>
                <p className="text-lg font-medium text-red-600">
                  Escalated :{" "}
                  {analysis.previousMonthPercentageEscalated
                    ? analysis.previousMonthPercentageEscalated
                    : 0}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" mt-2 md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
        <div className=" flex justify-between flex-wrap">
          <p className="text-[#023047] text-lg font-medium mb-1 mx-3 whitespace-nowrap">
            Performance of Resolution Teams :
          </p>
          <select
            className="text-sm text-gray-800  border border-gray-900 rounded-lg border-none outline-none mr-4"
            onChange={(e) => handleDept(e.target.value)}
            value={selectedDepartment || ""}
          >
            <option hidden>Select Department</option>
            <option value="All">All</option>
            {Departments &&
              Departments.map((dept,index) => (
                <option key={index} value={dept.dept_name}>
                  {dept.dept_name}
                </option>
              ))}
          </select>
        </div>
        <p className="mx-3 text-sm mb-2 whitespace-nowrap text-gray-600">
          Average resolution time by Engineers by department.
        </p>
        <table className="w-full mt-1 my-2 mx-3 ">
          <thead className=" border-b border-gray-300   ">
            <tr>
              <th className="text-start text-slate-700 font-semibold pl-5 py-2 whitespace-nowrap">
                <p>Engineer</p>
              </th>
              <th className="text-center text-slate-700 font-semibold py-2 whitespace-nowrap">
                <p>Department</p>
              </th>
              <th className="text-center text-slate-700 font-semibold pl-3 py-2 whitespace-nowrap">
                <p>Average Resolution Time</p>
              </th>
            </tr>
          </thead>
          <tbody className="">
            {filters &&
              filters.map((item, index) => (
                <tr className=" border-b border-gray-300   " key={index}>
                  <td className="text-start text-gray-600 pl-5 py-2 whitespace-nowrap">
                    {item.engineer || "-"}
                  </td>
                  <td className="text-center text-gray-600 pl-3 py-2 whitespace-nowrap">
                    {item.department}
                  </td>

                  <td className="text-center text-gray-600 pl-3 py-2 whitespace-nowrap">
                    {item.averageResolutionTime.toFixed(0)} days
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EngineerMetrics;
