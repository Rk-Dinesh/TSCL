import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import decryptData from "../../Decrypt";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";
import { API } from "../../Host";

const ResourceSchema = yup.object().shape({
  res_name: yup.string().required("Resource is required").lowercase(),
  status: yup
    .string()
    .test(
      "not-select",
      "Please select a Status",
      (value) => value !== "" && value !== "Status"
    ),
});

const EditEnquiryResource = (props) => {
  const { ResId } = props;
  const token = localStorage.getItem("token");
  const [imagePreview, setImagePreview] = useState(null); // For showing the preview
  const [imageBase64, setImageBase64] = useState("");
  const [imageError, setImageError] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(ResourceSchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/resource/getbyid?res_id=${ResId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = decryptData(response.data.data);
        setValue("res_name", data.res_name);
        setValue("status", data.status);
        setImagePreview(data.image); 
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [ResId, setValue]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file.size > 1024 * 1024) {
      toast.error("File size exceeds 1MB. Please upload a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result;
      setImageBase64(base64Image);
      setImagePreview(base64Image); 
      setImageError(false);
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = async (data) => {
    const token = localStorage.getItem("token");
    const formData = {
      ...data,
      image: imageBase64, 
    };

    try {
      const response = await axios.post(
        `${API}/resource/update?res_id=${ResId}`,formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Resource Updated Successfully");
        props.toggleModal();
        props.handlerefresh();
      } else {
        console.error("Error in posting data", response);
        toast.error("Failed to Update");
      }
    } catch (error) {
      console.error("Error in posting data", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[522px] h-fit font-lexend m-2 pb-8">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Edit Resource</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-8 my-6">
            <label
              className="block text-gray-900 text-base font-normal mb-4"
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

          <div>
            <div className="grid grid-cols-3 mx-10 my-8">
              <label
                className="text-gray-900 text-base font-normal col-span-1"
                htmlFor="status"
              >
                Status:
              </label>
              <select
                className="text-sm text-black border border-gray-900 rounded-lg border-none outline-none"
                id="status"
                {...register("status")}
              >
                <option value="" hidden>
                  Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
            </div>
            {errors.status && (
              <p className="text-red-500 text-xs text-center -mt-4 mb-2">
                {errors.status.message}
              </p>
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
              className="mx-auto block w-3/4 py-1.5 px-4 text-sm text-center text-gray-500 border border-gray-300 rounded-lg cursor-pointer focus:outline-none"
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imageError && (
              <p className="text-red-500 mt-2">Image upload is mandatory.</p>
            )}
            {imagePreview && (
              <div className="mt-4 flex  justify-center">
               
                <img
                  src={imagePreview}
                  alt="Uploaded Preview"
                  className="w-32 h-32 object-cover border rounded-lg"
                />
              </div>
            )}
          </div>

          <SaveCancel onCancel={props.toggleModal} />
        </form>
      </div>
    </div>
  );
};

export default EditEnquiryResource;
