import React, { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import SaveCancel from "../../components/SavaCancel";
import API_ENDPOINTS from "../../ApiEndpoints/api/ApiClient";

const AddAdminSchema = yup.object().shape({
  user_name: yup.string().trim().required("User Name is required"),
  dept_name: yup.string().required("Department is required"),
  designation: yup.string().required("designation is required"),
  phone: yup
    .string()
    .test(
      "len",
      "Phone Number must be 10 characters",
      (val) => val.length === 10
    )
    .required("Phone Number is required"),
  email: yup
    .string()
    .email("Invalid Email Id")
    .required("Email Id is required"),
  address: yup.string().required("Address is required"),

  pincode: yup
    .string()
    .test("len", "Pincode must be 6 characters", (val) => val.length === 6)
    .required("Pincode is required"),
  role: yup
    .string()
    .test(
      "not-select",
      "Please select a Role",
      (value) => value !== "" && value !== "Role"
    ),
  zone_name: yup.string().optional(),
  ward_name: yup.array().of(yup.string()).nullable().default([]),
});

const AddAdmin = (props) => {
  const { ExistingRoles, ExistingEmployees, isZone, isWard } = props;
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [filteredWards, setFilteredWards] = useState([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(AddAdminSchema),
    mode: "all",
    register: {
      ward_name: {
        multiple: true,
      },
    },
  });

  const zoneName = watch("zone_name");

  useEffect(() => {
    if (zoneName) {
      const filteredWards = isWard?.filter(
        (ward) => ward.zone_name === zoneName
      );
      setFilteredWards(filteredWards || []);
      setValue("ward_name", "");
    } else {
      setFilteredWards([]);
    }
  }, [zoneName, isWard]);

  const handleEmployeeChange = (event) => {
    const selectedEmployeeName = event.target.value;
    const selectedEmployee = ExistingEmployees.find(
      (emp) => emp.emp_name === selectedEmployeeName
    );

    if (selectedEmployee) {
      setSelectedRoleId("");
      setValue("dept_name", selectedEmployee.dept_name);
      setValue("designation", selectedEmployee.designation);
      setValue("phone", selectedEmployee.phone);
      setValue("email", selectedEmployee.email);
      setValue("address", selectedEmployee.address);
      setValue("pincode", selectedEmployee.pincode);
    }
  };

  const handleRoleChange = (event) => {
    const selectedRoleName = event.target.value;
    const selectedRole = ExistingRoles.find(
      (role) => role.role_name === selectedRoleName
    );
    setSelectedRoleId(selectedRole ? selectedRole.role_id : "");
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      status: "active",
      created_by_user: localStorage.getItem("name"),
      role_id: selectedRoleId,
    };

    try {
      const response = await axios.post(
        API_ENDPOINTS.POST_ADMIN.url,
        formData,
        {
          headers: API_ENDPOINTS.POST_ADMIN.headers,
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
                className="block text-black text-base font-medium mb-2 col-span-2 whitespace-nowrap"
                htmlFor="user_name"
              >
                Name:
              </label>
              <select
                className="text-sm text-black border border-gray-900 rounded-lg border-none outline-none"
                id="user_name"
                {...register("user_name")}
                onChange={handleEmployeeChange}
              >
                <option value="">Employee Name</option>
                {ExistingEmployees.map((emp, index) => (
                  <option key={index} value={emp.emp_name}>
                    {emp.emp_name}
                  </option>
                ))}
              </select>
            </div>
            {errors.user_name && (
              <p className="text-red-500 text-xs text-end ">
                {errors.user_name.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 mx-10 ">
            <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className="text-black text-base font-medium mb-2 col-span-1"
                  htmlFor="dept_name"
                >
                  Department:
                </label>
                <input
                  type="text"
                  id="dept_name"
                  className="w-6/5 text-end outline-none col-span-2"
                  placeholder="Department "
                  {...register("dept_name")}
                  disabled
                />
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
                  className="text-black text-base font-medium mb-2 col-span-1"
                  htmlFor="designation"
                >
                  Designation:
                </label>
                <input
                  type="text"
                  id="designation"
                  className="w-6/5 text-end outline-none col-span-2"
                  placeholder="Designation "
                  {...register("designation")}
                  disabled
                />
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
                  className="text-black text-base font-medium mb-2 col-span-1"
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
                  disabled
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
                  className="text-black text-base font-medium mb-2 col-span-1"
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
                  disabled
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
                  className="text-black text-base font-medium mb-2 col-span-1"
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
                  disabled
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
                  className="text-black text-base font-medium mb-2 col-span-1"
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
                  disabled
                />
              </div>
              {errors.pincode && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.pincode.message}
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-3">
                <label
                  className="text-black text-base font-medium mb-2 col-span-2"
                  htmlFor="role"
                >
                  Role:
                </label>
                <select
                  className="text-sm text-black border border-gray-900 rounded-lg border-none outline-none"
                  id="role"
                  {...register("role")}
                  onChange={handleRoleChange}
                >
                  <option value="">Role</option>
                  {ExistingRoles.map((role, index) => (
                    <option key={index} value={role.role_name}>
                      {role.role_name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.role && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.role.message}
                </p>
              )}
            </div>

            <p className="text-gray-500 my-1">Auto Assign Options :</p>

            <div>
              <div className="grid grid-cols-3">
                <label
                  className="text-black text-base font-medium mb-2 col-span-2"
                  htmlFor="zone_name"
                >
                  Zone:
                </label>
                <select
                  className="text-sm text-black border border-gray-900 rounded-lg border-none outline-none"
                  id="zone_name"
                  {...register("zone_name")}
                >
                  <option value="">Zone</option>
                  {isZone.map((zones, index) => (
                    <option key={index} value={zones.zone_name}>
                      {zones.zone_name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.zone_name && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.zone_name.message}
                </p>
              )}
            </div>

            <div>
              <div className="grid grid-cols-3">
                <label
                  className="text-black text-base font-medium mb-2 col-span-2"
                  htmlFor="ward_name"
                >
                  Ward:
                </label>
                <select
                  className="text-sm text-black border border-gray-900 rounded-lg border-none outline-none"
                  id="ward_name"
                  {...register("ward_name")}
                  multiple
                  size={4}
                >
                  <option disabled>Ward Name</option>
                  {filteredWards.map((wards, index) => (
                    <option
                      key={index}
                      value={wards.ward_name}
                      className="my-0.5 "
                    >
                      {wards.ward_name}
                    </option>
                  ))}
                </select>
              </div>
              {errors.ward_name && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.ward_name.message}
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

export default AddAdmin;
