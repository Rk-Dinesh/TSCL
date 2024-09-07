const BASE_URL = 'http://13.48.10.96:4000';

const token = () => sessionStorage.getItem('token');

const authHeaders = {
  Authorization: `Bearer ${token()}`,
};

const API_ENDPOINTS = {
  GET_ORGANIZATION: {url: `${BASE_URL}/organization/get`,headers: authHeaders},
  GET_ORGANIZATIONACTIVE: {url: `${BASE_URL}/organization/getactive`,headers: authHeaders},
  DELETE_ORGANIZATION:{url:`${BASE_URL}/organization/delete?org_id=${deleteId}`,headers: authHeaders},
  CSV_ORGANIZATION:{url:`${BASE_URL}organization/uploadcsv`,headers: authHeaders},
};

export default API_ENDPOINTS;