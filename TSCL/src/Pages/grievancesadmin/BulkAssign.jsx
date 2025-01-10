import React, { useEffect, useState } from "react";
import decryptData from "../../Decrypt";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../Host";
import axios from "axios";

const AssignSchema = yup.object().shape({
  assign_username: yup
    .string()
    .test(
      "not-select",
      "Please select an Assign User",
      (value) => value !== "" && value !== "Select Assign_user"
    ),
});

const BulkAssign = ({ selectedRows, toggleAModal, handlerefresh }) => {
  const token = localStorage.getItem("token");
  const [dataUsers, setDataUsers] = useState([]);
  const [existingDept, setExistingDept] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [filteredDesignation, setFilteredDesignation] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(AssignSchema),
    mode: "all",
  });

  useEffect(() => {
    fetchDeptUser();
    fetchExistingDepts();
    fetchDesignation();
  }, []);

  const fetchExistingDepts = async () => {
    try {
      const response = await axios.get(`${API}/department/getactive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setExistingDept(responseData);
    } catch (error) {
      toast.error("Failed to fetch departments.");
    }
  };

  const fetchDesignation = async () => {
    try {
      const response = await axios.get(`${API}/designation/getactive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setDesignation(responseData);
    } catch (error) {
      toast.error("Failed to fetch designations.");
    }
  };

  const fetchDeptUser = async () => {
    try {
      const response = await axios.get(`${API}/user/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setDataUsers(responseData);
    } catch (error) {
      toast.error("Failed to fetch users.");
    }
  };

  const handleDE = (event) => {
    const selectedType = event.target.value;
    const filteredType = designation.filter((des) => des.dept_name === selectedType);
    setFilteredDesignation(filteredType);
    setFilteredUsers([]);
  };

  const handleUser = (event) => {
    const selectedType = event.target.value;
    const filteredType = dataUsers.filter((user) => user.designation === selectedType);
    setFilteredUsers(filteredType);
  };

  const onSubmit = async (data) => {
    if (selectedRows.length <= 0) {
      toast.error("Select at least one grievance.");
      return;
    }

    const assignUser = filteredUsers.find(
      (user) => user.user_name === data.assign_username
    );

    const formData = {
      grievanceIds: selectedRows,
      assignUserDetails: {
        assign_username : assignUser?.user_name,
        assign_user: assignUser?.user_id,
        assign_userphone: assignUser?.phone,
      },
      user: localStorage.getItem("name"),
    };

    try {
      const response = await axios.post(
        `${API}/new-grievance/updatemanyassign`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Bulk-Assign Successful");
        toggleAModal();
        handlerefresh();
      } else {
        toast.error("Failed to assign grievances.");
      }
    } catch (error) {
      toast.error("An error occurred during assignment.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white h-fit font-lexend m-2 rounded-sm w-[500px]">
        <div className="border-b-2 border-gray-300 mx-6">
          <h1 className="text-xl font-medium pt-6">Assign User</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="py-2 mx-6 my-3 gap-5">
            <div className="mb-3 flex items-baseline gap-3">
              <label className="block text-gray-900 w-2/6">Department</label>
              <select
                className="appearance-none border rounded-lg w-4/6 py-1.5 px-3"
                onChange={handleDE}
              >
                <option value="">Select Department</option>
                {existingDept.map((dept, index) => (
                  <option key={index} value={dept.dept_name}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 flex items-baseline gap-3">
              <label className="block text-gray-900 w-2/6">Designation</label>
              <select
                className="appearance-none border rounded-lg w-4/6 py-1.5 px-3"
                onChange={(event) => {
                  setFilteredUsers([]); 
                  handleUser(event);
                }}
              >
                <option value="">Select Designation</option>
                {filteredDesignation.map((des, index) => (
                  <option key={index} value={des.designation}>
                    {des.designation}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3 flex items-baseline gap-3">
              <label className="block text-gray-900 w-2/6">Assign User</label>
              <select
                className="appearance-none border rounded-lg w-4/6 py-1.5 px-3"
                {...register("assign_username")}
              >
                <option value="" >Select Assign_user</option>
                {filteredUsers.map((option, index) => (
                  <option key={index} value={option.user_name}>
                    {option.user_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.assign_username && (
              <p className="text-red-500 text-end text-sm mb-2">
                {errors.assign_username.message}
              </p>
            )}
            <div className="flex justify-end py-3 mx-10 my-3 gap-5">
              <button
                type="button"
                className="border border-primary text-primary rounded-3xl px-5 py-1.5"
                onClick={toggleAModal}
              >
                Cancel
              </button>
              <button className="text-white bg-primary rounded-3xl px-5 py-1.5">
                Assign
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BulkAssign;
