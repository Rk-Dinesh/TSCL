import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../Host";

const OrganizationSchema = yup.object().shape({
  org_name: yup.string().required("Organization is required"),
});

const AddOrganization = (props) => {

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(OrganizationSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
   
    const formData = {
      ...data,
      status:"inactive",
      created_by_user:"admin"
    };

    try {
      const response = await axios.post(`${API}/organization/post`, formData);

      if (response.status === 200) { 
        toast.success("Org created Successfully");
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
      <div className="bg-white w-[522px] h-[358px]  font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Add Organization</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-10">
            <label
              className="block text-gray-900 text-base font-normal mb-4"
              htmlFor="org_name"
            >
              Organization Name
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="org_name"
              type="text"
              placeholder="Add Organization Name"
              {...register("org_name")}
            />
            {errors.org_name && (
              <p className="text-red-500">{errors.org_name.message}</p>
            )}
          </div>
          <div className="flex justify-end  mx-10 gap-5 ">
            <button
              className="border border-primary text-primary bg-none font-lexend rounded-3xl px-5 py-1.5"
              onClick={props.toggleModal}
            >
              cancel
            </button>
            <button className=" text-white bg-primary font-lexend rounded-3xl px-5 py-1.5"  type="submit">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOrganization;
