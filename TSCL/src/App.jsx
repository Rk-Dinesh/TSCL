import { useState } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
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

function App() {
  

  return (
    <>
     <BrowserRouter>
      <Routes>
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
       </Route>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
