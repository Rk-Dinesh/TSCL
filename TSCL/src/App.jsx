import { useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from './Pages/layout.jsx/Layout'
import Organization from './Pages/organization/Organization';
import Department from './Pages/department/Department';
import Zone from './Pages/locality/zone/Zone';
import Ward from './Pages/locality/ward/Ward';
import Street from './Pages/locality/street/Street';
import Complaint from './Pages/complaint/Complaint';
import Grivences from './Pages/grievances/Grievances';
import GrievanceForm from './Pages/grievances/GrievanceForm';
import Admin from './Pages/adminuser/Admin';
import User from './Pages/publicuser/User';
import Settings from './Pages/setting/Setting';
import ViewRequest from './Pages/request/ViewRequest';
import Login from './Pages/auth/Login';
import OTP from './Pages/auth/OTP';
import SignUp from './Pages/auth/SignUp';

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
      <Route path='/signup' element={<SignUp/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/auth' element={<OTP/>} />
       <Route path="/" element={<Layout/>}>
       <Route path='/organization' element={<Organization/>} />
       <Route path='/department' element={<Department/>} />
       <Route path='/zone' element={<Zone/>} />
       <Route path='/ward' element={<Ward/>} />
       <Route path='/street' element={<Street/>} />
       <Route path='/complaint' element={<Complaint/>} />
       <Route path='/grievances' element={<Grivences/>} />
       <Route path='/form' element={<GrievanceForm/>} />
       <Route path='/admin' element={<Admin/>} />
       <Route path='/user' element={<User/>} />
       <Route path='/setting' element={<Settings/>} />
       <Route path='/view' element={<ViewRequest/>} />
       </Route>
       
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
  )
}

export default App
