import React, { useState } from "react";
import axios from "axios";
import { API } from "../../../Host";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveCancel from "../../../components/SavaCancel";

const ZoneSchema = yup.object().shape({
  zone_name: yup.string().required("Zone_name is required"),
});

const AddZone = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(ZoneSchema),
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
      const response = await axios.post(`${API}/zone/post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Zone created Successfully");
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
      <div className="bg-white w-[522px] h-[340px]  font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Zone</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-10">
            <label
              className="block text-gray-900 text-base font-normal mb-4"
              htmlFor="zone_name"
            >
              Zone Name
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="zone_name"
              type="text"
              placeholder="Zone Name"
              {...register("zone_name")}
            />
            {errors.zone_name && (
              <p className="text-red-500">{errors.zone_name.message}</p>
            )}
          </div>
          <SaveCancel onCancel={props.toggleModal} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default AddZone;
