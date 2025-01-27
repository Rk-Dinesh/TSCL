import axios from "axios";
import React, { useState, useEffect, Fragment, useRef } from "react";
import { API, formatDate1, formatDate2 } from "../../Host";
import { useLocation, useNavigate } from "react-router-dom";
import decryptData from "../../Decrypt";
import ViewAttachment from "./ViewAttachment";
import { BsThreeDotsVertical } from "react-icons/bs";
import SimilarReq from "../grievances/SimilarReq";
import GrievanceDetailsModal from "./GrievanceDetailsModal";
import { IoIosEye } from "react-icons/io";
import { toast } from "react-toastify";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Logo from "../../assets/images/logo1.png";

const ViewRequest = () => {
  const [isContentVisible, setContentVisible] = useState(false);
  const pdfContentRef = useRef(null);
  const [data, setData] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [workDataFile, setWorkDataFile] = useState(null);
  const [endpoint, setEndpoint] = useState(null);
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  // const grievanceId = location.state?.grievanceId;
  const queryParams = new URLSearchParams(location.search);
  const grievanceId = queryParams.get("grievanceId");
  const token = localStorage.getItem("token");
  const [isviewModal, setIsviewModal] = useState(false);
  const [isSimilarReq, setIsSimilarReq] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [logData, setLogData] = useState([]);
  const navigate = useNavigate();
  const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);

  useEffect(() => {
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

    fetchData();
    fetchDataFile();
    fetchLog();
    fetchDataFileWorksheet();
  }, []);

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

  const handleReOpen = async () => {
    try {
      const response = await axios.post(
        `${API}/new-grievance/reopen?grievance_id=${grievanceId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Ticket Re-Opened Successfully");
        await axios.post(
          `${API}/grievance-log/post`,
          {
            grievance_id: grievanceId,
            log_details: `Ticket No ${grievanceId} is Re-Opened by ${localStorage.getItem(
              "name"
            )}`,
            created_by_user: localStorage.getItem("name"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        fetchData();
        fetchLog();
      } else {
        toast.error("Failed ");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred while sending the message.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return <p>No data found</p>;

  const toggleModal = () => {
    setIsviewModal(!isviewModal);
    setAttachmentFile(null);
  };

  const togglReModal = () => {
    setIsSimilarReq(!setIsSimilarReq);
  };

  const handleGrievanceClick = (grievanceId) => {
    setSelectedGrievanceId(grievanceId);
    setIsGrievanceModalOpen(true);
  };

  const handleDownloadPDF = () => {
    setContentVisible(true);

    const element = pdfContentRef.current; 
    element.style.visibility = "visible";
    html2canvas(element, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "mm", "a4");

      const imgWidth = 210; 
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save("Acknowledgement_Form.pdf");

      setContentVisible(false); 
      element.style.visibility = "hidden"; 
    }).catch((err) => {
      console.error("Error generating canvas for PDF:", err);
      setContentVisible(false);
      element.style.visibility = "hidden"; 
    });
  };

  return (
    <Fragment>
     
      <div className="h-screen overflow-y-auto no-scrollbar">
      <div className="px-6 ">
      <div
        ref={pdfContentRef} 
        style={{
          visibility: "hidden",
          position: "absolute", 
          top: "-9999px", 
          left: "-9999px",
        }}
      >
        <div
          className=" mx-6 my-4 bg-white border border-black p-4"
          style={{
            width: "600px",
            fontFamily: "Arial",
            borderRadius: "12px", 
            border: "2px solid black",
          }}
        >
          <div className="flex justify-between">
            <img src={Logo} alt="Madurai Logo" className="size-20" />
            <div className="text-center">
              <h2 style={{ fontSize: "16px", fontWeight: "bold" }}>
                INTEGRATED COMPLAINT TRACKING SYSTEM
              </h2>
              <p className="mb-4">Acknowledgement Form</p>
            </div>
          </div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <tbody className="text-xs">
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                  }}
                >
                  Acknowledgment Number:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {data.grievance_id}
                </td>
              </tr>
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                  }}
                >
                  Complaint Date:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                  {formatDate2(data.createdAt)}
                </td>
              </tr>
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                  }}
                >
                  Applicant Name:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                 {data.public_user_name}
                </td>
              </tr>
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                  }}
                >
                  Address:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                 {data.street_name}
                </td>
              </tr>
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                  }}
                >
                  Zone:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                 {data.zone_name}
                </td>
              </tr>
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                  }}
                >
                  Ward:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                 {data.ward_name}
                </td>
              </tr>
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                  }}
                >
                  Mobile Number:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                 {data.phone}
                </td>
              </tr>
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                  }}
                >
                  Grievance Type:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                 {data.complaint}
                </td>
              </tr>
              <tr>
                <td
                  className="font-semibold text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                  }}
                >
                  Description:
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                 {data.complaint_details}
                </td>
              </tr>
            </tbody>
          </table>


          <table
            className="text-xs"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "10px",
            }}
          >
            <thead>
              <tr>
                <th
                  className="text-nowrap"
                  style={{
                    border: "1px solid black",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Assigned To
                </th>
                <th
                  className="text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Zone
                </th>
                <th
                  className="text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Ward No
                </th>
                <th
                  className="text-nowrap"
                  style={{
                    border: "1px solid black", 
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  Complaint Location
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{ border: "1px solid black", padding: "8px" }}
                  colSpan={1}
                >
                 {data.assign_username? data.assign_username : "yet to be assigned"}
                </td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{data.zone_name}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>{data.ward_name}</td>
                <td style={{ border: "1px solid black", padding: "8px" }}>
                 {data.street_name}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex justify-end">
      <button
        onClick={handleDownloadPDF}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 "
      >
        Download Acknowledgement
      </button>
      </div>
    </div>
        <div className="md:mx-6 mx-2  my-5 font-lexend">
          <div className="flex justify-between">
            <p>Complaint Details #{data.grievance_id}</p>
            {data.status === "closed" &&
              (() => {
                const updatedAt = new Date(data.ticketclosedtime);

                const today = new Date();

                const timeDifference = today - updatedAt;

                const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

                return daysDifference <= 7 ? (
                  <button
                    className="bg-green-600 px-3 py-1.5 rounded-md shadow-md text-white text-sm"
                    onClick={() => {
                      const userConfirmed = window.confirm(
                        "Are you sure you want to Re-open the ticket?"
                      );
                      if (userConfirmed) {
                        handleReOpen();
                      }
                    }}
                  >
                    Re-open Ticket
                  </button>
                ) : null;
              })()}
          </div>
          <div className="bg-white mt-2 pb-3">
            <p className="px-5 py-2 text-lg">Request By :</p>
            <div className="flex justify-between gap-3 mx-3 my-3 items-center flex-wrap">
              <div className="col-span-4 px-5 pb-3">
                <p className="capitalize">{data.public_user_name}</p>
                <p>+91 {data.phone}</p>{" "}
              </div>
              <div className="flex flex-row gap-2 items-center flex-wrap">
                <div className="flex  gap-3  items-center">
                  <p>Status: </p>
                  <span className="text-sm border border-gray-500 w-24 text-center py-1.5 rounded-full capitalize">
                    {data.status}
                  </span>
                </div>

                <div className="flex gap-3 items-center ">
                  <p className="">Priority: </p>
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
              {data.assign_username ? (
                <div className="flex flex-col mx-3">
                  <div className="flex   gap-3 items-center">
                    <p>Assigned to </p>
                    <span className="text-sm border border-gray-500 px-3 text-center py-1.5 rounded-full capitalize whitespace-nowrap">
                      {data.assign_username}
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <hr />
            <div className="grid grid-cols-12 gap-2 mx-3 my-4">
              <div className="md:col-span-6 col-span-12 border px-2 py-3 rounded">
                <p className="pt-2 text-lg">Grievance Details</p>
                <hr className="my-3" />
                <div className="flex flex-col gap-3 mx-2 text-base">
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Origin </p>
                    <p className="col-span-2 capitalize">
                      : {data.grievance_mode}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Complaint Type </p>
                    <p className="col-span-2 capitalize">
                      : {data.complaint_type_title}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Department </p>
                    <p className="col-span-2 capitalize">: {data.dept_name}</p>
                  </div>

                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Complaint </p>
                    <p className="col-span-2 capitalize">: {data.complaint}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Zone </p>
                    <p className="col-span-2 capitalize">: {data.zone_name}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Ward </p>
                    <p className="col-span-2 capitalize">: {data.ward_name}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Street </p>
                    <p className="col-span-2 capitalize">
                      : {data.street_name}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Pincode </p>
                    <p className="col-span-2 capitalize">: {data.pincode}</p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Complaint Address: </p>
                    <p className="col-start-1 col-span-4 mt-2 capitalize">
                      {data.complaintaddress}
                    </p>
                  </div>
                  <div className="grid grid-cols-4">
                    <p className="col-span-2">Description: </p>
                    <p className="col-start-1 col-span-4 mt-2 capitalize">
                      {data.complaint_details}
                    </p>
                  </div>

                  {dataFile && dataFile.length > 0 && (
                    <div className="grid grid-cols-4">
                      <p className="col-span-2">Attachment Files </p>
                      <div className="col-start-1 col-span-4 mt-2 text-xs  ">
                        {dataFile.map((file, index) => (
                          <button
                            className=" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white"
                            key={index}
                            onClick={() => {
                              setIsviewModal(true);
                              setAttachmentFile(file.attachment);
                              setEndpoint("new-grievance-attachment");
                            }}
                          >
                            {`Attachment ${index + 1}`}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="md:col-span-6 col-span-12 border px-2 py-3 rounded ">
                <p className="pt-2 text-lg ">Similar Request</p>
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
                        <tr className="">
                          <td className="text-center py-2.5" colSpan="5">
                            No matching data found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="mx-3 my-3">
              <p className="mb-2 mx-1 text-lg">Complaint History</p>
              <div className="bg-gray-100 py-3 h-[530px]">
                <div className="mx-8 ">
                  <p className="py-3 font-semibold">
                    Complaint No {data.grievance_id}
                  </p>
                  <div className="h-[380px]  overflow-x-auto no-scrollbar mb-3">
                    {logData &&
                      logData
                        .slice()
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
                        {" "}
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
                    {workDataFile && workDataFile.length > 0 && (
                      <div className="grid grid-cols-4">
                        <p className="col-span-2">Attachment Files </p>
                        <div className="col-start-1 col-span-4 mt-2 text-xs  ">
                          {workDataFile.map((file, index) => (
                            <button
                              className=" mx-1 my-1 px-3 py-1.5 bg-gray-500 rounded-full text-white"
                              key={index}
                              onClick={() => {
                                setIsviewModal(true);
                                setAttachmentFile(file.attachment);
                                setEndpoint("grievance-worksheet-attachment");
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
                  <div className="md:grid md:grid-cols-3 flex border-2 md:mx-20">
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
      {isGrievanceModalOpen && (
        <GrievanceDetailsModal
          grievanceId={selectedGrievanceId}
          closeModal={() => setIsGrievanceModalOpen(false)}
        />
      )}

      {isviewModal && (
        <ViewAttachment
          endpoint={endpoint}
          toggleModal={toggleModal}
          attachmentFile={attachmentFile}
        />
      )}
      {isSimilarReq && (
        <SimilarReq matchData={matchData} togglReModal={togglReModal} />
      )}
    </Fragment>
  );
};

export default ViewRequest;
