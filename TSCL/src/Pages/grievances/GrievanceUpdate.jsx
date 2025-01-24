import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateGrievanceForm = () => {
  const [formData, setFormData] = useState({
    grievance_mode: "",
    dept_name: "",
    complaint: "",
    zone_name: "",
    ward_name: "",
    street_name: "",
    complaintaddress: "",
    complaint_details: "",
  });

  const [options, setOptions] = useState({
    grievanceModes: [],
    departments: [],
    complaints: [],
    zones: [],
    wards: [],
    streets: [],
  });

  // Fetch options for selects
  useEffect(() => {
    // Fetch options from APIs or hard-code them
    setOptions({
      grievanceModes: ["Online", "Offline"],
      departments: ["Sanitation", "Electricity", "Water"],
      complaints: ["Broken Streetlight", "Garbage Overflow", "Potholes"],
      zones: ["Zone 1", "Zone 2", "Zone 3"],
      wards: ["Ward A", "Ward B", "Ward C"],
      streets: ["Street 1", "Street 2", "Street 3"],
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `/update-grievance?grievance_id=your_grievance_id`,
        formData
      );
      alert("Grievance updated successfully");
      console.log(response.data);
    } catch (error) {
      console.error("Error updating grievance:", error);
      alert("Failed to update grievance");
    }
  };

  return (
    <div className="max-w-5xl mx-8  bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Update Grievance
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Grievance Mode
            </label>
            <select
              name="grievance_mode"
              value={formData.grievance_mode}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              {options.grievanceModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Department
            </label>
            <select
              name="dept_name"
              value={formData.dept_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              {options.departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Complaint
            </label>
            <select
              name="complaint"
              value={formData.complaint}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              {options.complaints.map((complaint) => (
                <option key={complaint} value={complaint}>
                  {complaint}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Zone
            </label>
            <select
              name="zone_name"
              value={formData.zone_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              {options.zones.map((zone) => (
                <option key={zone} value={zone}>
                  {zone}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Ward
            </label>
            <select
              name="ward_name"
              value={formData.ward_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              {options.wards.map((ward) => (
                <option key={ward} value={ward}>
                  {ward}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Street
            </label>
            <select
              name="street_name"
              value={formData.street_name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2"
            >
              <option value="">Select</option>
              {options.streets.map((street) => (
                <option key={street} value={street}>
                  {street}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Complaint Address
          </label>
          <textarea
            name="complaintaddress"
            value={formData.complaintaddress}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Complaint Details
          </label>
          <textarea
            name="complaint_details"
            value={formData.complaint_details}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          ></textarea>
        </div>
        <div className="flex gap-3 justify-center">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
        >
          Update 
        </button>
   
        </div>

       
      </form>
    </div>
  );
};

export default UpdateGrievanceForm;
