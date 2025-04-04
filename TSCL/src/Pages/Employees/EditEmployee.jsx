import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import decryptData from "../../Decrypt";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

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
  const { ExistingDesignation, ExistingDept, adminId } = props;
  const [deptName, setDeptName] = useState(null);
  const [roleName, setRoleName] = useState("");
  const [roleId, setRoleId] = useState(null);
  const [filterDesifnation, setFilterDesifnation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const departName = watch("dept_name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const GETBYID_EMPLOYEE = API_ENDPOINTS.FETCH_EMPLOYEE(adminId);
        const response = await axios.get(GETBYID_EMPLOYEE.url, {
          headers: GETBYID_EMPLOYEE.headers,
        });
        const data = decryptData(response.data.data);

        setValue("emp_name", data.emp_name);
        setValue("dept_name", data.dept_name);
        setDeptName(data.dept_name);
        setValue("address", data.address);
        setValue("pincode", data.pincode);
        setValue("dob", data.dob);
        setRoleName(data.designation);
        setValue("designation_id", data.designation_id);
        setRoleId(data.designation_id);
        setValue("designation", data.designation);
        setValue("status", data.status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [adminId, setValue]);

  useEffect(() => {
    if (departName) {
      const filtered = ExistingDesignation.filter(
        (desg) => desg.dept_name === departName
      );
      setFilterDesifnation(filtered);
    }
  }, [departName, ExistingDesignation]);

  const handleDeptchange = (event) => {
    const newDeptName = event.target.value;
    setValue("dept_name", newDeptName);
    setDeptName(newDeptName);
    setRoleId(null);
    setRoleName("");
    setValue("designation", "");
  };

  const handleDesgnationChange = (event) => {
    const selectedDesginationName = event.target.value;

    const selectedDesgn = filterDesifnation.find(
      (desg) => desg.designation === selectedDesginationName
    );

    setRoleId(selectedDesgn.desgination_id);
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      designation_id: roleId,
    };

    try {
      setIsLoading(true)
      const UPDATE_EMPLOYEE = API_ENDPOINTS.UPDATE_EMPLOYEE(adminId);
      const response = await axios.post(UPDATE_EMPLOYEE.url, formData, {
        headers: UPDATE_EMPLOYEE.headers,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setIsLoading(false)
        setDeptName(null);
        setRoleName(null);
        setRoleId(null);
        props.toggleModal();
        props.handlerefresh();
      } else {
        console.error("Error in posting data", response);
        setIsLoading(false)
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
      setIsLoading(false)
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
                  onChange={handleDeptchange}
                >
                  <option value={deptName} className="text-gray-500">
                    {deptName}
                  </option>
                  {ExistingDept.map((dept, index) => (
                    <option key={index} value={dept.dept_name}>
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
                  <option value={roleName} className="text-gray-500">
                    {roleName === "" ? "select Designation" : roleName}
                  </option>
                  {filterDesifnation &&
                    filterDesifnation.map((desgn, index) => (
                      <option key={index} value={desgn.designation}>
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
                  type="date"
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

            <div className=" grid grid-cols-3 gap-3 ">
              <label
                className=" text-black text-lg font-medium mb-2 col-span-2"
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
          <div className="py-6">
            <SaveCancel onCancel={props.toggleModal} isLoading={isLoading}/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEmployee;
