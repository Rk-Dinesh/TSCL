import React, { useEffect, useState } from "react";
import decryptData from "../../Decrypt";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../Host";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TicketSchema = yup.object().shape({
  dept_name: yup
    .string()
    .test(
      "not-select",
      "Please select an Department",
      (value) => value !== "" && value !== "Select  Department"
    ),
  complaint: yup
    .string()
    .test(
      "not-select",
      "Please select an complaint",
      (value) => value !== "" && value !== "Select  complaint"
    ),
});

const ManyTicketTransfer = (props) => {
  const { selectedRows, toggleTModal, handlerefresh } = props;
  const token = localStorage.getItem("token");
  const [ExistingDept, setExistingDept] = useState([]);
  const [ExistingComplaint, setExistingComplaint] = useState([]);
  const [filterComplaints, setFilterComplaints] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(TicketSchema),
    mode: "all",
  });

  useEffect(() => {
    fetchExistingDepts();
    fetchExistingType();
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
      console.error("Error fetching existing Department:", error);
    }
  };

  const fetchExistingType = async () => {
    try {
      const response = await axios.get(`${API}/complaint/getactive`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseData = decryptData(response.data.data);
      setExistingComplaint(responseData);
    } catch (error) {
      console.error("Error fetching existing Department:", error);
    }
  };

  const handleComplaint = (event) => {
    if (event) {
      const selectedType = event.target.value;
      const filteredType = ExistingComplaint?.filter(
        (compt) => compt.dept_name === selectedType
      );
      setFilterComplaints(filteredType);
    } else {
      setFilteredWards([]);
    }
  };

  const onSubmit = async (data) => {
    const formData = {
      grievanceIds: selectedRows,
      transferDetails: {
        ...data,
      },
      user:localStorage.getItem('name')
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${API}/new-grievance/updatemanytransfer`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Bulk-Ticket Transfer Successfull");
        toggleTModal();
        handlerefresh();
      } else {
        console.error("Error in posting data", response);
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white  h-fit  font-lexend m-2 rounded-sm w-[500px]">
        <div className="border-b-2 border-gray-300 mx-6">
          <h1 className="text-xl font-medium pt-6 ">Ticket Transfer</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="  py-2 mx-6 my-3 gap-5 ">
            <div className="mb-3 flex items-baseline gap-3">
              <label
                className="block text-gray-900 text-base font-normal mb-3 w-2/6"
                htmlFor="dept_name"
              >
                Department
              </label>
              <select
                className="appearance-none border rounded-lg w-4/6 py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="dept_name"
                {...register("dept_name")}
                onChange={handleComplaint}
              >
                <option value="">Select Department</option>
                {ExistingDept.map((dept,index) => (
                  <option key={index} value={dept.dept_name}>
                    {dept.dept_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.dept_name && (
              <p className="text-red-500 text-end text-sm mb-2 -mt-2">
                {errors.dept_name.message}
              </p>
            )}

            <div className="mb-3 flex items-baseline gap-3">
              <label
                className="block text-gray-900 text-base font-normal mb-3 w-2/6"
                htmlFor="complaint"
              >
                Complaint Type
              </label>
              <select
                className="appearance-none border rounded-lg w-4/6 py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="complaint"
                {...register("complaint")}
              >
                <option value="">Select complaint</option>
                {filterComplaints.map((com,index) => (
                  <option
                    key={index}
                    value={com.complaint_type_title}
                  >
                    {com.complaint_type_title}
                  </option>
                ))}
              </select>
            </div>
            {errors.complaint && (
              <p className="text-red-500 text-end text-sm mb-2 -mt-2">
                {errors.complaint.message}
              </p>
            )}

            <div className="flex justify-end py-3 mx-10 my-3 gap-5">
              <div
                className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
                onClick={toggleTModal}
              >
                Cancel
              </div>
              <button className="text-white bg-primary font-lexend rounded-3xl px-5 py-1.5">
                Transfer
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManyTicketTransfer;
