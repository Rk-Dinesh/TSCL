import { configureStore} from "@reduxjs/toolkit"
import ZoneReducer from "../slice/zone"
import WardReducer from "../slice/ward"
import StreetReducer from "../slice/street"
import DepartmentReducer from "../slice/department"
import ComplaintReducer from "../slice/complaint"
import PublicUserReducer from "../slice/public_user"
import OrganizationReducer from "../slice/organization"
import ComplainttypeReducer from "../slice/complainttype"
import OriginReducer from "../slice/origin"


export const store = configureStore({
    devTools:false,
    reducer:{
        department: DepartmentReducer,
        complaint:ComplaintReducer,
        zone: ZoneReducer,
        ward: WardReducer,
        street: StreetReducer,
        publicUser:PublicUserReducer,
        organization:OrganizationReducer,
        complainttype:ComplainttypeReducer,
        origin:OriginReducer,
       

    }
})