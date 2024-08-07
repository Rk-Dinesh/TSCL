import React,{useState,useEffect} from "react";
import axios from "axios";
import { API } from "../../../Host";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const WardSchema = yup.object().shape({
  zone_name: yup.string().required("Zone_name is required"),
  ward_name: yup.string().required("ward_name is required"),
});
const AddWard = (props) => {
  const { ExistingZones } = props;
  const [zoneId, setZoneId] = useState(null)
  const [ZoneName, setZoneName] = useState(null)
  //console.log(ExistingZones);
  

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
    if (ZoneName) {
      const selectedZone = ExistingZones.find(
        (zone) => zone.zone_name === ZoneName
      );
      if (selectedZone) {
        setZoneId( selectedZone.zone_id);
      }
    }
  }, [ZoneName, ExistingZones]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      zone_id:zoneId,
      status: "inactive",
      created_by_user: "admin",
    };

    console.log(formData);

    try {
      const response = await axios.post(`${API}/ward/post`, formData);

      if (response.status === 200) {
        toast.success("Ward created Successfully");
        props.toggleModal();
        // props.fetchData();
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
      <div className="bg-white w-[522px] h-[358px]  font-lexend">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Ward</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-5">
            <div className="mb-3">
              <label
                className="block text-gray-900 text-base font-normal mb-3"
                htmlFor="zone_name"
              >
                zone_name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="zone_name"
                {...register("zone_name")}
                onChange={(e) => setZoneName(e.target.value)}
              >
                <option>Select Role</option>
                {ExistingZones.map((zone) => (
                  <option key={zone.zone_name} value={zone.zone_name}>
                    {zone.zone_name}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500">{errors.role.message}</p>
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
                placeholder="Add Ward Name"
                {...register("ward_name")}
              />
              {errors.ward_name && (
                <p className="text-red-500">{errors.ward_name.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-end mx-10 gap-5 ">
            <button
              className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
              onClick={props.toggleCloseModal}
            >
              cancel
            </button>
            <button className=" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWard;
