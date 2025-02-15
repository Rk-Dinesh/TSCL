import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import decryptData from "../../../Decrypt";
import SaveCancel from "../../../components/SavaCancel";
import API_ENDPOINTS from "../../../ApiEndpoints/api/ApiClient";

const StreetSchema = yup.object().shape({
  ward_name: yup
    .string()
    .test(
      "not-select",
      "Please select a ward",
      (value) => value !== "" && value !== "Select Street"
    ),
  street_name: yup.string().required("street_name is required"),
  status: yup
    .string()
    .test(
      "not-select",
      "Please select an Status",
      (value) => value !== "" && value !== "Status"
    ),
});

const EditStreet = (props) => {
  const { ExistingWards, streetId } = props;

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
    setValue,
  } = useForm({
    resolver: yupResolver(StreetSchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const GETBYID_STREET = API_ENDPOINTS.FETCH_STREET(streetId);
        const response = await axios.get(GETBYID_STREET.url, {
          headers: GETBYID_STREET.headers,
        });
        const data = decryptData(response.data.data);

        setWardName(data.ward_name);
        setValue("ward_name", data.ward_name);
        setValue("street_name", data.street_name);
        setValue("status", data.status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [streetId, setValue]);

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
    };

    try {
      setIsLoading(true)
      const UPDATE_STREET = API_ENDPOINTS.UPDATE_STREET(streetId);
      const response = await axios.post(UPDATE_STREET.url, formData, {
        headers: UPDATE_STREET.headers,
      });

      if (response.status === 200) {
        toast.success("Street updated Successfully");
        setIsLoading(false)
        setZoneId(null);
        setWardId(null);
        setZoneName(null);
        setWardName(null);
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
          <h1 className="text-xl font-medium pt-6 pb-2">Edit Street</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-2">
            <div className="mb-2">
              <label
                className="block text-gray-900 text-base font-normal mb-2"
                htmlFor="ward_name"
              >
                Ward Name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="ward_name"
                {...register("ward_name")}
                onChange={(e) => setWardName(e.target.value)}
              >
                <option value={WardName} disabled>
                  {WardName}
                </option>
                {ExistingWards.map((ward, index) => (
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
                className="block text-gray-900 text-base font-normal mb-2"
                htmlFor="street_name"
              >
                Street Name
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="street_name"
                type="text"
                placeholder="Street Name"
                {...register("street_name")}
              />
              {errors.street_name && (
                <p className="text-red-500">{errors.street_name.message}</p>
              )}
            </div>
            <div className=" grid grid-cols-3 mx-3 my-3 ">
              <label
                className=" text-gray-900 text-base font-normal  col-span-1"
                htmlFor="status"
              >
                Status:
              </label>
              <select
                className="   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none"
                id="status"
                {...register("status")}
              >
                <option value="" hidden>
                  Status
                </option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
              {errors.status && (
                <p className="text-red-500 text-xs text-center mb-3 ">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>
          <SaveCancel onCancel={props.toggleModal} isLoading={isLoading}/>
        </form>
      </div>
    </div>
  );
};

export default EditStreet;
