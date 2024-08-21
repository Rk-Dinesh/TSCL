import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = lazy(() => import('./Pages/layout.jsx/Layout'));
const Organization = lazy(() => import('./Pages/organization/Organization'));
const Department = lazy(() => import('./Pages/department/Department'));
const Zone = lazy(() => import('./Pages/locality/zone/Zone'));
const Ward = lazy(() => import('./Pages/locality/ward/Ward'));
const Street = lazy(() => import('./Pages/locality/street/Street'));
const Complaint = lazy(() => import('./Pages/complaint/Complaint'));
const Grivences = lazy(() => import('./Pages/grievances/Grievances'));
const GrievanceForm = lazy(() => import('./Pages/grievances/GrievanceForm'));
const Admin = lazy(() => import('./Pages/adminuser/Admin'));
const User = lazy(() => import('./Pages/publicuser/User'));
const Settings = lazy(() => import('./Pages/setting/Setting'));
const ViewRequest = lazy(() => import('./Pages/request/ViewRequest'));
const Login = lazy(() => import('./Pages/auth/Login'));
const OTP = lazy(() => import('./Pages/auth/OTP'));
const SignUp = lazy(() => import('./Pages/auth/SignUp'));
const Expire = lazy(() => import('./Pages/expiresToken/Expire'));
const ComplaintType = lazy(() => import('./Pages/complaint_type/ComplaintType'));


function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/signup' element={<SignUp />} />
            <Route path='' element={<Login />} />
            <Route path='/auth' element={<OTP />} />
            <Route path="/" element={<Layout />}>
              <Route path='/organization' element={<Organization />} />
              <Route path='/department' element={<Department />} />
              <Route path='/zone' element={<Zone />} />
              <Route path='/ward' element={<Ward />} />
              <Route path='/street' element={<Street />} />
              <Route path='/complaint' element={<Complaint />} />
              <Route path='/grievances' element={<Grivences />} />
              <Route path='/form' element={<GrievanceForm />} />
              <Route path='/admin' element={<Admin />} />
              <Route path='/user' element={<User />} />
              <Route path='/setting' element={<Settings />} />
              <Route path='/view' element={<ViewRequest />} />
              <Route path='/token' element={<Expire />} />
              <Route path='/complainttype' element={<ComplaintType />} />
            </Route>
          </Routes>
        </Suspense>
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

