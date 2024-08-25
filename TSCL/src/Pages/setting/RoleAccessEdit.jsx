import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { API } from "../../Host";
import decryptData from "../../Decrypt";

const RoleAccessLevelEdit = () => {
  const location = useLocation();
  const roleId = location.state?.role_id; // Use optional chaining in case location.state is undefined

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [accessLevels, setAccessLevels] = useState([]);
  const [grievanceType, setGrievanceType] = useState("");
  const [grievancePermissions, setGrievancePermissions] = useState([]);
  const [features, setFeatures] = useState([
    { name: "Dashboard", value: "dashboard", checked: false },
    { name: "Organization", value: "organization", checked: false },
    { name: "Department", value: "department", checked: false },
    { name: "Zone", value: "zone", checked: false },
    { name: "Ward", value: "ward", checked: false },
    { name: "Street", value: "street", checked: false },
    { name: "Complaint", value: "complaint", checked: false },
    { name: "Complaint Type", value: "complainttype", checked: false },
    { name: "AdminUser", value: "admin", checked: false },
    { name: "PublicUser", value: "user", checked: false },
    { name: "Setting", value: "setting", checked: false },
  ]);

  const [errors, setErrors] = useState({
    roleName: "",
    featurePermissions: "",
    grievancePermissions: "",
  });

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        const response = await axios.get(
          `${API}/role/getbyid?role_id=${roleId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const roleData = decryptData(response.data.data);
        if (response.status === 200) {
          setRoleName(roleData.role_name);
          setAccessLevels(roleData.accessLevels || []);
          setGrievanceType(roleData.grievanceType || "");
          setGrievancePermissions(roleData.grievancePermissions || []);
          const updatedFeatures = features.map((feature) => ({
            ...feature,
            checked: roleData.accessLevels.some(
              (level) => level.feature === feature.value
            ),
          }));
          setFeatures(updatedFeatures);
        } else {
          toast.error("Failed to fetch role data");
        }
      } catch (error) {
        console.error("Error fetching role data", error);
        toast.error("Error fetching role data");
      }
    };

    fetchRoleData();
  }, [roleId, token]);

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleFeatureChange = (index) => {
    const newFeatures = [...features];
    newFeatures[index].checked = !newFeatures[index].checked;

    if (newFeatures[index].checked) {
      setAccessLevels((prev) => [
        ...prev,
        { feature: newFeatures[index].value, permissions: [] },
      ]);
    } else {
      setAccessLevels((prev) =>
        prev.filter((level) => level.feature !== newFeatures[index].value)
      );
    }

    setFeatures(newFeatures);
  };

  const handlePermissionChange = (index, permission) => {
    const newAccessLevels = [...accessLevels];
    const featureIndex = newAccessLevels.findIndex(
      (level) => level.feature === features[index].value
    );

    if (featureIndex !== -1) {
      const permissions = newAccessLevels[featureIndex].permissions;
      if (permissions.includes(permission)) {
        newAccessLevels[featureIndex].permissions = permissions.filter(
          (p) => p !== permission
        );
      } else {
        newAccessLevels[featureIndex].permissions.push(permission);
      }
      setAccessLevels(newAccessLevels);
    }
  };

  const handleAllPermissionChange = (index) => {
    const newAccessLevels = [...accessLevels];
    const featureIndex = newAccessLevels.findIndex(
      (level) => level.feature === features[index].value
    );

    if (featureIndex !== -1) {
      newAccessLevels[featureIndex].permissions =
        newAccessLevels[featureIndex].permissions.length === 3
          ? []
          : ["view", "edit", "delete"];
      setAccessLevels(newAccessLevels);
    }
  };

  const handleGrievanceTypeChange = (event) => {
    setGrievanceType(event.target.value);
    setGrievancePermissions([]);
  };

  const handleGrievancePermissionChange = (permission) => {
    setGrievancePermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleAllGrievancePermissionChange = () => {
    setGrievancePermissions((prev) =>
      prev.length === 3 ? [] : ["view", "edit", "delete"]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = {
      roleName: "",
      featurePermissions: "",
      grievancePermissions: "",
    };

    if (roleName.trim() === "") {
      newErrors.roleName = "Role name is required.";
      formIsValid = false;
    }

    accessLevels.forEach((level) => {
      if (level.permissions.length === 0) {
        newErrors.featurePermissions =
          "Please select at least one permission for each selected feature.";
        formIsValid = false;
      }
    });

    if (grievanceType !== "" && grievancePermissions.length === 0) {
      newErrors.grievancePermissions =
        "Please select at least one permission for the selected grievance type.";
      formIsValid = false;
    }

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    const newAccessLevels = [...accessLevels];

    if (grievanceType) {
      newAccessLevels.push({
        feature: grievanceType,
        permissions: grievancePermissions,
      });
    }

    const roleAccessLevel = {
      role_name: roleName,
      accessLevels: newAccessLevels,
      status: "active",
      created_by_user: "admin", // Modify as needed
    };

    try {
      const response = await axios.post(
        `${API}/role/update?role_id=${roleId}`,
        roleAccessLevel,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Role updated successfully");
        navigate("/setting");
      } else {
        toast.error("Failed to update role");
      }
    } catch (error) {
      console.error("Error updating data", error);
      toast.error("Error updating role");
    }
  };

  return (
    <div className="md:mx-6 mx-1 my-3 font-lexend overflow-y-auto no-scrollbar bg-white rounded-lg">
      <div className="px-6 py-6 overflow-auto no-scrollbar">
        <form onSubmit={handleSubmit}>
          <div className="flex gap-6 text-base items-center ">
            <label>Role Name:</label>
            <input
              type="text"
              value={roleName}
              onChange={handleRoleNameChange}
              className="w-80 text-start border rounded-lg ml-2 px-3 py-1 outline-none"
            />
          </div>
          {errors.roleName && (
            <p className="error mt-3 text-red-500">{errors.roleName}</p>
          )}
          <div className="mb-2">
            <h3 className="mt-6 mb-3 text-base ">Access Levels:</h3>
            {features.map((feature, index) => (
              <div
                className="md:grid md:grid-cols-3 mb-3 text-base "
                key={index}
              >
                <div className="col-span-1 flex gap-3">
                  <input
                    type="checkbox"
                    checked={feature.checked}
                    onChange={() => handleFeatureChange(index)}
                  />
                  <label>{feature.name}</label>
                </div>
                {feature.checked && (
                  <div className="flex gap-3">
                    <div className="flex items-center gap-2 ">
                      <label className="mx-4 md:text-base text-sm ">
                        Permissions:
                      </label>
                      <input
                        type="checkbox"
                        value="view"
                        checked={
                          accessLevels
                            .find((level) => level.feature === feature.value)
                            ?.permissions.includes("view") || false
                        }
                        onChange={() => handlePermissionChange(index, "view")}
                      />
                      <label className="text-sm">View</label>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value="edit"
                        checked={
                          accessLevels
                            .find((level) => level.feature === feature.value)
                            ?.permissions.includes("edit") || false
                        }
                        onChange={() => handlePermissionChange(index, "edit")}
                      />
                      <label>Edit</label>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        value="delete"
                        checked={
                          accessLevels
                            .find((level) => level.feature === feature.value)
                            ?.permissions.includes("delete") || false
                        }
                        onChange={() => handlePermissionChange(index, "delete")}
                      />
                      <label>Delete</label>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={
                          accessLevels.find(
                            (level) => level.feature === feature.value
                          )?.permissions.length === 3
                        }
                        onChange={() => handleAllPermissionChange(index)}
                      />
                      <label>All</label>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          {errors.featurePermissions && (
            <p className="error text-red-500">{errors.featurePermissions}</p>
          )}
          <div className="mb-2">
            <h3 className="mt-6 mb-3 text-base ">Grievance Type:</h3>
            <select
              className="w-80 text-start border rounded-lg ml-2 px-3 py-1 outline-none"
              value={grievanceType}
              onChange={handleGrievanceTypeChange}
            >
              <option value="">Select Grievance Type</option>
              <option value="grievance">Super Admin</option>
              <option value="viewrequest4">Commissioner</option>
              <option value="viewrequest3">Department Head</option>
              <option value="viewrequest2">Junior Engineer</option>
              <option value="viewrequest1">Operator</option>
            </select>
          </div>
          {grievanceType && (
            <div className="mb-2">
              <h3 className="mt-6 mb-3 text-base">Permissions:</h3>
              <div className="flex gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={grievancePermissions.includes("view")}
                    onChange={() => handleGrievancePermissionChange("view")}
                  />
                  <label className="text-sm">View</label>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={grievancePermissions.includes("edit")}
                    onChange={() => handleGrievancePermissionChange("edit")}
                  />
                  <label>Edit</label>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={grievancePermissions.includes("delete")}
                    onChange={() => handleGrievancePermissionChange("delete")}
                  />
                  <label>Delete</label>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={grievancePermissions.length === 3}
                    onChange={handleAllGrievancePermissionChange}
                  />
                  <label>All</label>
                </div>
              </div>
            </div>
          )}
          {errors.grievancePermissions && (
            <p className="error text-red-500">{errors.grievancePermissions}</p>
          )}
          <div className="flex justify-center">
          <button
            type="submit"
            className="mt-6 px-4 py-2 bg-blue-500 text-white  rounded-lg"
          >
            Save Changes
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleAccessLevelEdit;
