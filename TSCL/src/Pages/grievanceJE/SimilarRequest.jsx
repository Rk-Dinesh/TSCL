import React, { useState } from "react";
import { API, formatDate1 } from "../../Host";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SimilarRequest = (props) => {
  const { matchData, togglSeModal, dataStatus, worksheet } = props;
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const toggleSelection = (grievanceId) => {
    setSelectedItems((prev) =>
      prev.includes(grievanceId)
        ? prev.filter((id) => id !== grievanceId)
        : [...prev, grievanceId]
    );
  };

  const handleBulkStatusUpdate = async () => {
    if (!selectedStatus) {
      toast.error("Please select a status to update.");
      return;
    }
    if (selectedItems.length === 0) {
      toast.error("Please select at least one grievance.");
      return;
    }

    try {
      const updatePromises = selectedItems.map((grievanceId) =>
        axios.post(
          `${API}/new-grievance/updatestatus?grievance_id=${grievanceId}`,
          { status: selectedStatus },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
       
      );
      await Promise.all(updatePromises);
      
      const logPromises = selectedItems.map((grievanceId) => {
        const promises = [
          axios.post(
            `${API}/grievance-log/post`,
            {
              grievance_id: grievanceId,
              log_details: `SR: Assigned work status updated to ${selectedStatus} by ${localStorage.getItem(
                "name"
              )}`,
              created_by_user: localStorage.getItem("name"),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios.post(
            `${API}/grievance-log/post`,
            {
              grievance_id: grievanceId,
              log_details: `SR: Worksheet Updated by ${localStorage.getItem(
                "name"
              )} : ${worksheet}`,
              created_by_user: localStorage.getItem("name"),
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
          axios.post(
            `${API}/grievance-worksheet/post`,
            {
              grievance_id: grievanceId,
              worksheet_name: `SR: Worksheet Updated by ${localStorage.getItem(
                "name"
              )} : ${worksheet}`,
              created_by_user: localStorage.getItem("name"),
              status: selectedStatus,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          ),
        ];
      
        if (selectedStatus === "closed") {
          promises.push(
            axios.post(
              `${API}/new-grievance/worksheetJE?grievance_id=${grievanceId}`,
              {
                worksheet_JE: worksheet,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            ),
           axios.post(
              `${API}/new-grievance/highlight?grievance_id=${grievanceId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
          );
        }
      
        return Promise.all(promises);
      });
      
      await Promise.all(logPromises);
      

      toast.success(
        "Status and logs updated successfully for selected grievances."
      );
      setSelectedItems([]);
      navigate('/requestview3')
    } catch (error) {
      console.error("Error updating status or logs", error);
      toast.error("Failed to update status and logs.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-3/4 h-4/5 font-lexend m-2 mx-5 overflow-auto rounded-lg">
        <div className="flex justify-between px-5 py-3 items-center bg-gray-200">
          <p className="text-lg font-semibold">Similar Request</p>
          <button
            className="text-2xl font-bold text-gray-700"
            onClick={() => {
              const userConfirmed = window.confirm("Are you sure you want to close?");
              if (userConfirmed) {
                togglSeModal();
              }
            }}
          >
            ×
          </button>
        </div>

        <div className="p-5">
          {/* Status Dropdown */}
          <div className="mb-5 flex items-center gap-3">
            <p className=" text-gray-700">Select Status:</p>
            <select
              className="block px-3 py-1.5 border rounded-lg capitalize"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="" hidden>
                Choose Status
              </option>
              {dataStatus &&
                dataStatus.map((option, index) => (
                  <option key={index} value={option.status_name}>
                    {option.status_name}
                  </option>
                ))}
            </select>
            <button
              className="px-5 py-1.5 bg-green-600 text-white text-sm rounded-md font-medium"
              onClick={handleBulkStatusUpdate}
            >
              Update Status
            </button>
          </div>

          {/* Match Data */}
          {matchData && matchData.length > 0 ? (
            matchData.map((data, index) => (
              <div
                key={index}
                className="border mb-4 rounded-lg p-4 shadow-sm bg-gray-50"
              >
                <div className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    className="mr-3"
                    checked={selectedItems.includes(data.grievance_id)}
                    onChange={() => toggleSelection(data.grievance_id)}
                  />
                  <p className="text-gray-700 font-medium">
                    {data.grievance_id}: {data.dept_name} - {data.complaint}
                  </p>
                </div>
                <p className="text-gray-600 mb-2">
                  <strong>Current Status:</strong>{" "}
                  <span className="text-xs border-2 border-gray-500 px-5 text-center py-1 rounded-full capitalize">
                    {data.status}
                  </span>
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Description:</strong> {data.complaint_details}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Department:</strong> {data.dept_name}
                </p>
                <p className="text-gray-600">
                  <strong>Date:</strong> {formatDate1(data.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 font-semibold mt-10">
              No matching data found!
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimilarRequest;
