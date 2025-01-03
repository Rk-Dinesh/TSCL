import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const ComplaintSchema = yup.object().shape({
  complaint_type: yup.string().required("complaint_type is required"),
});

const AddComplaintType = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(ComplaintSchema),
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
      const response = await axios.post(
        API_ENDPOINTS.POST_COMPLAINTTYPE.url,
        formData,
        {
          headers: API_ENDPOINTS.POST_COMPLAINTTYPE.headers,
        }
      );

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
          <h1 className="text-xl font-medium pt-10 pb-2">Add Complaint Type</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-10">
            <label
              className="block text-gray-900 text-base font-normal mb-4"
              htmlFor="complaint_type"
            >
              Complaint Type
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="complaint_type"
              type="text"
              placeholder="Complaint Type"
              {...register("complaint_type")}
            />
            {errors.complaint_type && (
              <p className="text-red-500">{errors.complaint_type.message}</p>
            )}
          </div>
          <SaveCancel onCancel={props.toggleModal} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default AddComplaintType;
