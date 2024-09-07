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

const Tabs = lazy(() => import("./Pages/dashboard/Tab/Tabs"));
const Organization = lazy(() => import("./Pages/organization/Organization"));
const Department = lazy(() => import("./Pages/department/Department"));
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
const RequestAdmin = lazy(() => import("./Pages/grievancesadmin/RequestAdmin"));
const ViewRequest2 = lazy(() => import("./Pages/grievancesadmin/ViewRequest2"));
const RequestJE = lazy(() => import("./Pages/grievanceJE/RequestJE"));
const ViewRequestJE = lazy(() => import("./Pages/grievanceJE/ViewRequestJE"));
const Status = lazy(() => import("./Pages/status/Status"));
const RequestHead = lazy(() => import("./Pages/grievanceHead/RequestHead"));
const Profile = lazy(() => import("./Pages/layout.jsx/Profile"));
const Escalation = lazy(() => import("./Pages/escalation/Escalation"));
const EscalationCommissioner = lazy(() => import("./Pages/escalation/EscalationCommissioner"));
const Designation = lazy(() => import("./Pages/designation/Designation"));
const Employee = lazy(() => import("./Pages/Employees/Employee"));

function App() {
  const [token, setToken] = useState(sessionStorage.getItem("token") || "");
  const [loading, setLoading] = useState(true);

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
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      };

      fetchUserData();
    }else {
      setLoading(false); 
    }
  }, [decodedToken, token]);

  const memoizedFeatures = useMemo(() => features, [features]);

  if (loading) {
   
    return (
      <div>
       <p>Loading...</p>
      </div>
    );
  }

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
                  <Tabs permissions={memoizedFeatures["dashboard"]} />
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
            {memoizedFeatures["designation"] && (
              <Route
                path="/designation"
                element={
                  <Designation
                    permissions={memoizedFeatures["designation"]}
                  />
                }
              />
            )}
            {memoizedFeatures["emp"] && (
              <Route
                path="/emp"
                element={
                  <Employee
                    permissions={memoizedFeatures["emp"]}
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
            {memoizedFeatures["requestview1"] && (
              <>
               
                <Route
                  path="/requestview1"
                  element={
                    <Request permissions={memoizedFeatures["requestview1"]} />
                  }
                />
                
                <Route path="/view" element={<ViewRequest />} />
                <Route path="/form" element={<GrievanceForm />} />
               
                
              </>
            )}

            {memoizedFeatures["requestview2"] && (
              <>
                <Route
                  path="/requestview2"
                  element={
                    <RequestAdmin permissions={memoizedFeatures["requestview2"]} />
                  }
                />
                <Route path="/view2" element={<ViewRequest2 />} />
              </>
            )}

            {memoizedFeatures["requestview3"] && (
              <>
               
                <Route
                  path="/requestview3"
                  element={
                    <RequestJE permissions={memoizedFeatures["requestview3"]} />
                  }
                />
                <Route path="/view3" element={<ViewRequestJE />} />
              </>
            )}

            {memoizedFeatures["requestview4"] && (
              <>
                
                <Route
                  path="/requestview4"
                  element={
                    <RequestHead permissions={memoizedFeatures["requestview4"]} />
                  }
                />
                <Route path="/view3" element={<ViewRequestJE />} />
              </>
            )}


        
            {memoizedFeatures["escalate"] && (
              <Route
                path="/escalate"
                element={<Escalation permissions={memoizedFeatures["escalate"]} />}
              />
            )}
         

            {memoizedFeatures["escalation"] && (
              <Route
                path="/escalation"
                element={<EscalationCommissioner permissions={memoizedFeatures["escalation"]} />}
              />
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
                element={<Status permissions={memoizedFeatures["status"]} />}
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
