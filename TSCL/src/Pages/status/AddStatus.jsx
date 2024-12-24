import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../Host";
import SaveCancel from "../../components/SavaCancel";

const hexColorRegex = /^#([0-9A-F]{3}){1,2}$/i;
const StatusSchema = yup.object().shape({
  status_name: yup.string().required("status is required").lowercase(),
  color: yup
    .string()
    .matches(hexColorRegex, "Enter a valid hex color code")
    .required("Color is required"),
});

const AddStatus = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(StatusSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      status: "active",
      created_by_user: localStorage.getItem("name"),
    };

    try {
      setIsLoading(true)
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API}/status/post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success(" created Successfully");
        setIsLoading(false)
        props.toggleModal();
        props.handlerefresh();
      } else {
        console.error("Error in posting data", response);
        setIsLoading(false)
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
      setIsLoading(false)
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white w-[522px] h-[330px]  font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Status</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-2">
            <label
              className="block text-gray-900 text-base font-normal mb-4"
              htmlFor="status_name"
            >
              Status
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="status_name"
              type="text"
              placeholder="Status"
              {...register("status_name")}
            />
            {errors.status_name && (
              <p className="text-red-500">{errors.status_name.message}</p>
            )}
          </div>
          <div className="mx-6 my-3">
            <label
              className="block text-gray-900 text-base font-normal mb-3"
              htmlFor="color"
            >
              Color
            </label>
            <input
              className="w-1/2 rounded-full outline-none bg-transparent"
              id="color"
              type="color"
              list="allowed-colors"
              {...register("color")}
            />

            <datalist id="allowed-colors">
              <option value="#111827" />
              <option value="#14532d" />
              <option value="#eab308" />
              <option value="#1e40af" />
              <option value="#65a30d" />
            </datalist>
            {errors.color && (
              <p className="text-red-500">{errors.color.message}</p>
            )}
          </div>
          <SaveCancel onCancel={props.toggleModal} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default AddStatus;
