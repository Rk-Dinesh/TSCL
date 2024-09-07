import React,{useEffect} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { API } from "../../Host";
import decryptData from "../../Decrypt";
import SaveCancel from "../../components/SavaCancel";


const ComplaintSchema = yup.object().shape({
  complaint_type: yup.string().required("complaint_type is required"),
  status: yup
  .string()
  .test(
    "not-select",
    "Please select an Status",
    (value) => value !== "" && value !== "Status"
  ),
});

const EditComplaintType = (props) => {
const {comptId}= props;


const token = sessionStorage.getItem('token');
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(ComplaintSchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/complainttype/getbyid?compliant_type_id=${comptId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = decryptData(response.data.data); 
       
        
        setValue("complaint_type", data.complaint_type);
        setValue("status", data.status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [comptId, setValue]);

  const onSubmit = async (data) => {
   
    const formData = {
      ...data,
    };

    try {
      
      const response = await axios.post(`${API}/complainttype/update?compliant_type_id=${comptId}`, formData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });

      if (response.status === 200) { 
        toast.success(" created Successfully");
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
          <h1 className="text-xl font-medium pt-10 pb-2">Edit Complaint Type</h1>
        </div>
       
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-4">
            <label
              className="block text-gray-900 text-base font-normal mb-4"
              htmlFor="complaint_type"
            >
             Complaint Type
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
              id="complaint_type"
              type="text"
              placeholder="Complaint Type"
              {...register("complaint_type")}
            />
            {errors.complaint_type && (
              <p className="text-red-500">{errors.complaint_type.message}</p>
            )}
          </div>
          <div>
            <div className=" grid grid-cols-3 mx-10 my-4">
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
              <p className="text-red-500 text-xs text-center -mt-2 mb-2 ">
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

export default EditComplaintType;
