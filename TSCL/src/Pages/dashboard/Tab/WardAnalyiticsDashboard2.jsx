import React from "react";
import { useState, useEffect } from "react";
import { MdPendingActions } from "react-icons/md";
import { TbCheckupList } from "react-icons/tb";
import { HiClipboardList } from "react-icons/hi";
import axios from "axios";
import { API} from "../../../Host";
import { useNavigate } from "react-router-dom";

const EngineerMetrics = () => {
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

      setCount(responseData);
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
          <div className="grid grid-cols-12 gap-3 my-2">
            {[
              {
                label: "Grievances Received",
                value: count.totalGrievances?.[0]?.total ?? 0,
                icon: HiClipboardList,
                color: "sky-600",
              },
              {
                label: "Grievances Resolved",
                value: count.resolvedGrievances?.[0]?.resolved ?? 0,
                icon: TbCheckupList,
                color: "green-600",
              },
              {
                label: "Pending Grievances",
                value: count.pendingGrievances?.[0]?.pending ?? 0,
                icon: MdPendingActions,
                color: "red-800",
              }
            ].map((item, index) => (
              <div
                key={index}
                className={`md:col-span-4 sm:col-span-6 col-span-12 border-2 bg-white p-4 rounded-lg shadow-md ${
                  item.onClick ? "cursor-pointer" : ""
                }`}
                //onClick={item.onClick ?? handleNavigate}
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

      <div className="grid grid-cols-12 gap-2  mt-1 mb-2">
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
          <p className="text-gray-800 text-lg font-medium mb-1 mx-3">
            List of Wards with Grievances :
          </p>
          <table className="w-full mt-1 my-2 ">
            <thead className=" border-b border-gray-300  py-2  ">
              <tr>
                <th className="text-start text-slate-700 font-semibold pl-5 py-2">
                  <p>Ward</p>
                </th>
                <th className="text-center text-slate-700 font-semibold py-2">
                  <p>Grievances</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {wardData.map((ward, index) => (
                <tr className=" border-b border-gray-300  py-2 " key={index}>
                  <td className="text-start text-gray-600 pl-5 py-2">{ward._id}</td>
                  <td className="text-center text-gray-600 py-2">{ward.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
          <p className="text-gray-800 text-lg font-medium mb-1 mx-3">
            Top Grievances contributed by PublicUser :
          </p>
          <table className="w-full mt-1 my-2 mx-3 ">
            <thead className=" border-b border-gray-300 py-2  ">
              <tr>
                <th className="text-start text-slate-700 font-semibold pl-3 py-2">
                  <p>Public_user</p>
                </th>
                <th className="text-center text-slate-700 font-semibold py-2">
                  <p>Grievances</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {publicData.map((user, index) => (
                <tr className=" border-b border-gray-300  py-2 " key={index}>
                  <td className="text-start text-gray-600 pl-3 py-2">{user._id}</td>
                  <td className="text-center text-gray-600 py-2">{user.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:col-span-6 col-span-12 p-3 border-2  bg-white rounded-lg py-2 overflow-x-auto no-scrollbar shadow-md h-[320px]">
        <p className="text-gray-800 text-lg font-medium mb-1 mx-3">
          Most frequent complaints By ward :
        </p>
        <table className="w-full mt-1 my-2 mx-3 ">
          <thead className=" border-b border-gray-300   ">
            <tr>
              <th className="text-start text-slate-700 font-semibold pl-3 py-2">
                <p>Ward</p>
              </th>
              <th className="text-start text-slate-700 font-semibold py-2">
                <p>Complaint</p>
              </th>
              <th className="text-start text-slate-700 font-semibold pl-3 py-2">
                <p>Count</p>
              </th>
            </tr>
          </thead>
          <tbody>
            {frequent.map((user, index) => (
              <tr className=" border-b border-gray-300   " key={index}>
                <td className="text-start text-gray-600 pl-3 py-2">{user._id}</td>
                <td className="text-start text-gray-600 py-2">
                  {user.maxComplaint.complaint}
                </td>
                <td className="text-start text-gray-600 pl-3 py-2">
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

export default EngineerMetrics;
