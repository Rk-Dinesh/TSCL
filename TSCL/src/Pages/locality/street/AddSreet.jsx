import React,{useState,useEffect} from "react";
import axios from "axios";
import { API } from "../../../Host";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const StreetSchema = yup.object().shape({
  ward_name: yup.string().required("ward_name is required"),
  street_name: yup.string().required("street_name is required"),
});


const AddStreet = (props) => {
  const {ExistingWards} = props
  const [zoneId, setZoneId] = useState(null)
  const [WardName, setWardName] = useState(null)
  // console.log(ExistingWards);
  

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
      const selectedZone = ExistingWards.find(
        (ward) => ward.ward_name === WardName
      );
      if (selectedZone) {
        setZoneId( selectedZone.zone_id);
      }
    }
  }, [WardName, ExistingWards]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      zone_id:zoneId,
      status: "inactive",
      created_by_user: "admin",
    };

    console.log(formData);

    try {
      const response = await axios.post(`${API}/street/post`, formData);

      if (response.status === 200) {
        toast.success("Street created Successfully");
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
          <h1 className="text-xl font-medium pt-10 pb-2">Add Street</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-5">
            <div className="mb-3">
              <label
                className="block text-gray-900 text-base font-normal mb-3"
                htmlFor="ward_name"
              >
                ward_name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="ward_name"
                {...register("ward_name")}
                onChange={(e) => setWardName(e.target.value)}
              >
                <option>Select Street</option>
                {ExistingWards.map((ward) => (
                  <option key={ward.ward_name} value={ward.ward_name}>
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
                placeholder="Add Street Name"
                {...register("street_name")}
              />
              {errors.street_name && (
                <p className="text-red-500">{errors.street_name.message}</p>
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

export default AddStreet;
