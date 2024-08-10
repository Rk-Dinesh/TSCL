import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"

export const fetchDepartment = createAsyncThunk("fetchDepartment",async ()=>{
    const response = await axios.get(`${API}/department/get`)
    const responseData = response.data.data
    return responseData;
})

const departmentSlice = createSlice({
    name:"department",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchDepartment.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchDepartment.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default departmentSlice.reducer;