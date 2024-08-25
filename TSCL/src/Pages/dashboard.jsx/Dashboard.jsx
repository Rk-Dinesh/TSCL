import React, { useState } from 'react';
import { API } from '../../Host';
import axios from 'axios';
import { toast } from "react-toastify";

const RoleAccessLevelForm = () => {
    const token = sessionStorage.getItem('token');
  const [roleName, setRoleName] = useState('');
  const [accessLevels, setAccessLevels] = useState([
    {
      feature: 'dashboard',
      permissions: []
    },
    {
      feature: 'organization',
      permissions: []
    },
    {
      feature: 'department',
      permissions: []
    },
    {
      feature: 'zone',
      permissions: []
    },
    {
      feature: 'ward',
      permissions: []
    },
    {
      feature: 'street',
      permissions: []
    },
    {
      feature: 'complaint',
      permissions: []
    },
    {
      feature: 'complainttype',
      permissions: []
    },
    {
      feature: 'admin',
      permissions: []
    },
    {
      feature: 'user',
      permissions: []
    },
    {
      feature: 'setting',
      permissions: []
    },
  ]);

  const [grievanceType, setGrievanceType] = useState('');
  const [grievancePermissions, setGrievancePermissions] = useState([]);

  const handleRoleNameChange = (event) => {
    setRoleName(event.target.value);
  };

  const handlePermissionChange = (event, index) => {
    const newAccessLevels = [...accessLevels];
    if (event.target.checked) {
      newAccessLevels[index].permissions.push(event.target.value);
    } else {
      newAccessLevels[index].permissions = newAccessLevels[index].permissions.filter((permission) => permission !== event.target.value);
    }
    setAccessLevels(newAccessLevels);
  };

  const handleAllPermissionChange = (event, index) => {
    const newAccessLevels = [...accessLevels];
    if (event.target.checked) {
      newAccessLevels[index].permissions = ['view', 'edit', 'delete'];
    } else {
      newAccessLevels[index].permissions = [];
    }
    setAccessLevels(newAccessLevels);
  };

  const handleGrievanceTypeChange = (event) => {
    setGrievanceType(event.target.value);
  };

  const handleGrievancePermissionChange = (event) => {
    if (event.target.checked) {
      setGrievancePermissions([...grievancePermissions, event.target.value]);
    } else {
      setGrievancePermissions(grievancePermissions.filter((permission) => permission !== event.target.value));
    }
  };

  const handleAllGrievancePermissionChange = (event) => {
    if (event.target.checked) {
      setGrievancePermissions(['view', 'edit', 'delete']);
    } else {
      setGrievancePermissions([]);
    }
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    const newAccessLevels = [...accessLevels];
    newAccessLevels.push({
      feature: grievanceType,
      permissions: grievancePermissions
    });
    const roleAccessLevel = {
      role_name: roleName,
      accessLevels: newAccessLevels
    };
    console.log(roleAccessLevel);
    try {
        
        const response = await axios.post(`${API}/roleaccess/post`, roleAccessLevel,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
  
        if (response.status === 200) {
          toast.success("Role created Successfully");
        //   props.toggleModal();
        //   props.handlerefresh();
        } else {
          console.error("Error in posting data", response);
          toast.error("Failed to Upload");
        }
      } catch (error) {
        console.error("Error in posting data", error);
      }

  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Role Name:</label>
        <input type="text" value={roleName} onChange={handleRoleNameChange} />
      </div>
      <div>
        <h3>Access Levels</h3>
        {accessLevels.map((accessLevel, index) => (
          <div key={index}>
            <h4>{accessLevel.feature}</h4>
            <label>Permissions:</label>
            <input type="checkbox" value="view" checked={accessLevel.permissions.includes('view')} onChange={(event) => handlePermissionChange(event, index)} />
            <label>View</label>
            <input type="checkbox" value="edit" checked={accessLevel.permissions.includes('edit')} onChange={(event) => handlePermissionChange(event, index)} />
            <label>Edit</label>
            <input type="checkbox" value="delete" checked={accessLevel.permissions.includes('delete')} onChange={(event) => handlePermissionChange(event, index)} />
            <label>Delete</label>
            <input type="checkbox" value="all" checked={accessLevel.permissions.length === 3} onChange={(event) => handleAllPermissionChange(event, index)} />
            <label>All</label>
          </div>
        ))}
      </div>
      <div>
        <h3>Grievance Type</h3>
        <select value={grievanceType} onChange={handleGrievanceTypeChange}>
          <option value="">Select Grievance Type</option>
          <option value="grievance">Super Admin</option>
          <option value="viewrequest4">Commissioner</option>
          <option value="viewrequest3">Department Head</option>
          <option value="viewrequest2">Junior Engineer</option>
          <option value="viewrequest1">Operator</option>
        </select>
      </div>
      <div>
        <h3>Grievance Permissions</h3>
        <label>Permissions:</label>
        <input type="checkbox" value="view" checked={grievancePermissions.includes('view')} onChange={handleGrievancePermissionChange} />
        <label>View</label>
        <input type="checkbox" value="edit" checked={grievancePermissions.includes('edit')} onChange={handleGrievancePermissionChange} />
        <label>Edit</label>
        <input type="checkbox" value="delete" checked={grievancePermissions.includes('delete')} onChange={handleGrievancePermissionChange} />
        <label>Delete</label>
        <input type="checkbox" value="all" checked={grievancePermissions.length === 3} onChange={handleAllGrievancePermissionChange} />
        <label>All</label>
      </div>
      <button type="submit">Save Role Access Level</button>
    </form>
  );
};

export default RoleAccessLevelForm;