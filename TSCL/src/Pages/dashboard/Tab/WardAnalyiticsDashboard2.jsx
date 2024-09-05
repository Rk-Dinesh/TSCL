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

const WardAnalyticDashboard2 = () => {
  const token = sessionStorage.getItem("token");
  const [count, setCount] = useState({});
  const [wardData, setWardData] = useState([]);
  const [publicData, setPublicData] = useState([]);
  const [frequent, setFrequent] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGrievanceCounts();
    fetchward();
    fetchpublic();
    fetchfrequent();
  }, []);

  const handleNavigate = () => {
    navigate('/requestview4')
  }

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

  const fetchward = async () => {
    try {
      const response = await axios.get(
        `${API}/new-grievance/ward-grievance-counts`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWardData(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchpublic = async () => {
    try {
      const response = await axios.get(
        `${API}/new-grievance/top-grievances-by-public-name`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPublicData(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  const fetchfrequent = async () => {
    try {
      const response = await axios.get(
        `${API}/new-grievance/frequent-complainants-by-ward`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFrequent(response.data);
    } catch (error) {
      console.error("Error fetching existing Dept:", error);
    }
  };

  return (
    <div className="  font-lexend mx-2 my-5 h-screen  ">
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
          </div>
        )}
      </div>

      <div className="grid grid-cols-12 gap-3  mt-2 mb-3">
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md">
          <p className="text-gray-800 text-lg font-medium mb-1 mx-3">
            Grievances based on Wards
          </p>
          <table className="w-full mt-1 my-2 ">
            <thead className=" border-b border-gray-300  py-2  ">
              <tr>
                <th className="text-start text-gray-800 pl-5 py-2">
                  <p>Ward</p>
                </th>
                <th className="text-center text-gray-800 py-2">
                  <p>Grievances</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {wardData.slice(0, 10).map((ward, index) => (
                <tr className=" border-b border-gray-300  py-2 " key={index}>
                  <td className="text-start text-gray-800 pl-5 py-2">{ward._id}</td>
                  <td className="text-center text-gray-800 py-2">{ward.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md">
          <p className="text-gray-800 text-lg font-medium mb-1 mx-3">
            Top Grievance contributed by Public
          </p>
          <table className="w-full mt-1 my-2 mx-3 ">
            <thead className=" border-b border-gray-300 py-2  ">
              <tr>
                <th className="text-start text-gray-800 pl-3 py-2">
                  <p>Public_user</p>
                </th>
                <th className="text-center text-gray-800 py-2">
                  <p>Grievances</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {publicData.slice(0, 10).map((user, index) => (
                <tr className=" border-b border-gray-300  py-2 " key={index}>
                  <td className="text-start text-gray-800 pl-3 py-2">{user._id}</td>
                  <td className="text-center text-gray-800 py-2">{user.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md">
        <p className="text-gray-800 text-lg font-medium mb-1 mx-3">
          Frequent complaint By ward
        </p>
        <table className="w-full mt-1 my-2 mx-3 ">
          <thead className=" border-b border-gray-300   ">
            <tr>
              <th className="text-start text-gray-800 pl-3 py-2">
                <p>Ward</p>
              </th>
              <th className="text-start text-gray-800 py-2">
                <p>Complaint</p>
              </th>
              <th className="text-start text-gray-800 pl-3 py-2">
                <p>Count</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {frequent.slice(0, 10).map((user, index) => (
              <tr className=" border-b border-gray-300   " key={index}>
                <td className="text-start text-gray-800 pl-3 py-2">{user._id}</td>
                <td className="text-start text-gray-800 py-2">
                  {user.maxComplaint.complaint}
                </td>
                <td className="text-start text-gray-800 pl-3 py-2">
                  {user.maxComplaint.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WardAnalyticDashboard2;
