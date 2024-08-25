import React, { useState,useEffect, lazy,useMemo, } from "react";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import Login from "./Pages/auth/Login";
import Layout from "./Pages/layout.jsx/Layout";
import NotFound from "./404";
import decryptData from "./Decrypt";
import { API } from "./Host";
import axios from "axios";


const Organization = lazy(() => import("./Pages/organization/Organization"));
const Department = lazy(() => import("./Pages/department/Department"));
const Dashboard = lazy(() => import("./Pages/dashboard/Dashboard"));
const Zone = lazy(() => import("./Pages/locality/zone/Zone"));
const Ward = lazy(() => import("./Pages/locality/ward/Ward"));
const Street = lazy(() => import("./Pages/locality/street/Street"));
const Complaint = lazy(() => import("./Pages/complaint/Complaint"));
const ComplaintType = lazy(() =>import("./Pages/complaint_type/ComplaintType"));
const Grivences = lazy(() => import("./Pages/grievances/Grievances"));
const GrievanceForm = lazy(() => import("./Pages/grievances/GrievanceForm"));
const Admin = lazy(() => import("./Pages/adminuser/Admin"));
const User = lazy(() => import("./Pages/publicuser/User"));
const Settings = lazy(() => import("./Pages/setting/Setting"));
const RoleAccessLevelForm = lazy(() => import("./Pages/setting/RoleAccessForm"));
const Request = lazy(() => import("./Pages/request/Request"));
const ViewRequest = lazy(() => import("./Pages/request/ViewRequest"));
const OTP = lazy(() => import("./Pages/auth/OTP"));
const SignUp = lazy(() => import("./Pages/auth/SignUp"));
const Expire = lazy(() => import("./Pages/expiresToken/Expire"));


function App() {

  const [token, setToken] = useState(sessionStorage.getItem('token') || '');
  const decodedToken = useMemo(() => token? jwtDecode(token) : null, [token]);
  const [features, setFeatures] = useState({});


  useEffect(() => {
    if (decodedToken) {
      console.log(decodedToken);
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${API}/role/getbyid?role_id=${decodedToken.role_id}`,{
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });
          const responseData = decryptData(response.data.data)
          console.log(responseData)
          const featuresData = responseData.accessLevels.reduce((acc, current) => {
            acc[current.feature] = current.permissions;
            return acc;
          }, {});
          console.log(featuresData);
          
          setFeatures(featuresData);
          
        } catch (error) {
          console.error(error);
        }
      };
      
      fetchUserData();
    }
  }, [decodedToken]);

  const memoizedFeatures = useMemo(() => features, [features]);

  const RouteGuard = ({ feature, permissions, children }) => {
    if (!memoizedFeatures[feature] || !memoizedFeatures[feature].includes(permissions)) {
      return <Navigate to="*" />;
    }
    return children;
  };


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="" element={<Login setToken={setToken}/>} />
          <Route path="/auth" element={<OTP />} />
          <Route path="/" element={!sessionStorage.getItem("token")? <Navigate to="" /> : <Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/department" element={<Department />} />
            <Route path="/zone" element={<Zone />} />
            <Route path="/ward" element={<Ward />} />
            <Route path="/street" element={<Street />} />
            <Route path="/complaint" element={<Complaint />} />
            <Route path="/complainttype" element={<ComplaintType />} />
            <Route path="/grievances" element={<Grivences />} />
            <Route path="/form" element={<GrievanceForm />} />
            <Route path="/view" element={<ViewRequest />} />
            <Route path="/requestview" element={<Request />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
            <Route path="/setting" element={<Settings />} />
            <Route path="/roleform" element={<RoleAccessLevelForm />} />

            <Route path="/token" element={<Expire />} />
            
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
