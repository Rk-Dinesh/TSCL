import React from "react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineDifference } from "react-icons/md";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { TbCheckupList } from "react-icons/tb";
import { HiClipboardList } from "react-icons/hi";
import { GoIssueReopened } from "react-icons/go";
import { MdOutlineDomain } from "react-icons/md";
import { RiExpandUpDownLine } from "react-icons/ri";
import { AiFillAlert } from "react-icons/ai";
import axios from "axios";
import { API, formatDate1 } from "../../../Host";
import decryptData from "../../../Decrypt";
import { useNavigate } from "react-router-dom";

const GrivevanceAnalyticDashboard1 = () => {
  const [report, setReport] = useState([]);
  const [department, setDepartment] = useState([]);
  const token = sessionStorage.getItem("token");
  const [filterDept, setFilterDept] = useState([]);
  const [count, setCount] = useState({});
  const [prioritycounts, setPrioritycounts] = useState([]);
  const [zoneData, setZoneData] = useState([]);
  const [complaintData, setComplaintData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrievances();
    fetchDepartment();
    fetchGrievanceCounts();
    fetchPriority();
    fetchzones();
    fetchcomplaint();
  }, []);

  const handleNavigate = () => {
    navigate('/requestview4')
  }

  const handleNavigateEx = () => {
    navigate('/escalation')
  }

  const fetchGrievances = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setReport(responseData);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchDepartment = async () => {
    try {
      const response = await axios.get(`${API}/department/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setDepartment(responseData);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };
  const fetchGrievanceCounts = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/grievancecounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseData = response.data;

      const mappedCount = Object.keys(responseData).reduce((acc, key) => {
        acc[key] = responseData[key][0][Object.keys(responseData[key][0])[0]];
        return acc;
      }, {});

      setCount(mappedCount);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };
  const fetchPriority = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/prioritycounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPrioritycounts(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchzones = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/locationZone`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setZoneData(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchcomplaint = async () => {
    try {
      const response = await axios.get(`${API}/new-grievance/complaintcount`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaintData(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const filteredDataDept = department.reduce((acc, dept) => {
    const reports = report.filter((r) => r.dept_name === dept.dept_name);
    acc.push({ name: dept.dept_name, value: reports.length });
    return acc;
  }, []);

  useEffect(() => {
    setFilterDept(filteredDataDept);
  }, [department, report, status]);

  const COLORS_1 = [
    "#5D72B8",
    "#9BE6C1",
    "#5991D3",
    "#D8B449",
    "#b91c1c",
    "#5b21b6",
    "#4d7c0f",
    "#500724",
    "#a21caf",
    "#0f172a",
  ];

  const COLORS_2 = ["#65a30d", "#0ea5e9", "#b91c1c"];

  return (
    <div className="  font-lexend mx-2 my-3 h-screen  ">
      <div>
        {count && (
          <div className="grid grid-cols-12 gap-3  my-3 ">
            <div className="md:col-span-4 sm:col-span-6 pl-3 col-span-12 border-2  bg-white p-4 rounded-lg shadow-md" onClick={handleNavigate}>
              <p className="text-lg text-gray-700 font-medium">
                Grievances Received
              </p>
              <div className="flex mt-1 justify-between items-end">
                <p className="text-3xl px-3 text-gray-700 font-medium">
                  {count.totalGrievances ? count.totalGrievances : 0}
                </p>
                <HiClipboardList className="text-4xl text-sky-600" />
              </div>
            </div>
            <div className="md:col-span-4 sm:col-span-6 col-span-12 border-2  bg-white p-4 rounded-lg shadow-md" onClick={handleNavigate}>
              {" "}
              <p className="text-lg text-gray-700   font-medium">
                Grievances Resolved
              </p>
              <div className="flex mt-1 justify-between items-end">
                <p className="text-3xl px-3 text-gray-700 font-medium">
                  {count.resolvedGrievances ? count.resolvedGrievances : 0}
                </p>
                <TbCheckupList className="text-4xl text-green-600" />
              </div>
            </div>
            <div className="md:col-span-4 sm:col-span-12 col-span-12 border-2  bg-white p-4 rounded-lg shadow-md" onClick={handleNavigate}>
              {" "}
              <p className="text-lg text-gray-700  font-medium">
                Pending Grievances
              </p>
              <div className="flex mt-1 justify-between items-end">
                <p className="text-3xl px-3 text-gray-700 font-medium">
                  {count.pendingGrievances ? count.pendingGrievances : 0}
                </p>
                <MdPendingActions className="text-4xl text-red-800" />
              </div>
            </div>
            <div className="md:col-span-4 sm:col-span-12 col-span-12 border-2  bg-white p-4 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 font-medium">
                Re-opened Grievances
              </p>
              <div className="flex mt-1 justify-between items-end">
                <p className="text-3xl px-3 text-gray-700  font-medium">1</p>
                <GoIssueReopened className="text-4xl text-yellow-600" />
              </div>
            </div>
            <div className="md:col-span-4 sm:col-span-12 col-span-12 border-2 bg-white p-4 rounded-lg shadow-md" onClick={handleNavigateEx}>
              <p className="text-lg text-gray-700  font-medium">
                Escalated Grievances
              </p>
              <div className="flex mt-1 justify-between items-end">
                <p className="text-3xl px-3 text-gray-700 font-medium">
                  {count.escalatedGrievances ? count.escalatedGrievances : 0}
                </p>
                <AiFillAlert className="text-3xl text-red-700" />
              </div>
            </div>
            <div className="md:col-span-4 sm:col-span-12 col-span-12 border-2 m bg-white p-4 rounded-lg shadow-md" onClick={handleNavigate}>
              <p className="text-lg text-gray-700  font-medium">
                Grievances by Severity
              </p>
              <div className="flex mt-1 justify-between items-end">
                <p className="text-3xl px-3 font-medium">
                  {count.highPriorityGrievances
                    ? count.highPriorityGrievances
                    : 0}
                </p>
                <MdOutlinePriorityHigh className="text-4xl text-gray-800" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-3  ">
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg shadow-md">
          <p className="text-lg font-medium">Request based on Department</p>
          <div className="flex flex-col md:flex-row items-center py-4 gap-2">
            <PieChart
              width={250}
              height={225}
              className="flex md:flex-col items-center flex-row outline-none "
            >
              <Pie
                data={filterDept}
                dataKey="value"
                cx={120}
                cy={120}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                fill="#8884d8"
                label
              >
                {filterDept.map((entry, index) => (
                  <Cell
                    className="flex flex-col md:flex-row outline-none"
                    key={`cell-${index}`}
                    fill={COLORS_1[index % COLORS_1.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="flex md:flex-col flex-row md:gap-0 gap-4 mr-1 flex-wrap justify-center">
              {filterDept.map((entry, index) => (
                <div
                  key={entry.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: COLORS_1[index % COLORS_1.length],
                    }}
                  />
                  <span style={{ marginLeft: 10 }}>{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg shadow-md">
          <p className="text-lg font-medium">Grievance by Priority</p>
          <div className="flex flex-col md:flex-row items-center justify-center py-4 gap-2">
            <PieChart
              width={250}
              height={225}
              className="flex md:flex-col items-center flex-row outline-none "
            >
              <Pie
                data={prioritycounts.map((entry) => ({
                  name: entry.priority,
                  value: entry.count,
                }))}
                dataKey="value"
                cx={120}
                cy={120}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                fill="#8884d8"
                label
              >
                {prioritycounts.map((entry, index) => (
                  <Cell
                    className="flex flex-col md:flex-row outline-none"
                    key={`cell-${index}`}
                    fill={COLORS_2[index % COLORS_2.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
            <div className="flex md:flex-col flex-row md:gap-0 gap-4 mr-1 flex-wrap justify-center">
              {prioritycounts.map((entry, index) => (
                <div
                  key={entry.priority}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: COLORS_2[index % COLORS_2.length],
                    }}
                  />
                  <span style={{ marginLeft: 10 }}>{entry.priority}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3  mt-2 mb-3">
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md">
            <p className="text-gray-800 text-lg font-medium mb-1 mx-3">Grievances based on Location</p>
          <table className="w-full mt-1 my-2 ">
            <thead className=" border-b border-gray-300 py-2  ">
              <tr >
                <th className="text-start text-gray-800 pl-5 py-2">
                  <p>zone</p>
                </th>
                <th className="text-center text-gray-800 py-2">
                  <p>Grievances</p>
                </th>
              </tr>
            </thead>
            <tbody>
            {zoneData.map((zone, index) => (
            <tr className=" border-b border-gray-300 py-2  " key={index}>
              <td className="text-start text-gray-800 pl-5 py-2">{zone.zone}</td>
              <td className="text-center text-gray-800 py-2">{zone.count}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md">
        <p className="text-gray-800 text-lg font-medium mb-1 mx-3">Grievances based on Complaint</p>
          <table className="w-full mt-1 my-2 mx-3 ">
            <thead className=" border-b border-gray-300 py-2  ">
              <tr >
                <th className="text-start text-gray-800 pl-3 py-2">
                  <p>complaint</p>
                </th>
                <th className="text-center text-gray-800 py-2">
                  <p>Grievances</p>
                </th>
              </tr>
            </thead>
            <tbody>
            {complaintData.map((compt, index) => (
            <tr className=" border-b border-gray-300  py-2 " key={index}>
              <td className="text-start text-gray-800 pl-3 py-2">{compt.complaint}</td>
              <td className="text-center text-gray-800 py-2">{compt.count}</td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
      </div>


      

     
    </div>
  );
};

export default GrivevanceAnalyticDashboard1;
