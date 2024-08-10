import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"

export const fetchComplaint = createAsyncThunk("fetchComplaint",async ()=>{
    const response = await axios.get(`${API}/complaint/get`)
    const responseData = response.data.data
    return responseData;
})

const complaintSlice = createSlice({
    name:"complaint",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchComplaint.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchComplaint.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchComplaint.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default complaintSlice.reducer;