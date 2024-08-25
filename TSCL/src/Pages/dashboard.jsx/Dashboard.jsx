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
    { name: "Dashboard", checked: false },
    { name: "Department", checked: false },
  ]);

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleFeatureChange = (index) => {
    const newFeatures = [...features];
    newFeatures[index].checked = !newFeatures[index].checked;
    setFeatures(newFeatures);
  };

  const handlePermissionChange = (index, permission) => {
    const newAccessLevels = [...accessLevels];
    if (newAccessLevels[index].permissions.includes(permission)) {
      newAccessLevels[index].permissions = newAccessLevels[
        index
      ].permissions.filter((p) => p !== permission);
    } else {
      newAccessLevels[index].permissions.push(permission);
    }
    setAccessLevels(newAccessLevels);
  };

  const handleAllPermissionChange = (index) => {
    const newAccessLevels = [...accessLevels];
    if (newAccessLevels[index].permissions.length === 3) {
      newAccessLevels[index].permissions = [];
    } else {
      newAccessLevels[index].permissions = ["view", "edit", "delete"];
    }
    setAccessLevels(newAccessLevels);
  };

  const handleGrievanceTypeChange = (event) => {
    setGrievanceType(event.target.value);
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
    const newAccessLevels = [...accessLevels];
    features.forEach((feature) => {
      if (feature.checked) {
        newAccessLevels.push({
          feature: feature.name,
          permissions: [],
        });
      }
    });
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
    //     // props.toggleModal();
    //     // props.handlerefresh();
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
                    accessLevels[index] &&
                    accessLevels[index].permissions.includes("view")
                  }
                  onChange={(event) => handlePermissionChange(index, "view")}
                />
                <label>View</label>
                <input
                  type="checkbox"
                  value="edit"
                  checked={
                    accessLevels[index] &&
                    accessLevels[index].permissions.includes("edit")
                  }
                  onChange={(event) => handlePermissionChange(index, "edit")}
                />
                <label>Edit</label>
                <input
                  type="checkbox"
                  value="delete"
                  checked={
                    accessLevels[index] &&
                    accessLevels[index].permissions.includes("delete")
                  }
                  onChange={(event) => handlePermissionChange(index, "delete")}
                />
                <label>Delete</label>
                <input
                  type="checkbox"
                  value="all"
                  checked={
                    accessLevels[index] &&
                    accessLevels[index].permissions.length === 3
                  }
                  onChange={(event) => handleAllPermissionChange(index)}
                />
                <label>All</label>
              </div>
            )}
          </div>
        ))}
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
      <div>
        <h3>Grievance Permissions</h3>
        <label>Permissions:</label>
        <input
          type="checkbox"
          value="view"
          checked={grievancePermissions.includes("view")}
          onChange={(event) => handleGrievancePermissionChange("view")}
        />
        <label>View</label>
        <input
          type="checkbox"
          value="edit"
          checked={grievancePermissions.includes("edit")}
          onChange={(event) => handleGrievancePermissionChange("edit")}
        />
        <label>Edit</label>
        <input
          type="checkbox"
          value="delete"
          checked={grievancePermissions.includes("delete")}
          onChange={(event) => handleGrievancePermissionChange("delete")}
        />
        <label>Delete</label>
        <input
          type="checkbox"
          value="all"
          checked={grievancePermissions.length === 3}
          onChange={(event) => handleAllGrievancePermissionChange()}
        />
        <label>All</label>
      </div>
      <button type="submit">Save Role Access Level</button>
    </form>
  );
};

export default RoleAccessLevelForm;
