import React,{useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../Host";

import decryptData from "../../Decrypt";


const RoleSchema = yup.object().shape({
  role_name: yup.string().required("Role_name is required"),
  status: yup
  .string()
  .test(
    "not-select",
    "Please select an Status",
    (value) => value !== "" && value !== "Status"
  ),
});

const EditRole = (props) => {

    const {roleId} = props;
    // console.log(roleId);
    
    const token = sessionStorage.getItem('token');

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(RoleSchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/role/getbyid?role_id=${roleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = decryptData(response.data.data);
       
         
        setValue("role_name", data.role_name);
        setValue("status", data.status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [roleId, setValue]);

  const onSubmit = async (data) => {
   
    const formData = {
      ...data,
      
    };

    try {
      
      const response = await axios.post(`${API}/role/update?role_id=${roleId}`, formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      if (response.status === 200) { 
        toast.success("Role Updated Successfully");
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
      <div className="bg-white w-[522px] h-[330px]  font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-6 pb-2">Edit Role</h1>
        </div>
       
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-6">
            <label
              className="block text-gray-900 text-base font-normal mb-4"
              htmlFor="role_name"
            >
              Role Name
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="role_name"
              type="text"
              placeholder="Role Name"
              {...register("role_name")}
            />
            {errors.role_name && (
              <p className="text-red-500">{errors.role_name.message}</p>
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
                <option value="">Status</option>
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

export default EditRole;