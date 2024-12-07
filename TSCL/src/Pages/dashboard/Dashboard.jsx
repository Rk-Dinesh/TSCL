import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { FaPlus } from "react-icons/fa6";
import { BsCalendar2Week } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { VscGitPullRequestNewChanges } from "react-icons/vsc";
import { API, formatDate1 } from "../../Host";
import axios from "axios";
import decryptData from "../../Decrypt";
import { RiExpandUpDownLine } from "react-icons/ri";
import logo from "../../assets/images/logo1.png";

const Dashboard = () => {
  const [report, setReport] = useState([]);
  const [department, setDepartment] = useState([]);
  const [status, setStatus] = useState([]);
  const token = localStorage.getItem("token");
  const [filterDept, setFilterDept] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);

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
    acc.push({
      name: stat.status_name,
      value: reports.length,
      color: stat.color,
    });
    return acc;
  }, []);

  useEffect(() => {
    setFilterDept(filteredDataDept);
    setFilterStatus(filteredStatusData);
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

  const todayReports = report.filter((r) => {
    const createdAt = new Date(r.createdAt);
    const today = new Date();
    return (
      createdAt.getDate() === today.getDate() &&
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  });

  const thisWeekReports = report.filter((r) => {
    const createdAt = new Date(r.createdAt);
    const today = new Date();
    const startOfWeek = today.getDate() - today.getDay() + 1;
    const endOfWeek = startOfWeek + 6;
    return (
      createdAt.getDate() >= startOfWeek && createdAt.getDate() <= endOfWeek
    );
  });

  const thisMonthReports = report.filter((r) => {
    const createdAt = new Date(r.createdAt);
    const today = new Date();
    return (
      createdAt.getMonth() === today.getMonth() &&
      createdAt.getFullYear() === today.getFullYear()
    );
  });

  const requestByToday = todayReports.length;
  const requestByWeek = thisWeekReports.length;
  const requestByMonth = thisMonthReports.length;

  return (
    <div className="overflow-y-auto no-scrollbar ">
      <div className="  font-lexend h-screen mx-3 my-4  ">
        <div className="grid grid-cols-12 gap-3  my-2 mx-3  ">
          <div className="md:col-span-4 sm:col-span-6 px-4 col-span-12 bg-white p-4 rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-700">
              Request By Today
            </p>
            <div className="flex mt-3 justify-between items-end">
              <p className="text-3xl font-medium mx-3 ">{requestByToday}</p>
              <VscGitPullRequestNewChanges className="text-4xl text-green-600" />
            </div>
          </div>
          <div className="md:col-span-4 sm:col-span-6 col-span-12 bg-white p-4 rounded-lg shadow-md">
            {" "}
            <p className="text-lg font-medium text-gray-700">Request By Week</p>
            <div className="flex mt-3 justify-between items-end">
              <p className="text-3xl font-medium mx-3">{requestByWeek}</p>
              <BsCalendar2Week className="text-4xl text-yellow-800" />
            </div>
          </div>
          <div className="md:col-span-4 sm:col-span-12 col-span-12 bg-white p-4 rounded-lg shadow-md">
            {" "}
            <p className="text-lg font-medium text-gray-700">
              Request By Month
            </p>
            <div className="flex mt-3 justify-between items-end">
              <p className="text-3xl font-medium mx-3">{requestByMonth}</p>
              <FaCalendarAlt className="text-4xl text-sky-600" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 m-2 ">
          <div className="md:col-span-6 col-span-12 p-3  bg-white rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-700">
              Request based on Department :
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
          <div className="md:col-span-6 col-span-12 p-3  bg-white rounded-lg shadow-md">
            <p className="text-lg font-medium text-gray-700">
              Control Request By Status :
            </p>
            <div className="flex flex-col md:flex-row items-center py-4 gap-2">
              <PieChart
                width={250}
                height={245}
                className="flex md:flex-col items-center flex-row outline-none"
              >
                <Pie
                  data={filterStatus}
                  dataKey="value"
                  cx={120}
                  cy={120}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
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
              <div className="flex md:flex-col flex-row md:gap-0 gap-4 mr-1 flex-wrap justify-center">
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

        <div className="bg-white h-3/6 mx-3 rounded-lg mt-2  p-3 shadow-md">
          <p className="text-lg font-lexend my-1 mx-2">
            Last 5 Grievances request :
          </p>
          <div className=" rounded-lg  py-1 overflow-x-auto no-scrollbar">
            <table className="w-full mt-1 ">
              <thead className=" border-b border-gray-300  ">
                <tr className="">
                  <th>
                    <p className="mx-1.5 my-2 text-start font-lexend font-medium  whitespace-nowrap">
                      Complaint No
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Department <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Complaint <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-start mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      RasiedBy
                      <RiExpandUpDownLine />
                    </p>
                  </th>
                  <th>
                    <p className="flex gap-2 items-center justify-center mx-1.5 my-2 font-lexend font-medium  whitespace-nowrap">
                      Date <RiExpandUpDownLine />
                    </p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {report
                  .slice()
                  .reverse()
                  .slice(0, 5)
                  .map((report, index) => (
                    <tr className=" border-b border-gray-300  " key={index}>
                      <td>
                        <p className="border-2 w-28 border-slate-900 rounded-lg text-center py-1 my-1 capitalize text-slate-900 ">
                          {report.grievance_id}
                        </p>
                      </td>
                      <td>
                        <div className="flex  gap-2 items-center justify-start mx-5 my-3  text-sm text-gray-800">
                          <img src={logo} alt="logo" className="w-8 h-8" />
                          <p className="font-lexend whitespace-nowrap capitalize   text-gray-800">
                            {" "}
                            {report.dept_name}
                          </p>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {report.complaint}
                        </p>
                      </td>
                      <td>
                        {" "}
                        <p className=" text-start mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {report.public_user_name}
                        </p>
                      </td>
                      <td>
                        <p className=" text-center mx-1.5  my-2 font-lexend whitespace-nowrap text-sm capitalizetext-gray-700">
                          {formatDate1(report.createdAt)}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
