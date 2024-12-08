const BASE_URL = "http://13.48.10.96:4000";

const token = () => localStorage.getItem("token");

const authHeaders = {
  Authorization: `Bearer ${token()}`,
};

const API_ENDPOINTS = {
  //ORGANIZATION:
  POST_ORGANIZATION: {
    url: `${BASE_URL}/organization/post`,
    headers: authHeaders,
  },
  GET_ORGANIZATION: {
    url: `${BASE_URL}/organization/get`,
    headers: authHeaders,
  },
  GET_ORGANIZATIONACTIVE: {
    url: `${BASE_URL}/organization/getactive`,
    headers: authHeaders,
  },
  DELETE_ORGANIZATION: (deleteId) => ({
    url: `${BASE_URL}/organization/delete?org_id=${deleteId}`,
    headers: authHeaders,
  }),
  CSV_ORGANIZATION: {
    url: `${BASE_URL}/organization/uploadcsv`,
    headers: authHeaders,
  },
  UPDATE_ORGANIZATION: (orgId) => ({
    url: `${BASE_URL}/organization/update?org_id=${orgId}`,
    headers: authHeaders,
  }),
  FETCH_ORGANIZATION: (orgId) => ({
    url: `${BASE_URL}/organization/getbyid?org_id=${orgId}`,
    headers: authHeaders,
  }),

  //DEPARTMENT:
  POST_DEPARTMENT: { url: `${BASE_URL}/department/post`, headers: authHeaders },
  GET_DEPARTMENT: { url: `${BASE_URL}/department/get`, headers: authHeaders },
  GET_DEPARTMENTACTIVE: {
    url: `${BASE_URL}/department/getactive`,
    headers: authHeaders,
  },
  FETCH_DEPARTMENT: (deptId) => ({
    url: `${BASE_URL}/department/getbyid?dept_id=${deptId}`,
    headers: authHeaders,
  }),
  DELETE_DEPARTMENT: (deleteId) => ({
    url: `${BASE_URL}/department/delete?dept_id=${deleteId}`,
    headers: authHeaders,
  }),
  CSV_DEPARTMENT: {
    url: `${BASE_URL}/department/uploadcsv`,
    headers: authHeaders,
  },
  UPDATE_DEPARTMENT: (deptId) => ({
    url: `${BASE_URL}/department/update?dept_id=${deptId}`,
    headers: authHeaders,
  }),

  //COMPLAINT:
  GET_COMPLAINT: { url: `${BASE_URL}/complaint/get`, headers: authHeaders },
  GET_DEPT_COMPLAINTACTIVE: {
    url: `${BASE_URL}/department/getactive`,
    headers: authHeaders,
  },
  GET_ROLE_COMPLAINTACTIVE: {
    url: `${BASE_URL}/role/getactive`,
    headers: authHeaders,
  },
  DELETE_COMPLAINT: (deleteId) => ({
    url: `${BASE_URL}/complaint/delete?complaint_id=${deleteId}`,
    headers: authHeaders,
  }),
  CSV_COMPLAINT: {
    url: `${BASE_URL}}/complaint/uploadcsv`,
    headers: authHeaders,
  },
  POST_COMPLAINT: { url: `${BASE_URL}}/complaint/post`, headers: authHeaders },
  FETCH_COMPLAINT: (comptId) => ({
    url: `${BASE_URL}/complaint/getbyid?complaint_id=${comptId}`,
    headers: authHeaders,
  }),
  UPDATE_COMPLAINT: (comptId) => ({
    url: `${BASE_URL}/complaint/update?complaint_id=${comptId}`,
    headers: authHeaders,
  }),

  //COMPLAINT TYPE:
  GET_COMPLAINTTYPE: {
    url: `${BASE_URL}/complainttype/get`,
    headers: authHeaders,
  },
  DELETE_COMPLAINTTYPE: (deleteId) => ({
    url: `${BASE_URL}/complainttype/delete?compliant_type_id=${deleteId}`,
    headers: authHeaders,
  }),
  POST_COMPLAINTTYPE: {
    url: `${BASE_URL}/complainttype/post`,
    headers: authHeaders,
  },
  FETCH_COMPLAINTTYPE: (comptId) => ({
    url: `${BASE_URL}/complainttype/getbyid?compliant_type_id=${comptId}`,
    headers: authHeaders,
  }),
  UPDATE_COMPLAINTTYPE: (comptId) => ({
    url: `${BASE_URL}/complainttype/update?compliant_type_id=${comptId}`,
    headers: authHeaders,
  }),

  //DESIGNATION:
  GET_DESIGNATION: { url: `${BASE_URL}/designation/get`, headers: authHeaders },
  GET_ORG_DESIGNATIONACTIVE: {
    url: `${BASE_URL}/organization/getactive`,
    headers: authHeaders,
  },
  GET_DEPT_DESIGNATIONACTIVE: {
    url: `${BASE_URL}/department/getactive`,
    headers: authHeaders,
  },
  UPLOAD_DESIGNATION: {
    url: `${BASE_URL}/designation/uploadcsv`,
    headers: authHeaders,
  },
  POST_DESIGANATION: {
    url: `${BASE_URL}/designation/post`,
    headers: authHeaders,
  },
  FETCH_DESIGNATION: (desgId) => ({
    url: `${BASE_URL}/designation/getbyid?desgination_id=${desgId}`,
    headers: authHeaders,
  }),
  DELETE_DESIGNATION: (deleteId) => ({
    url: `${BASE_URL}/designation/delete?desgination_id=${deleteId}`,
    headers: authHeaders,
  }),
  UPDATE_DESIGNATION: (desgId) => ({
    url: `${BASE_URL}/designation/update?desgination_id=${desgId}`,
    headers: authHeaders,
  }),

  //EMPLOYEES:
  GET_EMPLOYEE: { url: `${BASE_URL}/employee/get`, headers: authHeaders },
  GET_DESIG_EMPLOYEEACTIVE: {
    url: `${BASE_URL}/designation/getactive`,
    headers: authHeaders,
  },
  GET_DEPT_EMPLOYEEACTIVE: {
    url: `${BASE_URL}/department/getactive`,
    headers: authHeaders,
  },
  DELETE_EMPLOYEE: (deleteId) => ({
    url: `${BASE_URL}/employee/delete?emp_id=${deleteId}`,
    headers: authHeaders,
  }),
  CSV_EMPLOYEE: { url: `${BASE_URL}/employee/uploadcsv`, headers: authHeaders },
  POST_EMPLOYEE: { url: `${BASE_URL}/employee/post`, headers: authHeaders },
  FETCH_EMPLOYEE: (adminId) => ({
    url: `${BASE_URL}/employee/getbyid?emp_id=${adminId}`,
    headers: authHeaders,
  }),
  UPDATE_EMPLOYEE: (adminId) => ({
    url: `${BASE_URL}/employee/update?emp_id=${adminId}`,
    headers: authHeaders,
  }),

  //ESCALATON:
  GET_ESCALATION: {
    url: `${BASE_URL} /grievance-escalation/get`,
    headers: authHeaders,
  },
  // GET_ESCALATION: {url: `${BASE_URL} /grievance-escalation/getbydeptrole?escalation_department=${dept}&escalation_to=${role}`,headers:authHeaders},
  POST_ESCALATION: {
    url: `${BASE_URL}/manual-escalation-check`,
    headers: authHeaders,
  },

  //ADMIN:
  GET_ADMIN: { url: `${BASE_URL}/user/get`, headers: authHeaders },
  GET_ROLE_ADMINACTIVE: {
    url: `${BASE_URL}/role/getactive`,
    headers: authHeaders,
  },
  GET_EMPLOYEE_ADMINACTIVE: {
    url: `${BASE_URL}/employee/getactive`,
    headers: authHeaders,
  },
  GET_ZONE_ADMINACTIVE: {
    url: `${BASE_URL}/zone/getactive`,
    headers: authHeaders,
  },
  GET_WARD_ADMINACTIVE: {
    url: `${BASE_URL}/ward/getactive`,
    headers: authHeaders,
  },
  DELETE_ADMIN: (deleteId) => ({
    url: `${BASE_URL}/user/delete?user_id=${deleteId}`,
    headers: authHeaders,
  }),
  UPLOAD_ADMIN: { url: `${BASE_URL}/user/uploadcsv`, headers: authHeaders },
  POST_ADMIN: { url: `${BASE_URL}/user/post`, headers: authHeaders },
  FETCH_ADMIN: (adminId) => ({
    url: `${BASE_URL}/user/getbyid?user_id=${adminId}`,
    headers: authHeaders,
  }),
  UPDATE_ADMIN: (adminId) => ({
    url: `${BASE_URL}/user/update?user_id=${adminId}`,
    headers: authHeaders,
  }),

  //GRIEVANCE HEAD
  GET_GRIEVANCE: { url: `${BASE_URL}/new-grievance/get`, headers: authHeaders },
  GET_DEPT_GRIEVANCE: {
    url: `${BASE_URL}/department/get`,
    headers: authHeaders,
  },
  GET_STATUS_GRIEVANCE: { url: `${BASE_URL}/status/get`, headers: authHeaders },
  GET_COMPLAINTTYPE_GRIEVANCE: {
    url: `${BASE_URL}/complainttype/get`,
    headers: authHeaders,
  },
  GET_ZONE_GRIEVANCE: { url: `${BASE_URL}/zone/get`, heraders: authHeaders },
  GET_WARD_GRIEVANCE: { url: `${BASE_URL}/ward/get`, heraders: authHeaders },
  GET_STREET_GRIEVANCE: {
    url: `${BASE_URL}/street/get`,
    heraders: authHeaders,
  },
  FETCH_GRIVANCE: (dept) => ({
    url: `${BASE_URL}/user/getbydept?dept_name=${dept}`,
    headers: authHeaders,
  }),

  //GRIEVANCE JE
  GET_GRIEVANCEJE: (code) => ({
    url: `${BASE_URL}/new-grievance/getbyassign?assign_user=${code}`,
    headers: authHeaders,
  }),
  GET_GRIEVANCEJE: { url: `${BASE_URL}/status/get`, headers: authHeaders },
  FETCH_GRIEVANCEJE: (grievanceId) => ({
    url: `${BASE_URL}/new-grievance/getbyid?grievance_id=${grievanceId}`,
    headers: authHeaders,
  }),
  FETCH_GRIEVANCEJE: (responseData) => ({
    url: `${BASE_URL}/new-grievance/filter?zone_name=${responseData.zone_name}`,
    headers: authHeaders,
  }),
  FETCH_GRIEVANCEJE: (responseData) => ({
    url: `${BASE_URL}/new-grievance/getbyid?ward_name=${responseData.ward_name}`,
    headers: authHeaders,
  }),
  FETCH_GRIEVANCEJE: (responseData) => ({
    url: `${BASE_URL}/new-grievance/getbyid?street_name=${responseData.street_name}`,
    headers: authHeaders,
  }),
  FETCH_GRIEVANCEJE: (responseData) => ({
    url: `${BASE_URL}/new-grievance/getbyid?dept_name=${responseData.dept_name}`,
    headers: authHeaders,
  }),
  FETCH_GRIEVANCEJE: (responseData) => ({
    url: `${BASE_URL}/new-grievance/getbyid?complaint=${responseData.complaint}`,
    headers: authHeaders,
  }),
  FETCH_GRIEVANCEJE: (grievanceId) => ({
    url: `${BASE_URL}/new-grievance-attachment/getattachments?grievance_id=${grievanceId}`,
    headers: authHeaders,
  }),
  FETCH_GRIEVANCEJE: (grievanceId) => ({
    url: `${BASE_URL}/grievance-log/getbyid?grievance_id=${grievanceId}`,
    headers: authHeaders,
  }),
  UPDATE_GRIEVANCE: (grievanceId) => ({
    url: `${BASE_URL}/new-grievance/updatestatus?grievance_id=${grievanceId}`,
    headers: authHeaders,
  }),
  POST_GRIEVANCEJE: {
    url: `${BASE_URL} /grievance-log/post`,
    headers: authHeaders,
  },
  POST_GRIEVANCEJE: {
    url: `${BASE_URL} /grievance-worksheet/post`,
    headers: authHeaders,
  },
  POST_GRIEVANCEJE: {
    url: `${BASE_URL}/grievance-worksheet-attachment/post`,
    headers: authHeaders,
  },

  //GRIEVANCE
  GET_GRIEVANCE: { url: `${BASE_URL}/new-grievance/get`, headers: authHeaders },
  GET_GRIEVANCE: { url: `${BASE_URL}/status/get`, headers: authHeaders },
  FETCH_GRIVANCE: (contactNumber) => ({
    url: `${BASE_URL}/public-user/getbyphone?phone=${contactNumber}`,
    headers: authHeaders,
  }),
  POST_GRIEVANCE: { url: `${BASE_URL}/public-user/post`, headers: authHeaders },
  POST_GRIEVANCE: {
    url: `${BASE_URL}/new-grievance/post`,
    headers: authHeaders,
  },
  POST_GRIEVANCE: {
    url: `${BASE_URL}/new-grievance-attachment/post`,
    headers: authHeaders,
  },

  //GRIEVANCE ADMIN:
  FETCH_GRIEVANCEADMIN: (dept) => ({
    url: `${BASE_URL}/user/getbydept?dept_name=${dept}`,
    headers: authHeaders,
  }),
  POST_GRIEVANCEADMIN: {
    url: `${BASE_URL}/new-grievance/updatemanyassign`,
    headers: authHeaders,
  },
  FETCH_GRIEVANCEADMIN: (props) => ({
    url: `${BASE_URL}/new-grievance/tickettransfer?grievance_id=${props.transerId}`,
    headers: authHeaders,
  }),

  //STREET

  GET_STREET: { url: `${BASE_URL}/street/get`, headers: authHeaders },
  POST_STREET: { url: `${BASE_URL}}/street/post`, headers: authHeaders },
  GET_WARD_STREETACTIVE: {
    url: `${BASE_URL}/ward/getactive`,
    headers: authHeaders,
  },
  DELETE_STREET: (deleteId) => ({
    url: `${BASE_URL}/street/delete?street_id=${deleteId}`,
    headers: authHeaders,
  }),
  UPLOAD_STREET: { url: `${BASE_URL}/street/uploadcsv`, headers: authHeaders },
  FETCH_STREET: (streetId) => ({
    url: `${BASE_URL}/street/getbyid?street_id=${streetId}`,
    headers: authHeaders,
  }),
  UPDATE_STREET: (streetId) => ({
    url: `${BASE_URL}/street/update?street_id=${streetId}`,
    headers: authHeaders,
  }),

  //WARD
  DELETE_WARD: (deleteId) => ({
    url: `${BASE_URL}/ward/delete?ward_id=${deleteId}`,
    headers: authHeaders,
  }),
  UPLOAD_WARD: { url: `${BASE_URL}/ward/uploadcsv`, headers: authHeaders },
  FETCH_WARD: (wardId) => ({
    url: `${BASE_URL}/ward/getbyid?ward_id=${wardId}`,
    headers: authHeaders,
  }),
  UPDATE_WARD: (wardId) => ({
    url: `${BASE_URL}/ward/update?ward_id=${wardId}`,
    headers: authHeaders,
  }),

  //ZONE
  DELETE_WARD: (deleteId) => ({
    url: `${BASE_URL}/zone/delete?zone_id=${deleteId}`,
    headers: authHeaders,
  }),
  UPLOAD_WARD: { url: `${BASE_URL}/zone/uploadcsv`, headers: authHeaders },
  FETCH_WARD: (zoneId) => ({
    url: `${BASE_URL}/zone/getbyid?zone_id=${zoneId}`,
    headers: authHeaders,
  }),
  UPDATE_WARD: (zoneId) => ({
    url: `${BASE_URL}/zone/update?zone_id=${zoneId}`,
    headers: authHeaders,
  }),

  //PUBLIC USER:
  GET_PUBLICUSER: { url: `${BASE_URL}/public-user/get`, headers: authHeaders },
  DELETE_WARD: (deleteId) => ({
    url: `${BASE_URL}/public-user/delete?public_user_id=${deleteId}`,
    headers: authHeaders,
  }),
  UPLOAD_STREET: {
    url: `${BASE_URL}/public-user/uploadcsv`,
    headers: authHeaders,
  },
  FETCH_WARD: (userId) => ({
    url: `${BASE_URL}/public-user/getbyid?public_user_id=${userId}`,
    headers: authHeaders,
  }),
  UPDATE_WARD: (userId) => ({
    url: `${BASE_URL}/public-user/update?public_user_id=${userId}`,
    headers: authHeaders,
  }),

  //REQUEST
  ATTACHMENT_REQUEST: (attachmentFile) => ({
    url: `${BASE_URL}/new-grievance-attachment/file/${attachmentFile}`,
    headers: authHeaders,
  }),
  FETCH_REQUEST: (grievanceId) => ({
    url: `${BASE_URL}/new-grievance-attachment/getattachments?grievance_id=${grievanceId}`,
    headers: authHeaders,
  }),
  FETCH_REQUEST: (grievanceId) => ({
    url: `${BASE_URL}/grievance-log/getbyid?grievance_id=${grievanceId}`,
    headers: authHeaders,
  }),

  //STATUS
  DELETE_STATUS: (deleteId) => ({
    url: `${BASE_URL}/status/delete?status_id=${deleteId}`,
    headers: authHeaders,
  }),
  FETCH_STATUS: (status_id) => ({
    url: `${BASE_URL}/status/getbyid?status_id=${status_id}`,
    headers: authHeaders,
  }),
  UPDATE_WARD: (status_id) => ({
    url: `${BASE_URL}/status/update?status_id=${status_id}`,
    headers: authHeaders,
  }),
};

export default API_ENDPOINTS;
