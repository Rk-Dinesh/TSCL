import React,{useEffect,useState} from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../Host";
import { toast } from "react-toastify";
import decryptData from "../../Decrypt";
import SaveCancel from "../../components/SavaCancel";

const AddEmployeeSchema = yup.object().shape({
    emp_name: yup.string().trim().required("Employee Name is required"),
    dept_name: yup.string().required("Department is required"),
   
    address: yup.string().required("Address is required"),
    dob: yup.string().required("DOB is required"),
    pincode: yup
      .string()
      .test("len", "Pincode must be 6 characters", (val) => val.length === 6)
      .required("Pincode is required"),
    designation: yup
      .string()
      .test(
        "not-select",
        "Please select a Designation",
        (value) => value !== "" && value !== "Designation"
      ),
  status: yup
  .string()
  .test(
    "not-select",
    "Please select an Status",
    (value) => value !== "" && value !== "Status"
  ),
});

const EditEmployee = (props) => {

  const { ExistingDesignation,ExistingDept,adminId } = props;
  const [deptName, setDeptName] = useState(null);
  const [roleName, setRoleName] = useState(null);
  const [roleId, setRoleId] = useState(null);
  
  
  const token = sessionStorage.getItem('token');

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(AddEmployeeSchema),
    mode: "all",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API}/employee/getbyid?emp_id=${adminId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        const data = decryptData(response.data.data); 
        
        
        setValue("emp_name", data.emp_name);
        setValue("dept_name", data.dept_name);
        setDeptName( data.dept_name);
        setValue("address", data.address);
        setValue("pincode", data.pincode);
        setValue('dob',data.dob);
        setRoleName( data.designation);
        setValue("designation_id",data.designation_id)
        setValue("designation", data.designation);
        setValue("status", data.status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [adminId, setValue]);


  const handleDesgnationChange = (event) => {
    const selectedDesginationName = event.target.value;
   

    const selectedDesgn = ExistingDesignation.find(
      (desg) => desg.designation === selectedDesginationName
    );
    setRoleId(selectedDesgn.desgination_id);
  };


  const onSubmit = async (data) => {
    const formData = {
      ...data,
      designation_id:roleId
     
    };

    try {
      const response = await axios.post(`${API}/employee/update?emp_id=${adminId}`, formData,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setDeptName(null)
        setRoleName(null)
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
    <div className="bg-white w-fit h-fit  font-lexend m-2">
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="border-b-2 border-gray-300 mx-10 my-5">
            <div className="grid grid-cols-3 gap-3">
              <label
                className="block text-black text-lg font-medium mb-2 col-span-1 whitespace-nowrap"
                htmlFor="emp_name"
              >
                Name:
              </label>
              <input
                type="text"
                id="emp_name"
                className="mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2"
                placeholder="Employee Name"
                {...register("emp_name")}
              />
            </div>
            {errors.emp_name && (
              <p className="text-red-500 text-xs text-end ">
                {errors.emp_name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 mx-10 my-1">
            <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className="text-black text-lg font-medium mb-2 col-span-2"
                  htmlFor="dept_name"
                >
                  Department:
                </label>
                <select
                  className="text-sm text-black border border-gray-900 rounded-lg border-none outline-none"
                  id="dept_name"
                  {...register("dept_name")}
                >
                  <option value={deptName}>{deptName}</option>
                  {ExistingDept.map((dept) => (
                    <option key={dept.dept_id} value={dept.dept_name}>
                      {dept.dept_name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.dept_name && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.dept_name.message}
                </p>
              )}
            </div>


            

            <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className="text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor="address"
                >
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  className="text-end outline-none col-span-2"
                  placeholder="Address"
                  {...register("address")}
                />
              </div>
              {errors.address && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.address.message}
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className="text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor="pincode"
                >
                  Pincode:
                </label>
                <input
                  type="text"
                  id="pincode"
                  className="text-end outline-none col-span-2"
                  placeholder="Pincode"
                  {...register("pincode")}
                />
              </div>
              {errors.pincode && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className="text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor="dob"
                >
                  Date of Birth :
                </label>
                <input
                  type="text"
                  id="dob"
                  className="text-end outline-none col-span-2"
                  placeholder="DOB"
                  {...register("dob")}
                />
              </div>
              {errors.dob && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.dob.message}
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-3">
                <label
                  className="text-black text-lg font-medium mb-2 col-span-2"
                  htmlFor="designation"
                >
                  Desgination :
                </label>
                <select
                  className="text-sm text-black border border-gray-900 rounded-lg border-none outline-none"
                  id="designation"
                  {...register("designation")}
                  onChange={handleDesgnationChange}
                >
                  <option value={roleName}>{roleName}</option>
                  {ExistingDesignation.map((desgn) => (
                    <option
                      key={desgn.designation_id}
                      value={desgn.designation}
                    >
                      {desgn.designation}
                    </option>
                  ))}
                </select>
              </div>
              {errors.designation && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.designation.message}
                </p>
              )}
            </div>

            <div className=" grid grid-cols-3 gap-3 ">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-2"
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
              {errors.status && (
              <p className="text-red-500 text-xs text-center mb-3 ">
                {errors.status.message}
              </p>
            )}
            </div>
          </div>
          <div className="py-6">
            <SaveCancel onCancel={props.toggleModal} />
          </div>
      </form>
    </div>
  </div>
  );
};

export default EditEmployee;
