import React,{useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import decryptData from "../../Decrypt";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const OrganizationSchema = yup.object().shape({
  org_name: yup.string().required("Organization is required"),
    status: yup
  .string()
  .test(
    "not-select",
    "Please select an Status",
    (value) => value !== "" && value !== "Status"
  ),
});

const EditOrganization = (props) => {
    const { orgId } = props

    const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
      setValue,
    } = useForm({
      resolver: yupResolver(OrganizationSchema),
      mode: "all",
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const GETBYID = API_ENDPOINTS.FETCH_ORGANIZATION(orgId)
          const response = await axios.get(GETBYID.url, {
            headers:GETBYID.headers
          });
          const data = decryptData(response.data.data); 
          setValue("org_name", data.org_name);
          setValue("status", data.status);
        } catch (error) {
          console.error("Error fetching data", error);
        }
      };
      fetchData();
    }, [orgId, setValue]);
  
    const onSubmit = async (data) => {
      const token = sessionStorage.getItem('token');
      const formData = {
        ...data,
      };
  
      try {
        const UPDATEORGANIZATION = API_ENDPOINTS.UPDATE_ORGANIZATION(orgId)
        const response = await axios.post(UPDATEORGANIZATION.url, formData, {
          headers: UPDATEORGANIZATION.headers
        });
  
        if (response.status === 200) {
          toast.success("Org Updated Successfully");
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
      <div className="bg-white w-[522px] h-[358px]  font-lexend m-2 ">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-10 pb-2">Edit Organization</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-8 my-6">
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
              placeholder=" Organization Name"
              {...register("org_name")}
            />
            {errors.org_name && (
              <p className="text-red-500">{errors.org_name.message}</p>
            )}
          </div>
          <div>
            <div className=" grid grid-cols-3 mx-10 my-8">
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

          <SaveCancel onCancel={props.toggleModal} />
        </form>
      </div>
    </div>
  );
};

export default EditOrganization;
