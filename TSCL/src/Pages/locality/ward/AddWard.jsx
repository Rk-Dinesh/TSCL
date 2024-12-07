import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../../Host";
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
});
const AddWard = (props) => {
  const { ExistingZones } = props;

  const [zoneId, setZoneId] = useState(null);
  const [ZoneName, setZoneName] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(WardSchema),
    mode: "all",
  });

  useEffect(() => {
    // dispatch(fetchZone())
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
      status: "active",
      created_by_user: localStorage.getItem("name"),
    };

    // console.log(formData);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`${API}/ward/post`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success("Ward created Successfully");
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
          <h1 className="text-xl font-medium pt-10 pb-2">Add Ward</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-3">
            <div className="mb-3">
              <label
                className="block text-gray-900 text-base font-normal mb-3"
                htmlFor="zone_name"
              >
                Zone Name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="zone_name"
                {...register("zone_name")}
                onChange={(e) => setZoneName(e.target.value)}
              >
                <option value="">Select Zone</option>
                {ExistingZones.map((zone) => (
                  <option key={zone.zone_id} value={zone.zone_name}>
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
                className="block text-gray-900 text-base font-normal mb-3"
                htmlFor="ward_name"
              >
                Ward Name
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="ward_name"
                type="text"
                placeholder=" Ward Name"
                {...register("ward_name")}
              />
              {errors.ward_name && (
                <p className="text-red-500">{errors.ward_name.message}</p>
              )}
            </div>
          </div>
          <SaveCancel onCancel={props.toggleCloseModal} />
        </form>
      </div>
    </div>
  );
};

export default AddWard;
