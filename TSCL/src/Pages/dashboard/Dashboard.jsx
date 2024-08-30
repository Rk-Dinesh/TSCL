import React, { useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { FaPlus } from "react-icons/fa6";
import { BsCalendar2Week } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { API } from "../../Host";
import axios from "axios";
import decryptData from "../../Decrypt";

const Dashboard = () => {
  const [report, setReport] = useState([]);
  const [department, setDepartment] = useState([]);
  const [status, setStatus] = useState([])
  const token = sessionStorage.getItem("token");
  const [filterDept, setFilterDept] = useState([]);
  const [filterStatus, setFilterStatus] = useState([])

  useEffect(() => {
    fetchGrievances();
    fetchDepartment();
    fetchActiveStatus();
  }, []);

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

  const fetchActiveStatus = async () => {
    try {
      const response = await axios.get(`${API}/status/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setStatus(responseData);
    } catch (err) {
      console.error("Error fetching existing ActiveStatus:", err);
    }
  };

  const filteredDataDept = department.reduce((acc, dept) => {
    const reports = report.filter((r) => r.dept_name === dept.dept_name);
    acc.push({ name: dept.dept_name, value: reports.length });
    return acc;
  }, []);

  const filteredStatusData = status.reduce((acc, stat) => {
    const reports = report.filter((r) => r.status === stat.status_name);
    acc.push({ name: stat.status_name, value: reports.length, color: stat.color });
    return acc;
  }, []);

  useEffect(() => {
    setFilterDept(filteredDataDept);
    setFilterStatus(filteredStatusData)
  }, [department, report,status]);


  const COLORS_1 = ["#5D72B8", "#9BE6C1", "#5991D3", "#D8B449","#b91c1c","#5b21b6","#4d7c0f","#500724","#a21caf","#0f172a"];


  return (
    <div className="overflow-y-auto no-scrollbar">
      <div className="  font-lexend h-screen mx-2 ">
        <div className="grid grid-cols-12 gap-4  my-4 ">
          <div className="md:col-span-4 sm:col-span-6 px-4 col-span-12 bg-white p-4 rounded-lg">
            <p className="text-lg font-medium text-gray-700">
              Request By Today
            </p>
            <div className="flex mt-3 justify-between items-end">
              <p className="text-3xl font-light ">10</p>
              <VscGitPullRequestNewChanges className="text-3xl text-gray-800" />
            </div>
          </div>
          <div className="md:col-span-4 sm:col-span-6 col-span-12 bg-white p-4 rounded-lg">
            {" "}
            <p className="text-lg font-medium text-gray-700">Request By Week</p>
            <div className="flex mt-3 justify-between items-end">
              <p className="text-3xl font-light">5</p>
              <BsCalendar2Week className="text-3xl text-gray-800" />
            </div>
          </div>
          <div className="md:col-span-4 sm:col-span-12 col-span-12 bg-white p-4 rounded-lg">
            {" "}
            <p className="text-lg font-medium text-gray-700">
              Request By Month
            </p>
            <div className="flex mt-3 justify-between items-end">
              <p className="text-3xl font-light">7</p>
              <FaCalendarAlt className="text-3xl text-gray-800" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4 m-2 ">
          <div className="md:col-span-6 col-span-12 p-3  bg-white rounded-lg">
            <p className="text-lg font-medium text-gray-700">
             Request based on Department
            </p>
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
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
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
              <div className="flex md:flex-col flex-row md:gap-2 gap-4 mr-1 flex-wrap justify-center">
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
          <div className="md:col-span-6 col-span-12 p-3  bg-white rounded-lg">
            <p className="text-lg font-medium text-gray-700">
              Control Request By Status
            </p>
            <div className="flex flex-col md:flex-row items-center py-4 gap-2">
              <PieChart
                width={250}
                height={225}
                className="flex md:flex-col items-center flex-row outline-none"
              >
                <Pie
                  data={filterStatus}
                  dataKey="value"
                  cx={120}
                  cy={100}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  fill="#8884d8"
                  label
                >
                  {filterStatus.map((entry, index) => (
                    <Cell
                      className="flex flex-col md:flex-row outline-none"
                      key={`cell-${index}`}
                      fill={entry.color}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              <div className="flex md:flex-col flex-row md:gap-2 gap-4 mr-1 flex-wrap justify-center">
                {filterStatus.map((entry, index) => (
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
                        backgroundColor: entry.color,
                      }}
                    />
                    <span style={{ marginLeft: 10 }}>{entry.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
