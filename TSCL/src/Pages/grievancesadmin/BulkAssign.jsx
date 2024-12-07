import React, { useEffect, useState } from "react";
import decryptData from "../../Decrypt";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../Host";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AssignSchema = yup.object().shape({
  assign_username: yup
    .string()
    .test(
      "not-select",
      "Please select an Assign User",
      (value) => value !== "" && value !== "Select  Assign_user"
    ),
});

const BulkAssign = (props) => {
  const { selectedRows, toggleAModal, handlerefresh } = props;
  const token = localStorage.getItem("token");
  const [dataUsers, setDataUsers] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(AssignSchema),
    mode: "all",
  });

  useEffect(() => {
    fetchDeptUser();
  }, []);
  const fetchDeptUser = async () => {
    try {
      const dept = localStorage.getItem("dept");
      const response = await axios.get(
        `${API}/user/getbydept?dept_name=${dept}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const responseData = decryptData(response.data.data);

      setDataUsers(responseData);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (data) => {
    const selectElement = event.target.querySelector("select");
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const assignUserId = selectedOption.getAttribute("data-user-id");
    const assignUserPhone = selectedOption.getAttribute("data-user-phone");

    const formData = {
      grievanceIds: selectedRows,
      assignUserDetails: {
        ...data,
        assign_user: assignUserId,
        assign_userphone: assignUserPhone,
      },
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
        toast.success("Bulk-Assign Successfull");
        toggleAModal();
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
          <h1 className="text-xl font-medium pt-6 ">Assign User</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="  py-2 mx-6 my-3 gap-5 ">
            <div className="mb-3 flex items-baseline gap-3">
              <label
                className="block text-gray-900 text-base font-normal mb-3 w-2/6"
                htmlFor="assign_username"
              >
                Assign_user
              </label>
              <select
                className="appearance-none border rounded-lg w-4/6 py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="assign_username"
                {...register("assign_username")}
              >
                <option value="">Select Assign_user</option>
                {dataUsers &&
                  dataUsers.map((option,index) => (
                    <option
                      key={index}
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
            {errors.assign_username && (
              <p className="text-red-500 text-end text-sm mb-2 -mt-2">
                {errors.assign_username.message}
              </p>
            )}

            <div className="flex justify-end py-3 mx-10 my-3 gap-5">
              <div
                className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
                onClick={toggleAModal}
              >
                Cancel
              </div>
              <button className="text-white bg-primary font-lexend rounded-3xl px-5 py-1.5">
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
