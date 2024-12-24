import React, { useState } from "react";
import { API } from "../../Host";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RoleAccessLevelForm = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState("");
  const [accessLevels, setAccessLevels] = useState([]);
  const [features, setFeatures] = useState([
    { name: "Dashboard", value: "dashboard", checked: false },
    { name: "Organization", value: "organization", checked: false },
    { name: "Department", value: "department", checked: false },
    { name: "Zone", value: "zone", checked: false },
    { name: "Ward", value: "ward", checked: false },
    { name: "Street", value: "street", checked: false },
    { name: "Complaint", value: "complaint", checked: false },
    { name: "Complaint Type", value: "complainttype", checked: false },
    { name: "Designation", value: "designation", checked: false },
    { name: "Employee", value: "emp", checked: false },
    { name: "AdminUser", value: "admin", checked: false },
    { name: "PublicUser", value: "user", checked: false },
    { name: "Status", value: "status", checked: false },
    { name: "Setting", value: "setting", checked: false },
    { name: "Template", value: "template", checked: false },
    { name: "EnquiryResource", value: "enquiryresource", checked: false },
    { name: "Escalation", title: true },
    { name: "Escalation", value: "escalate", checked: false },
    { name: "Escalation Commissioner", value: "escalation", checked: false },
    { name: "Grievance", title: true }, // Title without value, checkbox, etc.
    { name: "SuperAdmin", value: "grievance", checked: false },
    { name: "Commissioner", value: "requestview4", checked: false },
    { name: "Department Admin", value: "requestview2", checked: false },
    { name: "Engineer", value: "requestview3", checked: false },
    { name: "Operator", value: "requestview1", checked: false },
  ]);

  const [errors, setErrors] = useState({
    roleName: "",
    featurePermissions: "",
  });

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handleFeatureChange = (index) => {
    const newFeatures = [...features];
    newFeatures[index].checked = !newFeatures[index].checked;

    if (newFeatures[index].checked) {
      setAccessLevels([
        ...accessLevels,
        { feature: newFeatures[index].value, permissions: [] },
      ]);
    } else {
      setAccessLevels(
        accessLevels.filter(
          (level) => level.feature !== newFeatures[index].value
        )
      );
    }

    setFeatures(newFeatures);
  };

  const handlePermissionChange = (index, permission) => {
    const newAccessLevels = [...accessLevels];
    const featureIndex = newAccessLevels.findIndex(
      (level) => level.feature === features[index].value
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
      (level) => level.feature === features[index].value
    );

    if (newAccessLevels[featureIndex].permissions.length === 5) {
      newAccessLevels[featureIndex].permissions = [];
    } else {
      newAccessLevels[featureIndex].permissions = [
        "view",
        "create",
        "edit",
        "delete",
        "download",
      ];
    }
    setAccessLevels(newAccessLevels);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;
    const newErrors = {
      roleName: "",
      featurePermissions: "",
    };

    // Validation for role name
    if (roleName.trim() === "") {
      newErrors.roleName = "Role name is required.";
      formIsValid = false;
    }

    // Validation for feature permissions
    accessLevels.forEach((level) => {
      if (level.permissions.length === 0) {
        newErrors.featurePermissions =
          "Please select at least one permission for each selected feature.";
        formIsValid = false;
      }
    });

    setErrors(newErrors);

    if (!formIsValid) {
      return;
    }

    const newAccessLevels = [...accessLevels];

    const roleAccessLevel = {
      role_name: roleName,
      accessLevels: newAccessLevels,
      status: "active",
      created_by_user: localStorage.getItem("name"),
    };

    try {
      const response = await axios.post(`${API}/role/post`, roleAccessLevel, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        toast.success("Role created Successfully");
        navigate("/setting");
      } else {
        console.error("Error in posting data", response);
        toast.error("Failed to Upload");
      }
    } catch (error) {
      console.error("Error in posting data", error);
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
              className="w-80 text-start border  rounded-lg ml-2 px-3 py-1 outline-none"
            />
          </div>
          {errors.roleName && (
            <p className="error mt-3 text-red-500">{errors.roleName}</p>
          )}
          <div className="mb-2">
            <h3 className="mt-6 mb-3 text-base text-primary ">
              Access Levels:
            </h3>
            {features.map((feature, index) => {
              if (feature.title) {
                return (
                  <div key={index} className=" flex gap-2 items-center mb-4">
                    <h3 className="text-base text-primary">{feature.name}</h3>
                    <p className="text-red-500 text-sm">
                      ( Select one option from the list )
                    </p>
                  </div>
                );
              }

              return (
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
                              .find(
                                (level) =>
                                  level.feature === features[index].value
                              )
                              ?.permissions.includes("view") || false
                          }
                          onChange={() => handlePermissionChange(index, "view")}
                        />
                        <label className="text-sm">View</label>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          value="create"
                          checked={
                            accessLevels
                              .find(
                                (level) =>
                                  level.feature === features[index].value
                              )
                              ?.permissions.includes("create") || false
                          }
                          onChange={() =>
                            handlePermissionChange(index, "create")
                          }
                        />
                        <label>Create</label>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          value="edit"
                          checked={
                            accessLevels
                              .find(
                                (level) =>
                                  level.feature === features[index].value
                              )
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
                              .find(
                                (level) =>
                                  level.feature === features[index].value
                              )
                              ?.permissions.includes("delete") || false
                          }
                          onChange={() =>
                            handlePermissionChange(index, "delete")
                          }
                        />
                        <label>Delete</label>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          value="download"
                          checked={
                            accessLevels
                              .find(
                                (level) =>
                                  level.feature === features[index].value
                              )
                              ?.permissions.includes("download") || false
                          }
                          onChange={() =>
                            handlePermissionChange(index, "download")
                          }
                        />
                        <label>Download</label>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <input
                          type="checkbox"
                          value="all"
                          checked={
                            accessLevels.find(
                              (level) => level.feature === features[index].value
                            )?.permissions.length === 5 || false
                          }
                          onChange={() => handleAllPermissionChange(index)}
                        />
                        <label>All</label>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            {errors.featurePermissions && (
              <p className="error text-center text-red-500">
                {errors.featurePermissions}
              </p>
            )}
          </div>

          <div className="flex justify-center mt-3 mb-6">
            <button
              type="submit"
              className="text-center px-3 py-1.5 bg-primary text-white rounded-full"
            >
              Save Role Access Level
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoleAccessLevelForm;
