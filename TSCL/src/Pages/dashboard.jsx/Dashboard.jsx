import React, { useState } from "react";
import { API } from "../../Host";
import axios from "axios";
import { toast } from "react-toastify";

const RoleAccessLevelForm = () => {
  const token = sessionStorage.getItem("token");
  const [roleName, setRoleName] = useState("");
  const [accessLevels, setAccessLevels] = useState([]);
  const [grievanceType, setGrievanceType] = useState("");
  const [grievancePermissions, setGrievancePermissions] = useState([]);
  const [features, setFeatures] = useState([
    { name: "Dashboard",value:"dashboard", checked: false },
    { name: "Department",value:"department", checked: false },
  ]);

  const [errors, setErrors] = useState({ roleName: "", featurePermissions: "", grievancePermissions: "" });

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleFeatureChange = (index) => {
    const newFeatures = [...features];
    newFeatures[index].checked = !newFeatures[index].checked;

    if (newFeatures[index].checked) {
      setAccessLevels([
        ...accessLevels,
        { feature: newFeatures[index].name, permissions: [] },
      ]);
    } else {
      setAccessLevels(
        accessLevels.filter(
          (level) => level.feature !== newFeatures[index].name
        )
      );
    }

    setFeatures(newFeatures);
  };

  const handlePermissionChange = (index, permission) => {
    const newAccessLevels = [...accessLevels];
    const featureIndex = newAccessLevels.findIndex(
      (level) => level.feature === features[index].name
    );

    if (newAccessLevels[featureIndex].permissions.includes(permission)) {
      newAccessLevels[featureIndex].permissions = newAccessLevels[
        featureIndex
      ].permissions.filter((p) => p !== permission);
    } else {
      newAccessLevels[featureIndex].permissions.push(permission);
    }
    setAccessLevels(newAccessLevels);
  };

  const handleAllPermissionChange = (index) => {
    const newAccessLevels = [...accessLevels];
    const featureIndex = newAccessLevels.findIndex(
      (level) => level.feature === features[index].name
    );

    if (newAccessLevels[featureIndex].permissions.length === 3) {
      newAccessLevels[featureIndex].permissions = [];
    } else {
      newAccessLevels[featureIndex].permissions = ["view", "edit", "delete"];
    }
    setAccessLevels(newAccessLevels);
  };

  const handleGrievanceTypeChange = (event) => {
    setGrievanceType(event.target.value);
    setGrievancePermissions([]);
  };

  const handleGrievancePermissionChange = (permission) => {
    if (grievancePermissions.includes(permission)) {
      setGrievancePermissions(
        grievancePermissions.filter((p) => p !== permission)
      );
    } else {
      setGrievancePermissions([...grievancePermissions, permission]);
    }
  };

  const handleAllGrievancePermissionChange = () => {
    if (grievancePermissions.length === 3) {
      setGrievancePermissions([]);
    } else {
      setGrievancePermissions(["view", "edit", "delete"]);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = { roleName: "", featurePermissions: "", grievancePermissions: "" };

    // Validation for role name
    if (roleName.trim() === "") {
      newErrors.roleName = "Role name is required.";
      formIsValid = false;
    }

    // Validation for feature permissions
    accessLevels.forEach((level) => {
      if (level.permissions.length === 0) {
        newErrors.featurePermissions = "Please select at least one permission for each selected feature.";
        formIsValid = false;
      }
    });

    // Validation for grievance type and permissions
    if (grievanceType !== "" && grievancePermissions.length === 0) {
      newErrors.grievancePermissions = "Please select at least one permission for the selected grievance type.";
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
    };

    console.log(roleAccessLevel);
    // try {
    //   const response = await axios.post(`${API}/roleaccess/post`, roleAccessLevel, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    //   if (response.status === 200) {
    //     toast.success("Role created Successfully");
    //   } else {
    //     console.error("Error in posting data", response);
    //     toast.error("Failed to Upload");
    //   }
    // } catch (error) {
    //   console.error("Error in posting data", error);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Role Name:</label>
        <input type="text" value={roleName} onChange={handleRoleNameChange} />
        {errors.roleName && <span className="error">{errors.roleName}</span>}
      </div>
      <div>
        <h3>Access Levels</h3>
        {features.map((feature, index) => (
          <div key={index}>
            <input
              type="checkbox"
              checked={feature.checked}
              onChange={() => handleFeatureChange(index)}
            />
            <label>{feature.name}</label>
            {feature.checked && (
              <div>
                <label>Permissions:</label>
                <input
                  type="checkbox"
                  value="view"
                  checked={
                    accessLevels.find(
                      (level) => level.feature === features[index].name
                    )?.permissions.includes("view") || false
                  }
                  onChange={() => handlePermissionChange(index, "view")}
                />
                <label>View</label>
                <input
                  type="checkbox"
                  value="edit"
                  checked={
                    accessLevels.find(
                      (level) => level.feature === features[index].name
                    )?.permissions.includes("edit") || false
                  }
                  onChange={() => handlePermissionChange(index, "edit")}
                />
                <label>Edit</label>
                <input
                  type="checkbox"
                  value="delete"
                  checked={
                    accessLevels.find(
                      (level) => level.feature === features[index].name
                    )?.permissions.includes("delete") || false
                  }
                  onChange={() => handlePermissionChange(index, "delete")}
                />
                <label>Delete</label>
                <input
                  type="checkbox"
                  value="all"
                  checked={
                    accessLevels.find(
                      (level) => level.feature === features[index].name
                    )?.permissions.length === 3 || false
                  }
                  onChange={() => handleAllPermissionChange(index)}
                />
                <label>All</label>
              </div>
            )}
          </div>
        ))}
        {errors.featurePermissions && (
          <span className="error">{errors.featurePermissions}</span>
        )}
      </div>
      <h3>Grievance Type</h3>
      <select value={grievanceType} onChange={handleGrievanceTypeChange}>
        <option value="">Select Grievance Type</option>
        <option value="grievance">Super Admin</option>
        <option value="viewrequest4">Commissioner</option>
        <option value="viewrequest3">Department Head</option>
        <option value="viewrequest2">Junior Engineer</option>
        <option value="viewrequest1">Operator</option>
      </select>
      {grievanceType && (
        <div>
          <h3>Grievance Permissions</h3>
          <label>Permissions:</label>
          <input
            type="checkbox"
            value="view"
            checked={grievancePermissions.includes("view")}
            onChange={() => handleGrievancePermissionChange("view")}
          />
          <label>View</label>
          <input
            type="checkbox"
            value="edit"
            checked={grievancePermissions.includes("edit")}
            onChange={() => handleGrievancePermissionChange("edit")}
          />
          <label>Edit</label>
          <input
            type="checkbox"
            value="delete"
            checked={grievancePermissions.includes("delete")}
            onChange={() => handleGrievancePermissionChange("delete")}
          />
          <label>Delete</label>
          <input
            type="checkbox"
            value="all"
            checked={grievancePermissions.length === 3}
            onChange={handleAllGrievancePermissionChange}
          />
          <label>All</label>
        </div>
      )}
      {errors.grievancePermissions && (
        <span className="error">{errors.grievancePermissions}</span>
      )}
      <button type="submit">Save Role Access Level</button>
    </form>
  );
};

export default RoleAccessLevelForm;
