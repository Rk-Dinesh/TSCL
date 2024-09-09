import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import axios from "axios";
import { API } from "../../Host";
import { toast } from "react-toastify";
import decryptData from "../../Decrypt";
import SaveCancel from "../../components/SavaCancel";

const AddAdminSchema = yup.object().shape({
  user_name: yup.string().required("User Name is required"),
  dept_name: yup.string().required("Department is required"),
  //   phone: yup.string().required("Phone Number is required"),
  //   email: yup.string().required("Email Id  is required"),
  address: yup.string().required("Address is required"),
  //   login_password: yup.string().required("password is required"),
  pincode: yup.string().required("Pincode is required"),
  status: yup
    .string()
    .test(
      "not-select",
      "Please select an Status",
      (value) => value !== "" && value !== "Status"
    ),
  role: yup
    .string()
    .test(
      "not-select",
      "Please select an Role",
      (value) => value !== "" && value !== "Role"
    ),
});

const EditAdmin = (props) => {
  const { ExistingRoles, adminId, isZone, isWard } = props;
  const [wardName, setWardName] = useState(null);
  const [roleName, setRoleName] = useState(null);
  const [roleId, setRoleId] = useState(null);
  const [filteredWards, setFilteredWards] = useState([]);
  const [zoneNames, setZoneNames] = useState([]);

  const token = sessionStorage.getItem("token");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(AddAdminSchema),
    mode: "all",
  });

  const handleChangeZone = (event) => {
    if (event) {
      const selectedward = event.target.value;
      const filteredWards = isWard?.filter(
        (ward) => ward.zone_name === selectedward
      );
      setFilteredWards(filteredWards);
      setValue("ward_name", []);
      setWardName("");
    } else {
      setFilteredWards([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API}/user/getbyid?user_id=${adminId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = decryptData(response.data.data);

        setValue("user_name", data.user_name);
        setValue("dept_name", data.dept_name);
        setValue("address", data.address);
        setValue("pincode", data.pincode);
        setRoleName(data.role);
        setValue("role", data.role);
        setRoleId(data.role_id);
        setValue("status", data.status);
        setValue("zone_name", data.zone_name);
        setZoneNames(data.zone_name);
        setValue("ward_name", data.ward_name);
        setWardName(data.ward_name);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [adminId, setValue]);

  const onRoleChange = (event) => {
    setRoleId(null)
    const selectedRoleName = event.target.value;
    const role = ExistingRoles.find(
      (role) => role.role_name === selectedRoleName
    );
    if (role) {
      setRoleId(role.role_id);
    }
  };

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      role_id: roleId,
    };

     //console.log(formData);
  
    try {
      const response = await axios.post(
        `${API}/user/update?user_id=${adminId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success(response.data.message);
        setRoleName(null);
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
            <div className=" grid grid-cols-3 gap-3">
              <label
                className="block text-black text-base font-medium mb-2 col-span-1 whitespace-nowrap"
                htmlFor="user_name"
              >
                Name :
              </label>
              <input
                type="text"
                id="user_name"
                className="mx-2 font-lexend px-2 text-sm text-end outline-none col-span-2"
                placeholder="User Name"
                {...register("user_name")}
              />
            </div>
            {errors.user_name && (
              <p className="text-red-500 text-xs text-end ">
                {errors.user_name.message}
              </p>
            )}
          </div>

          <div className=" flex flex-col gap-3 mx-10 my-1 ">
            <div>
              <div className="grid grid-cols-3 gap-3">
                <label
                  className=" text-black text-base font-medium mb-2 col-span-1"
                  htmlFor="dept_name"
                >
                  Department :
                </label>
                <input
                  type="text"
                  id="dept_name"
                  className="w-6/5 text-end outline-none col-span-2"
                  placeholder=" Department Name"
                  {...register("dept_name")}
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
                  className=" text-black text-base font-medium mb-2 col-span-1"
                  htmlFor="address"
                >
                  Address :
                </label>
                <input
                  type="text"
                  id="address"
                  className=" text-end outline-none col-span-2"
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
                  className=" text-black text-base font-medium mb-2 col-span-1"
                  htmlFor="pincode"
                >
                  Pincode :
                </label>
                <input
                  type="text"
                  id="pincode"
                  className=" text-end outline-none col-span-2"
                  placeholder="Pincode "
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
              <div className=" grid grid-cols-3">
                <label
                  className=" text-black text-base font-medium mb-2 col-span-2"
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
              </div>
              {errors.status && (
                <p className="text-red-500 text-xs text-end ">
                  {errors.status.message}
                </p>
              )}
            </div>

            <div>
              <div className=" grid grid-cols-3">
                <label
                  className=" text-black text-base font-medium mb-2 col-span-2"
                  htmlFor="role"
                >
                  Role:
                </label>
                <select
                  className="   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none"
                  id="role"
                  {...register("role")}
                  onChange={onRoleChange}
                >
                  <option value={roleName} hidden>
                    {roleName}
                  </option>
                  {ExistingRoles.map((role) => (
                    <option key={role.role_name} value={role.role_name}>
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

            <p className="text-gray-500">Auto Assign Options : </p>
            <p className="text-sm text-red-500 -mt-2">
              Note:{" "}
              <span className="text-xs text-gray-500">
                if zone value is altered,compulsory to select wards for auto
                assign
              </span>
            </p>

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
                  onChange={handleChangeZone}
                >
                  <option value={zoneNames} disabled>{zoneNames}</option>
                  {isZone.map((zones) => (
                    <option key={zones.zone_id} value={zones.zone_name}>
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
                  className="text-sm text-black border border-gray-900 rounded-lg border-none outline-none col-span-1 "
                  id="ward_name"
                  {...register("ward_name")}
                  multiple
                  size={5}
                >
                  {wardName &&
                    wardName.map((ward, index) => (
                      <option key={index} value={ward} disabled>
                        {ward}
                      </option>
                    ))}
                  {filteredWards.map((wards) => (
                    <option
                      key={wards.ward_id}
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

export default EditAdmin;
