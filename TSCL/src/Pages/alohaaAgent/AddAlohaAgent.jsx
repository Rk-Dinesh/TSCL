import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";
import { API } from "../../Host";

const AgentSchema = yup.object().shape({
  agent_name: yup.string().required("AgentName is required"),
  caller_number: yup.string().required("CallerNumber is required"),
});

const AddAlohaaAgent = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(AgentSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    };

    try {
      setIsLoading(true);
      const response = await axios.post(`${API}/alohaagent/post`,formData, {
              headers: { Authorization: `Bearer ${token}` },
            });

      if (response.status === 200) {
        toast.success(" created Successfully");
        setIsLoading(false);
        props.toggleModal();
        props.handlerefresh();
      } else {
        console.error("Error in posting data", response);
        setIsLoading(false);
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
      setIsLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center  ">
      <div className="bg-white w-[522px] h-[330px]  font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-6 pb-2">Add AgentNumber</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-2">
            <label
              className="block text-gray-900 text-base font-normal mb-2"
              htmlFor="agent_name"
            >
             AgentName
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="agent_name"
              type="text"
              placeholder=" Agent Name"
              {...register("agent_name")}
            />
            {errors.agent_name && (
              <p className="text-red-500">{errors.agent_name.message}</p>
            )}
          </div>
          <div className="mx-6 mb-2">
            <label
              className="block text-gray-900 text-base font-normal mb-2"
              htmlFor="caller_number"
            >
             Phone Number
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="caller_number"
              type="text"
              placeholder="Number"
              {...register("caller_number")}
            />
            {errors.caller_number && (
              <p className="text-red-500">{errors.caller_number.message}</p>
            )}
          </div>
          <SaveCancel onCancel={props.toggleModal} isLoading={isLoading} />
        </form>
      </div>
    </div>
  );
};

export default AddAlohaaAgent;
