import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../../Host";
import decryptData from "../../../Decrypt";
import SaveCancel from "../../../components/SavaCancel";

const WardSchema = yup.object().shape({
  zone_name: yup
    .string()
    .test(
      "not-select",
      "Please select an Zone",
      (value) => value !== "" && value !== "Select Zone"
    ),
  ward_name: yup.string().required("ward_name is required"),
  status: yup
    .string()
    .test(
      "not-select",
      "Please select an Status",
      (value) => value !== "" && value !== "Status"
    ),
});
const EditWard = (props) => {
  const token = localStorage.getItem("token");
  const { ExistingZones, wardId } = props;

  const [zoneId, setZoneId] = useState(null);
  const [ZoneName, setZoneName] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(WardSchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/ward/getbyid?ward_id=${wardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = decryptData(response.data.data);

        setZoneName(data.zone_name);
        setValue("ward_name", data.ward_name);
        setValue("status", data.status);
        setValue("zone_name", data.zone_name);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [wardId, setValue]);

  useEffect(() => {
    if (ZoneName) {
      const selectedZone = ExistingZones.find(
        (zone) => zone.zone_name === ZoneName
      );
      if (selectedZone) {
        setZoneId(selectedZone.zone_id);
      }
    }
  }, [ZoneName, ExistingZones]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      zone_id: zoneId,
    };

    try {
      const response = await axios.post(
        `${API}/ward/update?ward_id=${wardId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Ward Updated Successfully");
        setZoneId(null);
        setZoneId(null);
        props.toggleModal();
        props.handlerefresh();
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
      <div className="bg-white w-[522px] h-[368px]  font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-6 pb-2">Edit Ward</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-2">
            <div className="mb-2">
              <label
                className="block text-gray-900 text-base font-normal mb-2"
                htmlFor="zone_name"
              >
                Zone Name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="zone_name"
                {...register("zone_name")}
                onChange={(e) => setZoneName(e.target.value)}
              >
                <option value={ZoneName} disabled>
                  {ZoneName}
                </option>
                {ExistingZones.map((zone,index) => (
                  <option key={index} value={zone.zone_name}>
                    {zone.zone_name}
                  </option>
                ))}
              </select>
              {errors.zone_name && (
                <p className="text-red-500">{errors.zone_name.message}</p>
              )}
            </div>

            <div className="">
              <label
                className="block text-gray-900 text-base font-normal mb-2"
                htmlFor="ward_name"
              >
                Ward Name
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="ward_name"
                type="text"
                placeholder=" Ward Name"
                {...register("ward_name")}
              />
              {errors.ward_name && (
                <p className="text-red-500">{errors.ward_name.message}</p>
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
          <SaveCancel onCancel={props.toggleModal} />
        </form>
      </div>
    </div>
  );
};

export default EditWard;
