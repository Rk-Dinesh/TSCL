import React, { useState, useEffect, lazy, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { jwtDecode } from "jwt-decode";
import Login from "./Pages/auth/Login";
import Layout from "./Pages/layout.jsx/Layout";
import NotFound from "./404";
import decryptData from "./Decrypt";
import { API } from "./Host";
import axios from "axios";
import RequestAdmin from "./Pages/grievancesadmin/RequestAdmin";
import ViewRequest2 from "./Pages/grievancesadmin/ViewRequest2";
import RequestJE from "./Pages/grievanceJE/RequestJE";
import ViewRequestJE from "./Pages/grievanceJE/ViewRequestJE";
import Status from "./Pages/status/Status";
import RequestHead from "./Pages/grievanceHead/RequestHead";
import Profile from "./Pages/layout.jsx/Profile";
import Escalation from "./escalation/Escalation";

const Organization = lazy(() => import("./Pages/organization/Organization"));
const Department = lazy(() => import("./Pages/department/Department"));
const Dashboard = lazy(() => import("./Pages/dashboard/Dashboard"));
const Zone = lazy(() => import("./Pages/locality/zone/Zone"));
const Ward = lazy(() => import("./Pages/locality/ward/Ward"));
const Street = lazy(() => import("./Pages/locality/street/Street"));
const Complaint = lazy(() => import("./Pages/complaint/Complaint"));
const ComplaintType = lazy(() =>
  import("./Pages/complaint_type/ComplaintType")
);
const Grivences = lazy(() => import("./Pages/grievances/Grievances"));
const GrievanceForm = lazy(() => import("./Pages/grievances/GrievanceForm"));
const Admin = lazy(() => import("./Pages/adminuser/Admin"));
const User = lazy(() => import("./Pages/publicuser/User"));
const Settings = lazy(() => import("./Pages/setting/Setting"));
const RoleAccessLevelForm = lazy(() =>
  import("./Pages/setting/RoleAccessForm")
);
const RoleAccessLevelEdit = lazy(() =>
  import("./Pages/setting/RoleAccessEdit")
);
const Request = lazy(() => import("./Pages/request/Request"));
const ViewRequest = lazy(() => import("./Pages/request/ViewRequest"));
const OTP = lazy(() => import("./Pages/auth/OTP"));
const SignUp = lazy(() => import("./Pages/auth/SignUp"));
const Expire = lazy(() => import("./Pages/expiresToken/Expire"));

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const decodedToken = useMemo(
    () => (token ? jwtDecode(token) : null),
    [token]
  );
  const [features, setFeatures] = useState({});

  useEffect(() => {
    if (decodedToken) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `${API}/role/getbyid?role_id=${decodedToken.role_id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const responseData = decryptData(response.data.data);
          const featuresData = responseData.accessLevels.reduce(
            (acc, current) => {
              acc[current.feature] = current.permissions;
              return acc;
            },
            {}
          );
          setFeatures(featuresData);
        } catch (error) {
          console.error(error);
        }
      };

      fetchUserData();
    }
  }, [decodedToken, token]);

  const memoizedFeatures = useMemo(() => features, [features]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="" element={<Login setToken={setToken} />} />
          <Route path="/auth" element={<OTP />} />
          <Route
            path="/"
            element={
              !sessionStorage.getItem("token") ? (
                <Navigate to="" />
              ) : (
                <Layout permissions={memoizedFeatures} />
              )
            }
          >
             <Route path="/profile" element={<Profile />} />
            {memoizedFeatures["dashboard"] && (
              <Route
                path="/dashboard"
                element={
                  <Dashboard permissions={memoizedFeatures["dashboard"]} />
                }
              />
            )}
            {memoizedFeatures["admin"] && (
              <Route
                path="/admin"
                element={<Admin permissions={memoizedFeatures["admin"]} />}
              />
            )}
            {memoizedFeatures["user"] && (
              <>
                <Route
                  path="/user"
                  element={<User permissions={memoizedFeatures["user"]} />}
                />
              </>
            )}
            {memoizedFeatures["organization"] && (
              <Route
                path="/organization"
                element={
                  <Organization
                    permissions={memoizedFeatures["organization"]}
                  />
                }
              />
            )}
            {memoizedFeatures["department"] && (
              <Route
                path="/department"
                element={
                  <Department permissions={memoizedFeatures["department"]} />
                }
              />
            )}
            {memoizedFeatures["zone"] && (
              <Route
                path="/zone"
                element={<Zone permissions={memoizedFeatures["zone"]} />}
              />
            )}
            {memoizedFeatures["ward"] && (
              <Route
                path="/ward"
                element={<Ward permissions={memoizedFeatures["ward"]} />}
              />
            )}
            {memoizedFeatures["street"] && (
              <Route
                path="/street"
                element={<Street permissions={memoizedFeatures["street"]} />}
              />
            )}
            {memoizedFeatures["complaint"] && (
              <Route
                path="/complaint"
                element={
                  <Complaint permissions={memoizedFeatures["complaint"]} />
                }
              />
            )}
            {memoizedFeatures["complainttype"] && (
              <Route
                path="/complainttype"
                element={
                  <ComplaintType
                    permissions={memoizedFeatures["complainttype"]}
                  />
                }
              />
            )}
            {memoizedFeatures["grievance"] && (
              <>
                <Route
                  path="/grievances"
                  element={
                    <Grivences permissions={memoizedFeatures["grievance"]} />
                  }
                />
                <Route path="/form" element={<GrievanceForm />} />
                <Route path="/view" element={<ViewRequest />} />
              </>
            )}
            {memoizedFeatures["grievance"] && (
              <>
                <Route path="/requestview1" element={<Request />} />
                <Route path="/view" element={<ViewRequest />} />
                <Route path="/form" element={<GrievanceForm />} />
                <Route path="/escalate" element={<Escalation />} />
              </>
            )}

            {memoizedFeatures["grievance"] && (
              <>
                <Route path="/requestview2" element={<RequestAdmin />} />
                <Route path="/view2" element={<ViewRequest2 />} />
              </>
            )}

            {memoizedFeatures["grievance"] && (
              <>
                <Route path="/requestview3" element={<RequestJE />} />
                <Route path="/view3" element={<ViewRequestJE />} />
              </>
            )}

            {memoizedFeatures["grievance"] && (
              <>
                <Route path="/requestview4" element={<RequestHead />} />
                <Route path="/view" element={<ViewRequest />} />
              </>
            )}

            {memoizedFeatures["setting"] && (
              <>
                <Route
                  path="/setting"
                  element={
                    <Settings permissions={memoizedFeatures["setting"]} />
                  }
                />
                <Route path="/roleform" element={<RoleAccessLevelForm />} />
                <Route path="/editrole" element={<RoleAccessLevelEdit />} />
              </>
            )}
            {memoizedFeatures["status"] && (
              <Route
                path="/status"
                element={<Status permissions={memoizedFeatures["grievance"]} />}
              />
            )}
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
