import React,{useEffect} from "react";
import axios from "axios";
import { API } from "../../../Host";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import decryptData from "../../../Decrypt";

const ZoneSchema = yup.object().shape({
  zone_name: yup.string().required("Zone_name is required"),
  status: yup
  .string()
  .test(
    "not-select",
    "Please select an Status",
    (value) => value !== "" && value !== "Status"
  ),
});

const EditZone = (props) => {
    const {zoneId} = props;
    const token = sessionStorage.getItem('token'); 
    
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(ZoneSchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/zone/getbyid?zone_id=${zoneId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = decryptData(response.data.data); 
        setValue("zone_name", data.zone_name);
        setValue("status", data.status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [zoneId, setValue]);


  const onSubmit = async (data) => {
   
    const formData = {
      ...data,
    };

    try {
      
      const response = await axios.post(`${API}/zone/update?zone_id=${zoneId}`, formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      if (response.status === 200) { 
        toast.success("Zone Updated Successfully");
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
      <div className="bg-white w-[522px] h-[340px]  font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Edit Zone</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-8 my-6">
            <label
              className="block text-gray-900 text-base font-normal mb-4"
              htmlFor="zone_name"
            >
              Zone Name
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="zone_name"
              type="text"
              placeholder="Zone Name"
              {...register("zone_name")}
            />
            {errors.zone_name && (
              <p className="text-red-500">{errors.zone_name.message}</p>
            )}
          </div>
          <div>
            <div className=" grid grid-cols-3 mx-10 my-6">
              <label
                className=" text-gray-900 text-base font-normal  col-span-1"
                htmlFor="status"
              >
                Status:
              </label>
              <select className="   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none"
              id="status"
               {...register("status")}
               >
                <option value="" hidden>Status</option>
                <option value="active">Active</option>
                <option value="inactive">InActive</option>
              </select>
            </div>
            {errors.status && (
              <p className="text-red-500 text-xs text-center -mt-4 mb-2 ">
                {errors.status.message}
              </p>
            )}
          </div>
          <div className="flex justify-end  mx-10 gap-5 ">
            <div
              className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
              onClick={props.toggleModal}
            >
              cancel
            </div>
            <button className=" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5"  type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditZone;
