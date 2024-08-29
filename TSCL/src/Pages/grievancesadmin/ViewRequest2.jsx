import axios from "axios";
import React, { useState, useEffect, Fragment } from "react";
import { API } from "../../Host";
import { useLocation, useNavigate } from "react-router-dom";
import decryptData from "../../Decrypt";
import ViewAttachment from "../request/ViewAttachment";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

const GrievanceSchema = yup.object().shape({
  assign_username: yup.string().required(" required "),
});

const ViewRequest2 = () => {
  const [data, setData] = useState(null);
  const [dataFile, setDataFile] = useState(null);
  const [dataUsers, setDataUsers] = useState([]);
  const [logData, setLogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const grievanceId = location.state?.grievanceId;

  const deptName = location.state?.deptName;

  const token = sessionStorage.getItem("token");
  const [isviewModal, setIsviewModal] = useState(false);
  const [attachmentFile, setAttachmentFile] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(GrievanceSchema),
    mode: "all",
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
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    const fetchDeptUser = async () => {
      try {
        const response = await axios.get(
          `${API}/user/getbydept?dept_name=${deptName}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const responseData = decryptData(response.data.data);

        setDataUsers(responseData);
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
    fetchDeptUser();
    fetchDataFile();
    fetchLog();
  }, []);

  const toggleModal = () => {
    setIsviewModal(!isviewModal);
    setAttachmentFile(null);
  };

  const onSubmit = async (data) => {
    const selectElement = event.target.querySelector("select");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const assignUserId = selectedOption.getAttribute("data-user-id");
    const assignUserPhone = selectedOption.getAttribute("data-user-phone");
    const assignUserName = selectedOption.getAttribute("data-user-name");

    const formData = {
      ...data,
      assign_user: assignUserId,
      assign_userphone: assignUserPhone,
    };

    try {
      const response = await axios.post(
        `${API}/new-grievance/updateassign?grievance_id=${grievanceId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Work Assigned Successfully");
        navigate("/requestview2");
        const response = await axios.post(
          `${API}/grievance-log/post`,
          {
            grievance_id: grievanceId,
            log_details: `Work Assigned to ${assignUserName}`,
            created_by_user: "admin",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        console.error("Error in posting data", response);
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
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
              <div className="md:grid md:grid-cols-12 grid grid-cols-12 items-center gap-6 mx-3 my-3">
                <div className="md:col-span-3 col-span-6 flex-col-2 px-5 pb-3">
                  <p className="capitalize">{data.public_user_name}</p>
                  <p>+91 {data.phone}</p>{" "}
                </div>
                <div className="md:col-span-3 col-span-6 ">
                  <div className="flex gap-3 mb-2  items-center">
                    <p>Status: </p>
                    <span className="text-sm border border-gray-500 w-24 py-1 text-center rounded-full capitalize">
                      {data.status}
                    </span>
                  </div>
                  <div className="flex gap-3 items-center">
                    <p className="-ml-1">Priority: </p>
                    <span className="text-sm text-white bg-orange-400 w-24 text-center py-1 rounded-full capitalize">
                      {data.priority}
                    </span>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className=" flex gap-4 items-center">
                    <div className="md:col-span-4 col-span-6">
                      <select
                        className="col-span-2 block px-6 py-1.5 text-sm text-black border rounded-lg border-gray-500 outline-none capitalize"
                        defaultValue=""
                        {...register("assign_username")}
                      >
                        <option
                          value={
                            data.assign_username ? data.assign_username : ""
                          }
                          hidden
                        >
                          {data.assign_username
                            ? data.assign_username
                            : "Assign User"}
                        </option>

                        {dataUsers &&
                          dataUsers.map((option) => (
                            <option
                              key={option.user_name}
                              value={option.user_name}
                              data-user-id={option.user_id}
                              data-user-phone={option.phone}
                              data-user-name={option.user_name}
                            >
                              {option.user_name}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div className="md:col-span-2 col-span-6">
                      <button className="bg-primary px-4 py-1.5 text-sm text-white rounded-full">
                        Submit
                      </button>
                    </div>
                    {errors.assign_username && (
                      <p className="text-red-500 text-xs text-start px-2 pt-2">
                        {errors.assign_username.message}
                      </p>
                    )}
                  </div>
                </form>
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
                            Date/Time
                          </th>
                          <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                            Complaint No
                          </th>
                          <th className="items-center mx-3 py-2 font-lexend whitespace-nowrap">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-300">
                        <tr className="border-b-2  border-gray-300">
                          <td className="text-center mx-3 py-2.5 whitespace-nowrap">
                            15-05-2024 / 12:00 AM
                          </td>
                          <td className="text-center  mx-3 py-2.5 whitespace-nowrap">
                            R-0001122
                          </td>
                          <td className="text-center  mx-3 py-2.5 text-green-600 whitespace-nowrap">
                            In Progress
                          </td>
                        </tr>
                        <tr className="border-b-2 border-gray-300">
                          <td className="text-center mx-2 my-2 whitespace-nowrap">
                            15-05-2024 / 12:00 AM
                          </td>
                          <td className="text-center  mx-2 my-2 whitespace-nowrap">
                            R-0001122
                          </td>
                          <td className="text-center  mx-2 my-2 text-green-600 whitespace-nowrap">
                            In Progress
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="mx-3 my-3 ">
                <p className="mb-2 mx-1 text-lg">Complaint History</p>
                <div className="bg-gray-100 py-3 h-[530px]">
                  <div className="mx-8 ">
                    <p className="py-3 font-semibold">
                      Complaint No {data.grievance_id}
                    </p>
                    <div className="h-[280px]  overflow-x-auto no-scrollbar mb-3">
                      {logData &&
                        logData.slice().reverse().map((logEntry, index) => (
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
                        <p className="pl-5 col-span-2">Logged In</p>
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
                          Ticket Raised {data.grievance_id}
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
                          Assigned To Particular Department
                        </p>
                      </div>
                    </div>

                    <p className="mb-2">Work StatusFlow :</p>

                    <div className="grid grid-cols-3 divide-x-2 divide-black">
                      <p>
                       <span className="block"> {new Date(data.updatedAt).toLocaleDateString()}</span>
                        {new Date(data.updatedAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </p>

                      <div className="col-span-2">
                        <p className="pl-5">Status:</p>
                        <p className="pl-5 text-gray-500">
                          {data.statusflow
                            .split("/")
                            .join(" / ")
                            .replace(/(?: \/ ){5}/g, " / \n")}
                        </p>
                      </div>
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
        )}
      </div>
      {isviewModal && (
        <ViewAttachment
          toggleModal={toggleModal}
          attachmentFile={attachmentFile}
        />
      )}
    </Fragment>
  );
};

export default ViewRequest2;
