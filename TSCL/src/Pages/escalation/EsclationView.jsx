import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { API, formatDate1, formatDate2 } from "../../Host";
import { useLocation, useNavigate } from "react-router-dom";
import decryptData from "../../Decrypt";
import ViewAttachment from "../request/ViewAttachment";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { IoIosEye } from "react-icons/io";
import GrievanceDetailsModal from "../request/GrievanceDetailsModal";

const EscalationView = () => {
  const [data, setData] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [workDataFile, setWorkDataFile] = useState(null);
  const [endpoint, setEndpoint] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("grievance");
  const queryParams = new URLSearchParams(location.search);
  const grievanceId = queryParams.get("grievanceId");
  const [escalate, setEscalate] = useState(null);
  const token = localStorage.getItem("token");
  const [isviewModal, setIsviewModal] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [logData, setLogData] = useState([]);
  const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/new-grievance/getbyid?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setData(responseData);
        const responsefilter = await axios.get(
          `${API}/new-grievance/filter?zone_name=${responseData.zone_name}&ward_name=${responseData.ward_name}&street_name=${responseData.street_name}&dept_name=${responseData.dept_name}&complaint=${responseData.complaint}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = decryptData(responsefilter.data.data);
        const filteredData = data.filter(
          (item) => item.grievance_id !== grievanceId
        );
        setMatchData(filteredData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchEscalate = async () => {
      try {
        const response = await axios.get(
          `${API}/grievance-escalation/getbyid?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setEscalate(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataFile = async () => {
      try {
        const response = await axios.get(
          `${API}/new-grievance-attachment/getattachments?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setDataFile(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataFileWorksheet = async () => {
      try {
        const response = await axios.get(
          `${API}/grievance-worksheet-attachment/getattachments?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setWorkDataFile(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchLog = async () => {
      try {
        const response = await axios.get(
          `${API}/grievance-log/getbyid?grievance_id=${grievanceId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);
        setLogData(responseData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchDataFile();
    fetchLog();
    fetchDataFileWorksheet();
    fetchEscalate();
  }, []);

  const toggleModal = () => {
    setIsviewModal(!isviewModal);
    setAttachmentFile(null);
  };

  const handleGrievanceClick = (grievanceId) => {
    setSelectedGrievanceId(grievanceId);
    setIsGrievanceModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `${API}/new-grievance/notify?grievance_id=${grievanceId}`,
        {
          escalation_notify: message,
          escalation_notify_read:'no'
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Message sent successfully!");
        await axios.post(
          `${API}/grievance-log/post`,
          {
            grievance_id: grievanceId,
            log_details: `Notification given by ${localStorage.getItem(
              "name"
            )}: Message: ${message}`,
            created_by_user: localStorage.getItem("name"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage("");
        history.back();
      } else {
        toast.error("Failed to send the message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred while sending the message.");
    }
  };

  return (
    <Fragment>
      <div className="h-screen overflow-y-auto no-scrollbar">
        {data && data.grievance_id && (
          <div className="md:mx-6 mx-2  my-5 font-lexend">
            <p>Complaint Details #{data.grievance_id}</p>
            <div className="bg-white mt-2 pb-3">
              <p className="px-5 py-2 text-lg">Request By :</p>
              <div className="flex justify-between gap-3 mx-3 my-3">
                <div className="col-span-4 px-5 pb-3">
                  <p className="capitalize">{data.public_user_name}</p>
                  <p>+91 {data.phone}</p>{" "}
                </div>
                <div className="flex flex-col mx-3">
                  <div className="flex gap-3 mb-3 items-center">
                    <p> Current Status: </p>

                    <span className="text-sm border-2 border-gray-500 w-28 text-center py-1.5 ml-1 rounded-full capitalize">
                      {data.status}
                    </span>
                  </div>

                  <div className="flex gap-3 items-center ">
                    <p>Priority Level : </p>
                    <span
                      className={`border w-28 rounded-full text-center py-1.5 mx-2 text-sm font-normal capitalize text-white  ${
                        data.priority === "High"
                          ? "bg-red-500"
                          : data.priority === "Medium"
                          ? "bg-sky-500"
                          : data.priority === "Low"
                          ? "bg-green-500"
                          : ""
                      }`}
                    >
                      {data.priority}
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="grid grid-cols-12 gap-2 mx-3 my-4">
                <div className="md:col-span-6 col-span-12 border px-4 py-6 rounded-lg shadow-sm bg-white">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Grievance Details
                  </h2>
                  <hr className="mb-6" />

                  {/* Tabs */}
                  <div className="flex border-b mb-6">
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 focus:outline-none ${
                        activeTab === "grievance"
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent text-gray-600 hover:text-gray-800"
                      }`}
                      onClick={() => setActiveTab("grievance")}
                    >
                      Grievance Info
                    </button>
                    <button
                      className={`px-4 py-2 text-sm font-medium border-b-2 focus:outline-none ${
                        activeTab === "escalation"
                          ? "border-blue-500 text-blue-500"
                          : "border-transparent text-gray-600 hover:text-gray-800"
                      }`}
                      onClick={() => setActiveTab("escalation")}
                    >
                      Escalation Info
                    </button>
                  </div>

                  {activeTab === "grievance" && (
                    <div className="flex flex-col gap-3 text-base">
                      {[
                        { label: "Origin", value: data.grievance_mode },
                        {
                          label: "Complaint Type",
                          value: data.complaint_type_title,
                        },
                        { label: "Department", value: data.dept_name },
                        { label: "Complaint", value: data.complaint },
                        { label: "Zone", value: data.zone_name },
                        { label: "Ward", value: data.ward_name },
                        { label: "Street", value: data.street_name },
                        { label: "Pincode", value: data.pincode },
                        {
                          label: "Complaint Address",
                          value: data.complaintaddress,
                        },
                        { label: "Description", value: data.complaint_details },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          className={`grid ${
                            label === "Description"
                              ? "grid-cols-1"
                              : "grid-cols-4"
                          } gap-2`}
                        >
                          <p className="font-medium col-span-2">{label}</p>
                          <p
                            className={`capitalize text-gray-700 ${
                              label === "Description"
                                ? "col-start-1 col-span-4 mt-2"
                                : "col-span-2"
                            }`}
                          >
                            {label === "Description" ? value : `: ${value}`}
                          </p>
                        </div>
                      ))}

                      {dataFile && dataFile.length > 0 && (
                        <div className="mt-4">
                          <p className="font-medium">Attachment Files:</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {dataFile.map((file, index) => (
                              <button
                                key={index}
                                className="px-3 py-1 bg-gray-600 text-white rounded-full text-sm hover:bg-gray-700"
                                onClick={() => {
                                  setIsviewModal(true);
                                  setAttachmentFile(file.attachment);
                                  setEndpoint("new-grievance-attachment");
                                }}
                              >
                                Attachment {index + 1}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === "escalation" && (
                    <div className="flex flex-col gap-3 text-base">
                      {[
                        {
                          label: "Escalation Details",
                          value: escalate.escalation_details,
                        },
                        {
                          label: "Escalation Level",
                          value: escalate.escalation_level,
                        },
                        {
                          label: "Escalation Department",
                          value: escalate.escalation_department,
                        },
                        {
                          label: "Escalation To",
                          value: escalate.escalation_to,
                        },
                        {
                          label: "Escalation Complaint",
                          value: escalate.escalation_complaint,
                        },
                        {
                          label: "Escalated User",
                          value: escalate.escalated_user,
                        },

                        {
                          label: "Escalated Due Days",
                          value: escalate.escalated_due,
                        },
                        {
                          label: "Escalation Raised By",
                          value: escalate.escalation_raisedby,
                        },
                        {
                          label: "Priority",
                          value: escalate.escalation_priority,
                        },
                        { label: "Status", value: escalate.status },
                        {
                          label: "Created At",
                          value: formatDate1(escalate.createdAt),
                        },
                      ].map(({ label, value }) => (
                        <div key={label} className="grid grid-cols-4">
                          <p className="col-span-2 font-medium">{label}</p>
                          <p className="col-span-2 capitalize text-gray-700">
                            : {value}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="md:col-span-6 col-span-12 border px-2 py-3 rounded ">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 py-2">
                    Similar Request
                  </h2>
                  <hr className="my-3 w-full" />
                  <div className="overflow-auto no-scrollbar">
                    <table className="w-full bg-gray-200 rounded ">
                      <thead>
                        <tr>
                          <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                            Grievance
                          </th>
                          <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                            Department
                          </th>
                          <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                            Origin
                          </th>
                          <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                            Date
                          </th>
                          <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-300">
                        {matchData && matchData.length > 0 ? (
                          matchData.map((data, index) => (
                            <tr
                              className="border-b-2 border-gray-300"
                              key={index}
                            >
                              <td
                                className="text-center mx-3 py-2.5 whitespace-nowrap"
                                onClick={() =>
                                  handleGrievanceClick(data.grievance_id)
                                }
                              >
                                {data.grievance_id}
                              </td>
                              <td className="text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 capitalize">
                                {data.dept_name}
                              </td>
                              <td className="text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 capitalize">
                                {data.grievance_mode}
                              </td>
                              <td className="text-center mx-3 py-2.5 whitespace-nowrap text-gray-600 ">
                                {formatDate2(data.createdAt)}
                              </td>
                              <td className="flex justify-center mt-3">
                                <IoIosEye
                                  className="text-xl"
                                  onClick={() =>
                                    handleGrievanceClick(data.grievance_id)
                                  }
                                />
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td className="text-center py-2.5" colSpan="3">
                              No matching data found
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mx-5 mt-5 ">
                <p className="text-base my-4 font-semibold text-gray-700">
                  Notify Engineer About Escalation:
                </p>
                {data?.escalation_notify && data.escalation_notify_read === 'no' ? (
                  <p className="text-sm text-gray-700">
                   <strong> Notification Sent</strong> : {data.escalation_notify}
                  </p>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Message:
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="block w-full px-3 py-2 border rounded-md shadow-sm outline-none sm:text-sm"
                        placeholder="Write your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                    </div>

                    <button
                      className="px-5 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700"
                      onClick={handleSubmit}
                    >
                      Send Message
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-12 gap-2 mx-3 my-1">
                <div className="md:col-span-12 col-span-12">
                  <p className="mb-2 text-base my-4 font-semibold text-gray-700">
                    Complaint History
                  </p>
                  <div className="bg-gray-100 py-3 h-[530px]">
                    <div className="mx-8">
                      <p className="py-3 font-semibold">
                        Complaint No {data.grievance_id}
                      </p>
                      <div className="h-[380px] overflow-x-auto no-scrollbar mb-3">
                        {logData
                          ?.slice()
                          .reverse()
                          .map((logEntry, index) => (
                            <div key={index}>
                              <p className="py-1">
                                {new Date(
                                  logEntry.createdAt
                                ).toLocaleDateString()}
                              </p>
                              <div className="grid grid-cols-3 divide-x-2 divide-black">
                                <p>
                                  {new Date(
                                    logEntry.createdAt
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                    hour12: true,
                                  })}
                                </p>
                                <p className="pl-5 col-span-2">
                                  {logEntry.log_details}
                                </p>
                              </div>
                              <br />
                            </div>
                          ))}

                        <p className="py-2">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </p>
                        <div className="grid grid-cols-3 divide-x-2 divide-black">
                          <p>
                            {new Date(data.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                          <p className="pl-5 col-span-2">
                            Assigned To Particular {data.dept_name} Department
                          </p>
                        </div>
                        <br />
                        <div className="grid grid-cols-3 divide-x-2 divide-black">
                          <p>
                            {new Date(data.createdAt).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                          </p>
                          <p className="pl-5 col-span-2">
                            Ticket Raised- {data.grievance_id}
                          </p>
                        </div>
                        <br />
                        {workDataFile?.length > 0 && (
                          <div className="grid grid-cols-4">
                            <p className="col-span-2">Attachment Files </p>
                            <div className="col-start-1 col-span-4 mt-2 text-xs">
                              {workDataFile.map((file, index) => (
                                <button
                                  className="mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white"
                                  key={index}
                                  onClick={() => {
                                    setIsviewModal(true);
                                    setAttachmentFile(file.attachment);
                                    setEndpoint(
                                      "grievance-worksheet-attachment"
                                    );
                                  }}
                                >
                                  {`Attachment ${index + 1}`}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <hr className="my-3" />
                      <div className="md:grid md:grid-cols-3 flex border-2">
                        <p className="text-center px-3 py-1.5">Status</p>
                        <p className="text-center w-full bg-gray-800 md:col-span-2 text-white py-1.5">
                          {data.status}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {isviewModal && (
        <ViewAttachment
          endpoint={endpoint}
          toggleModal={toggleModal}
          attachmentFile={attachmentFile}
        />
      )}
      {isGrievanceModalOpen && (
        <GrievanceDetailsModal
          grievanceId={selectedGrievanceId}
          closeModal={() => setIsGrievanceModalOpen(false)}
        />
      )}
    </Fragment>
  );
};

export default EscalationView;
