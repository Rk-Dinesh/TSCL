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
import SimilarRequest from "./SimilarRequest";
import SimilarReq from "../grievances/SimilarReq";
import { IoIosEye } from "react-icons/io";
import GrievanceDetailsModal from "../request/GrievanceDetailsModal";

const Worksheet = yup.object().shape({
  worksheet_name: yup.string().required("worksheet is required"),
});

const ViewRequestJE = () => {
  const [data, setData] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [workDataFile, setWorkDataFile] = useState(null);
  const [endpoint, setEndpoint] = useState(null);
  const [dataStatus, setDataStatus] = useState([]);
  const [matchData, setMatchData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const [status, setStatus] = useState('')
  // const grievanceId = location.state?.grievanceId;
  const queryParams = new URLSearchParams(location.search);
  const grievanceId = queryParams.get("grievanceId");

  const token = localStorage.getItem("token");
  const [isviewModal, setIsviewModal] = useState(false);
  const [isSimilar, setIsSimilar] = useState(false);
  const [isSimilarReq, setIsSimilarReq] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [logData, setLogData] = useState([]);
  const [files, setFiles] = useState([]);
  const [worksheet, setWorksheet] = useState(null);
  const [selectedGrievanceId, setSelectedGrievanceId] = useState(null);
  const [isGrievanceModalOpen, setIsGrievanceModalOpen] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(Worksheet),
    mode: "onBlur",
  });

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
    const fetchDeptStatus = async () => {
      try {
        const response = await axios.get(`${API}/status/getactive`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = decryptData(response.data.data);

        setDataStatus(responseData);
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
    fetchDeptStatus();
    fetchDataFile();
    fetchLog();
    fetchDataFileWorksheet();
  }, []);

  const toggleModal = () => {
    setIsviewModal(!isviewModal);
    setAttachmentFile(null);
  };

  const togglSeModal = () => {
    navigate("/requestview3");
  };

  const togglReModal = () => {
    setIsSimilarReq(!setIsSimilarReq);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const fileSizeLimit = 250 * 1024; // 250KB in bytes

    if (files.length > 5) {
      toast.error("Maximum 5 files allowed");
      e.target.value = null;
    } else {
      for (const file of files) {
        if (file.size > fileSizeLimit) {
          toast.error(
            `File ${file.name} is too large. Please upload files up to 250KB.`
          );
          e.target.value = null;
          return;
        }
      }
      setFiles(files);
    }
  };

  // const handleStatus = async (data) => {

  //   const formData = {
  //     status: data,
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${API}/new-grievance/updatestatus?grievance_id=${grievanceId}`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Status Updated Successfully");

  //       const response = await axios.post(
  //         `${API}/grievance-log/post`,
  //         {
  //           grievance_id: grievanceId,
  //           log_details: ` Assigned work is ${data} updated by ${localStorage.getItem(
  //             "name"
  //           )}`,
  //           created_by_user: localStorage.getItem("name"),
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       navigate("/requestview3");
  //     } else {
  //       console.error("Error in posting data", response);
  //       toast.error("Failed to Upload");
  //     }
  //   } catch (error) {
  //     console.error("Error in posting data", error);
  //   }
  // };

  // const onSubmit = async (data) => {
  //   const workSheet = data.worksheet_name;
  //   const formData = {
  //     worksheet_name: ` WorkSheet given by ${localStorage.getItem("name")}: ${
  //       data.worksheet_name
  //     } `,
  //     grievance_id: grievanceId,
  //     created_by_user: localStorage.getItem("name"),
  //   };

  //   try {
  //     const response = await axios.post(
  //       `${API}/grievance-worksheet/post`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       toast.success("Wroksheet Uploaded Successfully");

  //       const response = await axios.post(
  //         `${API}/grievance-log/post`,
  //         {
  //           grievance_id: grievanceId,
  //           log_details: ` WorkSheet given by ${localStorage.getItem(
  //             "name"
  //           )}: ${workSheet}`,
  //           created_by_user: localStorage.getItem("name"),
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //     }

  //     if (files.length > 0) {
  //       if (files.length > 5) {
  //         toast.error("File limit exceeded. Maximum 5 files allowed.");
  //       } else {
  //         try {
  //           const formData = new FormData();
  //           for (let i = 0; i < files.length; i++) {
  //             formData.append("files", files[i]);
  //           }
  //           formData.append("grievance_id", grievanceId);
  //           formData.append("created_by_user", "admin");
  //           const response2 = await axios.post(
  //             `${API}/grievance-worksheet-attachment/post`,
  //             formData,
  //             {
  //               headers: {
  //                 "Content-Type": "multipart/form-data",
  //               },
  //             }
  //           );
  //           if (response2.status === 200) {
  //             toast.success("Attachment Uploaded Successfully");

  //             setFiles([]);
  //           }
  //         } catch (error) {
  //           console.error(error);
  //           toast.error("Error creating attachment");
  //         }
  //       }
  //     }
  //     if (data.status !== "closed") {
  //       navigate("/requestview3");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("An error occurred during submission. Please try again.");
  //   }
  // };

  const onSubmit = async (data) => {
    const workSheet = data.worksheet_name;

    if (!status) {
      toast.error("Please select a status.");
      return;
    }

    if (!workSheet || workSheet.trim() === "") {
      toast.error("Worksheet cannot be empty.");
      return;
    }

    const formData = {
      worksheet_name: `WorkSheet given by ${localStorage.getItem(
        "name"
      )}: ${workSheet}`,
      grievance_id: grievanceId,
      created_by_user: localStorage.getItem("name"),
      status: status,
    };

    try {
      // Update grievance worksheet
      const response = await axios.post(
        `${API}/grievance-worksheet/post`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Worksheet Uploaded Successfully");

        // Log the worksheet update
        await axios.post(
          `${API}/grievance-log/post`,
          {
            grievance_id: grievanceId,
            log_details: `WorkSheet given by ${localStorage.getItem(
              "name"
            )}: ${workSheet}`,
            created_by_user: localStorage.getItem("name"),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Handle attachments if they exist
        if (files.length > 0) {
          try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
              formData.append("files", files[i]);
            }
            formData.append("grievance_id", grievanceId);
            formData.append("created_by_user", "admin");

            const attachmentResponse = await axios.post(
              `${API}/grievance-worksheet-attachment/post`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (attachmentResponse.status === 200) {
              toast.success("Attachment Uploaded Successfully");
              setFiles([]);
            }
          } catch (error) {
            console.error("Error uploading attachment", error);
            toast.error("Error uploading attachment");
          }
        }

        const statusResponse = await axios.post(
          `${API}/new-grievance/updatestatus?grievance_id=${grievanceId}`,
          { status: status },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (statusResponse.status === 200) {
          toast.success("Status Updated Successfully");

          await axios.post(
            `${API}/grievance-log/post`,
            {
              grievance_id: grievanceId,
              log_details: `Assigned work is ${
                 status
              } updated by ${localStorage.getItem("name")}`,
              created_by_user: localStorage.getItem("name"),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (matchData.length === 0) {
            navigate("/requestview3");
          } else {
            setIsSimilar(true);
            setWorksheet(watch("worksheet_name"));
          }
        } else {
          toast.error("Failed to update status.");
        }
      } else {
        toast.error("Failed to upload worksheet.");
      }
    } catch (error) {
      console.error("Error during submission", error);
      toast.error("An error occurred during submission. Please try again.");
    }
  };

  const handleGrievanceClick = (grievanceId) => {
    setSelectedGrievanceId(grievanceId);
    setIsGrievanceModalOpen(true);
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
                      <p className="col-span-2 capitalize">
                        : {data.dept_name}
                      </p>
                    </div>
                    <div className="grid grid-cols-4">
                      <p className="col-span-2">Complaint </p>
                      <p className="col-span-2 capitalize">
                        : {data.complaint}
                      </p>
                    </div>
                    <div className="grid grid-cols-4">
                      <p className="col-span-2">Zone </p>
                      <p className="col-span-2 capitalize">
                        : {data.zone_name}
                      </p>
                    </div>
                    <div className="grid grid-cols-4">
                      <p className="col-span-2">Ward </p>
                      <p className="col-span-2 capitalize">
                        : {data.ward_name}
                      </p>
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
              <div className="mx-5 mt-5">
                <p className="text-base my-4">Work Status Update :</p>
                <div className="flex gap-3 items-center mx-6">
                  <p>Status: </p>
                  {data.status && data.status.toLowerCase() === "closed" ? (
                    <span className="text-sm border-2 border-gray-500 w-28 text-center py-1.5 ml-3 rounded-full">
                      Closed
                    </span>
                  ) : (
                    <span className="text-sm border-2 border-gray-500 px-3 py-0.5 rounded-full">
                      <select
                        className="col-span-2 block px-1 py-1 text-sm text-black border rounded-lg border-none outline-none capitalize"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value={data.status} hidden>
                          {data.status}
                        </option>
                        {dataStatus?.map((option, index) => (
                          <option key={index} value={option.status_name}>
                            {option.status_name}
                          </option>
                        ))}
                      </select>
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-2 mx-3 my-1">
                {/* Worksheet and Replay Form */}
                <div className="md:col-span-6 col-span-12 border px-2 py-3 rounded mt-8">
                  <div className="flex justify-between items-center">
                    <p className="mx-3">Replay</p>
                  </div>
                  <hr className="my-3 w-full" />
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                      id="worksheet_id"
                      rows="11"
                      className="w-full col-span-6 outline-none border p-2 rounded"
                      placeholder="Type..."
                      {...register("worksheet_name", {
                        required: "This field is required",
                      })}
                    />
                    <p className="text-red-500 text-sm mt-1">
                      {errors.worksheet_name?.message}
                    </p>

                    <div className="md:mt-12">
                      <input
                        type="file"
                        id="file"
                        multiple
                        accept=".jpeg, .jpg, .png"
                        className="py-2 px-3 outline-none border rounded"
                        onChange={handleFileChange}
                      />
                      <div className="flex justify-end mx-3 mt-3">
                        <button
                          type="submit"
                          className="text-white bg-gray-800 text-sm font-lexend rounded-full px-3 py-1.5"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="md:col-span-6 col-span-12">
                  <p className="mb-2 mx-1 text-lg">Complaint History</p>
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
      {isSimilar && (
        <SimilarRequest
          matchData={matchData}
          togglSeModal={togglSeModal}
          dataStatus={dataStatus}
          worksheet={worksheet}
        />
      )}
      {isSimilarReq && (
        <SimilarReq matchData={matchData} togglReModal={togglReModal} />
      )}
    </Fragment>
  );
};

export default ViewRequestJE;
