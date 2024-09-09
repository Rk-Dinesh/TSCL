const BASE_URL = 'http://localhost:4000';

const token = () => sessionStorage.getItem('token');

const authHeaders = {
  Authorization: `Bearer ${token()}`,
};

const API_ENDPOINTS = {

  //ORGANIZATION:
  POST_ORGANIZATION:{url:`${BASE_URL}/organization/post`,headers: authHeaders},
  GET_ORGANIZATION: {url: `${BASE_URL}/organization/get`,headers: authHeaders},
  GET_ORGANIZATIONACTIVE: {url: `${BASE_URL}/organization/getactive`,headers: authHeaders},
  DELETE_ORGANIZATION:(deleteId) => ({url: `${BASE_URL}/organization/delete?org_id=${deleteId}`,headers: authHeaders}),
  CSV_ORGANIZATION:{url:`${BASE_URL}/organization/uploadcsv`,headers: authHeaders},

  //DEPARTMENT:
  
};

export default API_ENDPOINTS;