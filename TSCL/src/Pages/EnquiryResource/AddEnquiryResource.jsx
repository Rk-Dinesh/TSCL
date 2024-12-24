import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveCancel from "../../components/SavaCancel";
import { API } from "../../Host";

const OrganizationSchema = yup.object().shape({
  res_name: yup.string().required("Resource is required").lowercase(),
});

const AddEnquiryResource = (props) => {
  const [imageBase64, setImageBase64] = useState("");
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(OrganizationSchema),
    mode: "all",
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file.size > 1024 * 1024) {
      toast.error("File size exceeds 1MB. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImageBase64(reader.result);  
      setImageError(false); 
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
  
    if (!imageBase64) {
      setImageError(true);
      toast.error("Image upload is mandatory.");
      return;
    }

    const formData = {
      ...data,
      status: "active",
      created_by_user: localStorage.getItem("name"),
      image: imageBase64, 
    };

    try {
      setIsLoading(true)
      const response = await axios.post(`${API}/resource/post`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        toast.success("Resource created Successfully");
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
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[522px] h-[420px] font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Enquiry Resource</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-6">
            <label
              className="block text-gray-900 text-base font-normal mb-2"
              htmlFor="res_name"
            >
              Resource Name
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="res_name"
              type="text"
              placeholder="Resource Name"
              {...register("res_name")}
            />
            {errors.res_name && (
              <p className="text-red-500">{errors.res_name.message}</p>
            )}
          </div>
          <div className="mx-6 my-3">
            <label
              className="block text-gray-900 text-base font-normal mb-2"
              htmlFor="image"
            >
              Upload Image
            </label>
            <input
              className=" mx-auto block w-3/4 py-1.5 px-4 text-sm text-center text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imageError && (
              <p className="text-red-500 mt-2">Image upload is mandatory.</p>
            )}
            {imageBase64 && (
              <p className="text-green-500 mt-2">Image uploaded successfully.</p>
            )}
          </div>
          <SaveCancel onCancel={props.toggleModal} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default AddEnquiryResource;
