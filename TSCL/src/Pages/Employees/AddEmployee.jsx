import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const AddEmployeeSchema = yup.object().shape({
  emp_name: yup.string().trim().required("Employee Name is required"),
  dept_name: yup.string().required("Department is required"),
  phone: yup
  .string()
  .matches(/^\d{10}$/, "Must be 10 digits and contain only numbers")
  .required("Phone Number is required"),
  email: yup
    .string()
    .email("Invalid Email Id")
    .required("Email Id is required"),
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
});

const AddEmployee = (props) => {
  const { ExistingDesignation, ExistingDept } = props;
  const [filterDesifnation, setFilterDesifnation] = useState([])
  const [selectedDesignId, setSelectedDesignId] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({
    resolver: yupResolver(AddEmployeeSchema),
    mode: "all",
  });

  const departName = watch('dept_name');

  useEffect(() => {
    if (departName) {
    const filtered = ExistingDesignation.filter((desg)=> desg.dept_name === departName);
    setFilterDesifnation(filtered)
    } else {
      setFilterDesifnation([]);
      setSelectedDesignId('')
    }
  }, [departName]);

  const handleDesgnationChange = (event) => {
    const selectedDesginationName = event.target.value;

    const selectedDesgn = ExistingDesignation.find(
      (desg) => desg.designation === selectedDesginationName
    );
    setSelectedDesignId(selectedDesgn.desgination_id);
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      status: "active",
      created_by_user: localStorage.getItem("name"),
      designation_id: selectedDesignId,
    };

    try {
      const response = await axios.post(
        API_ENDPOINTS.POST_EMPLOYEE.url,
        formData,
        {
          headers: API_ENDPOINTS.POST_EMPLOYEE.headers,
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
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
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex  justify-center items-center">
      <div className="bg-white w-fit h-fit font-lexend m-2">
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
                  <option value=""> Select Department</option>
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
                  <option value="">Select Designation</option>
                  {filterDesifnation && filterDesifnation.map((desgn, index) => (
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
                  htmlFor="phone"
                >
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  className="w-6/5 text-end outline-none col-span-2"
                  placeholder="Phone Number"
                  {...register("phone")}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className="text-black text-lg font-medium mb-2 col-span-1"
                  htmlFor="email"
                >
                  Email Id:
                </label>
                <input
                  type="email"
                  id="email"
                  className="text-end outline-none col-span-2"
                  placeholder="abc@gmail.com"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.email.message}
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

           
          </div>

          <div className="py-6">
            <SaveCancel onCancel={props.toggleModal} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployee;
