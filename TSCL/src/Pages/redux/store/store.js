import { configureStore} from "@reduxjs/toolkit"
import ZoneReducer from "../slice/zone"
import WardReducer from "../slice/ward"
import StreetReducer from "../slice/street"
import DepartmentReducer from "../slice/department"
import ComplaintReducer from "../slice/complaint"

export const store = configureStore({
    devTools:true,
    reducer:{
        department: DepartmentReducer,
        complaint:ComplaintReducer,
        zone: ZoneReducer,
        ward: WardReducer,
        street: StreetReducer,
       

    }
})