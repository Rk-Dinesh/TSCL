import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import decryptData from '../../Decrypt';
import SaveCancel from '../../components/SavaCancel';
import API_ENDPOINTS from '../../ApiEndpoints/api/ApiClient';


const departmentSchema = yup.object().shape({
  org_name: yup
    .string()
    .test(
      'not-select',
      'Please select an Organization',
      (value) => value !== '' && value !== 'Select  Organization'
    ),
  dept_name: yup.string().required('Department is required'),
  status: yup
  .string()
  .test(
    "not-select",
    "Please select an Status",
    (value) => value !== "" && value !== "Status"
  ),
});

const EditDepartment = ({ ExistingOrganiZations, toggleModal, handlerefresh,deptId }) => {
   
 
  const [orgId, setOrgId] = useState(null);
  const [orgName, setOrgName] = useState(null);

  const { register, formState: { errors }, handleSubmit,setValue, watch } = useForm({
    resolver: yupResolver(departmentSchema),
    mode: 'all',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const GETBYID = API_ENDPOINTS.FETCH_DEPARTMENT(deptId)
        const response = await axios.get(GETBYID.url, {
          headers: GETBYID.headers
        });
        const data = decryptData(response.data.data);
        
        setValue("org_name", data.org_name);
        setOrgName(data.org_name);
        setValue("dept_name", data.dept_name); 
        setValue("status", data.status);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [deptId, setValue]);

  useEffect(() => {
    if (orgName) {
      const selectedOrg = ExistingOrganiZations.find((org) => org.org_name === orgName);
      if (selectedOrg) {
        setOrgId(selectedOrg.org_id);
      }
    }
  }, [orgName, ExistingOrganiZations]);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
    };

    try {
      const UPDATEDEPARTMENT = API_ENDPOINTS.UPDATE_DEPARTMENT(deptId)
      const response = await axios.post(UPDATEDEPARTMENT.url, formData,{
        headers:UPDATEDEPARTMENT.headers
      }
      );

      if (response.status === 200) {
        toast.success('Department Updated Successfully');
        setOrgName(null);
        setOrgId(null);
        toggleModal();
        handlerefresh();
      } else {
        console.error('Error in posting data', response);
        toast.error('Failed to Upload');
      }
    } catch (error) {
      console.error('Error in posting data', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="bg-white w-[522px] h-[368px] font-lexend m-2">
        <div className="border-b-2 border-gray-300 mx-10">
          <h1 className="text-xl font-medium pt-6 pb-2">Edit Department</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mx-6 my-2">
            <div className="mb-2">
              <label
                className="block text-gray-900 text-base font-normal mb-2"
                htmlFor="org_name"
              >
                Organization Name
              </label>
              <select
                className="appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="org_name"
                {...register('org_name')}
                
                onChange={(e) => setOrgName(e.target.value)}
              >
                <option value={orgName} disabled>{orgName}</option>
                {ExistingOrganiZations.map((org,index) => (
                  <option key={index} value={org.org_name}>
                    {org.org_name}
                  </option>
                ))}
              </select>
              {errors.org_name && (
                <p className="text-red-500">{errors.org_name.message}</p>
              )}
            </div>

            <div className='mb-2'>
              <label
                className="block text-gray-900 text-base font-normal mb-2"
                htmlFor="dept_name"
              >
                Department Name
              </label>
              <input
                className="appearance-none border rounded-lg w-full py-1.5 px-3 text-gray-500 leading-relaxed focus:outline-none focus:shadow-outline"
                id="dept_name"
                type="text"
                placeholder="Department Name"
                {...register('dept_name')}
              />
              {errors.dept_name && (
                <p className="text-red-500">{errors.dept_name.message}</p>
              )}
            </div>
            <div className=" grid grid-cols-3 mx-3 my-3 ">
              <label
                className=" text-gray-900 text-base font-normal  col-span-1"
                htmlFor="status"
              >
                Status:
              </label>
              <select className="   text-sm text-black border border-gray-900 rounded-lg  border-none outline-none"
              id="status"
               {...register("status")}
               >
                <option value="" hidden>Status</option>
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
          <SaveCancel onCancel={toggleModal} />
        </form>
      </div>
    </div>
  );
};

export default EditDepartment;