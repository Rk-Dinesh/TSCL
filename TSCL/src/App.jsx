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
import AlohaAgent from "./Pages/alohaaAgent/AlohaAgent";
const Tabs = lazy(() => import("./Pages/dashboard/Tab/Tabs"));
const Template = lazy(() => import("./Pages/template/Template"));
const Organization = lazy(() => import("./Pages/organization/Organization"));
const Department = lazy(() => import("./Pages/department/Department"));
const Zone = lazy(() => import("./Pages/locality/zone/Zone"));
const Ward = lazy(() => import("./Pages/locality/ward/Ward"));
const Street = lazy(() => import("./Pages/locality/street/Street"));
const Complaint = lazy(() => import("./Pages/complaint/Complaint"));
const DepartmentWise = lazy(() => import("./Pages/reports/DepartmentWise"));
const ZoneWise = lazy(() => import("./Pages/reports/ZoneWise"));
const WardWise = lazy(() => import("./Pages/reports/WardWise"));
const EmployeeWise = lazy(() => import("./Pages/reports/EmployeeWise"));
const UpdateGrievanceForm = lazy(() =>
  import("./Pages/grievances/GrievanceUpdate")
);
const PeriodicWise = lazy(() => import("./Pages/reports/PeriodicWise"));
const ComplaintWise = lazy(() => import("./Pages/reports/ComplaintWise"));
const MissedCall = lazy(() => import("./Pages/grievances/MissedCall"));
const ComplaintType = lazy(() =>
  import("./Pages/complaint_type/ComplaintType")
);
const EnquiryResource = lazy(() =>
  import("./Pages/EnquiryResource/EnquiryResource")
);
const GrievanceTab = lazy(() => import("./Pages/grievances/GrievanceTab"));
const GrivencesTable = lazy(() =>
  import("./Pages/dashboard/Tab/GrievanceTable")
);
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
const RequestTab = lazy(() => import("./Pages/request/RequestTab"));
const ViewRequest = lazy(() => import("./Pages/request/ViewRequest"));
const OTP = lazy(() => import("./Pages/auth/OTP"));
const SignUp = lazy(() => import("./Pages/auth/SignUp"));
const Expire = lazy(() => import("./Pages/expiresToken/Expire"));
const RequestAdminTab = lazy(() =>
  import("./Pages/grievancesadmin/RequestAdminTab")
);
const ViewRequest2 = lazy(() => import("./Pages/grievancesadmin/ViewRequest2"));
const RequestJETab = lazy(() => import("./Pages/grievanceJE/RequestJETab"));
const EscalationView = lazy(() => import("./Pages/escalation/EsclationView"));
const ViewRequestJE = lazy(() => import("./Pages/grievanceJE/ViewRequestJE"));
const Status = lazy(() => import("./Pages/status/Status"));
const RequestHeadTab = lazy(() =>
  import("./Pages/grievanceHead/RequestHeadTab")
);
const Profile = lazy(() => import("./Pages/layout.jsx/Profile"));
const Escalation = lazy(() => import("./Pages/escalation/Escalation"));
const EscalationCommissioner = lazy(() =>
  import("./Pages/escalation/EscalationCommissioner")
);
const Designation = lazy(() => import("./Pages/designation/Designation"));
const Employee = lazy(() => import("./Pages/Employees/Employee"));

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
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
    } else {
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
              !localStorage.getItem("token") ? (
                <Navigate to="" />
              ) : (
                <Layout permissions={memoizedFeatures} />
              )
            }
          >
            <Route path="/profile" element={<Profile />} />

            {memoizedFeatures["dashboard"] && (
              <>
                <Route
                  path="/dashboard"
                  element={<Tabs permissions={memoizedFeatures["dashboard"]} />}
                />
                <Route path="/dashboardview" element={<GrivencesTable />} />
                <Route path="/view" element={<ViewRequest />} />
                <Route
                  path="/escalation"
                  element={<EscalationCommissioner />}
                />
              </>
            )}
            {memoizedFeatures["departmentreport"] && (
              <Route
                path="/deptwise"
                element={
                  <DepartmentWise
                    permissions={memoizedFeatures["departmentreport"]}
                  />
                }
              />
            )}
            {memoizedFeatures["zonereport"] && (
              <Route
                path="/zonewise"
                element={
                  <ZoneWise permissions={memoizedFeatures["zonereport"]} />
                }
              />
            )}
            {memoizedFeatures["wardreport"] && (
              <Route
                path="/wardwise"
                element={
                  <WardWise permissions={memoizedFeatures["wardreport"]} />
                }
              />
            )}
            {memoizedFeatures["employeereport"] && (
              <Route
                path="/employeewise"
                element={
                  <EmployeeWise
                    permissions={memoizedFeatures["employeereport"]}
                  />
                }
              />
            )}
            {memoizedFeatures["periodicreport"] && (
              <Route
                path="/periodicwise"
                element={
                  <PeriodicWise
                    permissions={memoizedFeatures["periodicreport"]}
                  />
                }
              />
            )}
            {memoizedFeatures["complaintreport"] && (
              <Route
                path="/complaintwise"
                element={
                  <ComplaintWise
                    permissions={memoizedFeatures["complaintreport"]}
                  />
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

            {memoizedFeatures["alohaagent"] && (
              <Route
                path="/agent"
                element={
                  <AlohaAgent permissions={memoizedFeatures["alohaagent"]} />
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
            {memoizedFeatures["enquiryresource"] && (
              <Route
                path="/origin"
                element={
                  <EnquiryResource
                    permissions={memoizedFeatures["enquiryresource"]}
                  />
                }
              />
            )}
            {memoizedFeatures["designation"] && (
              <Route
                path="/designation"
                element={
                  <Designation permissions={memoizedFeatures["designation"]} />
                }
              />
            )}
            {memoizedFeatures["emp"] && (
              <Route
                path="/emp"
                element={<Employee permissions={memoizedFeatures["emp"]} />}
              />
            )}
            {memoizedFeatures["grievance"] && (
              <>
                <Route
                  path="/grievances"
                  element={
                    <GrievanceTab permissions={memoizedFeatures["grievance"]} />
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
                    <RequestTab
                      permissions={memoizedFeatures["requestview1"]}
                    />
                  }
                />

                <Route path="/view" element={<ViewRequest />} />
                <Route path="/form" element={<GrievanceForm />} />
                <Route path="/missedcalls" element={<MissedCall />} />
                <Route
                  path="/grievance-update"
                  element={<UpdateGrievanceForm />}
                />
              </>
            )}

            {memoizedFeatures["requestview2"] && (
              <>
                <Route
                  path="/requestview2"
                  element={
                    <RequestAdminTab
                      permissions={memoizedFeatures["requestview2"]}
                    />
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
                    <RequestJETab
                      permissions={memoizedFeatures["requestview3"]}
                    />
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
                    <RequestHeadTab
                      permissions={memoizedFeatures["requestview4"]}
                    />
                  }
                />
                <Route path="/view3" element={<ViewRequestJE />} />
              </>
            )}

            {memoizedFeatures["escalate"] && (
              <>
                <Route
                  path="/escalate"
                  element={
                    <Escalation permissions={memoizedFeatures["escalate"]} />
                  }
                />
                <Route path="/escalateview" element={<EscalationView />} />
              </>
            )}

            {memoizedFeatures["escalation"] && (
              <Route
                path="/escalation"
                element={
                  <EscalationCommissioner
                    permissions={memoizedFeatures["escalation"]}
                  />
                }
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
            {memoizedFeatures["template"] && (
              <Route
                path="/template"
                element={
                  <Template permissions={memoizedFeatures["template"]} />
                }
              />
            )}
            <Route path="/token" element={<Expire />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={2000}
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
