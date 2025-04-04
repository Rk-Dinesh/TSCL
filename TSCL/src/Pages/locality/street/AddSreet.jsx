import React, { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../Host";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveCancel from "../../../components/SavaCancel";

const StreetSchema = yup.object().shape({
  ward_name: yup
    .string()
    .test(
      "not-select",
      "Please select a ward",
      (value) => value !== "" && value !== "Select Street"
    ),
  street_name: yup.string().required("street_name is required"),
});

const AddStreet = (props) => {
  const { ExistingWards } = props;
  const [zoneId, setZoneId] = useState(null);
  const [wardId, setWardId] = useState(null);
  const [zoneName, setZoneName] = useState(null);
  const [WardName, setWardName] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(StreetSchema),
    mode: "all",
  });

  useEffect(() => {
    if (WardName) {
      const selectedWard = ExistingWards.find(
        (ward) => ward.ward_name === WardName
      );
      if (selectedWard) {
        setZoneId(selectedWard.zone_id);
        setWardId(selectedWard.ward_id);
        setZoneName(selectedWard.zone_name);
      }
    }
  }, [WardName, ExistingWards]);

  const onSubmit = async (data) => {
    
    const formData = {
      ...data,
      zone_id: zoneId,
      ward_id: wardId,
      zone_name: zoneName,
      status: "active",
      created_by_user: localStorage.getItem("name"),
    };

    try {
      setIsLoading(true)
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API}/street/post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Street created Successfully");
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
      <div className="bg-white w-[522px] h-[368px]  font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Street</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-3">
            <div className="mb-3">
              <label
                className="block text-gray-900 text-base font-normal mb-3"
                htmlFor="ward_name"
              >
                Ward Name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="ward_name"
                {...register("ward_name")}
                onChange={(e) => setWardName(e.target.value)}
              >
                <option value="">Select Ward</option>
                {ExistingWards.map((ward,index) => (
                  <option key={index} value={ward.ward_name}>
                    {ward.ward_name}
                  </option>
                ))}
              </select>
              {errors.ward_name && (
                <p className="text-red-500">{errors.ward_name.message}</p>
              )}
            </div>

            <div className="">
              <label
                className="block text-gray-900 text-base font-normal mb-3"
                htmlFor="street_name"
              >
                Street Name
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="street_name"
                type="text"
                placeholder="Street Name"
                {...register("street_name")}
              />
              {errors.street_name && (
                <p className="text-red-500">{errors.street_name.message}</p>
              )}
            </div>
          </div>
          <SaveCancel onCancel={props.toggleCloseModal} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default AddStreet;
