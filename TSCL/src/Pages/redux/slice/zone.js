import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"

export const fetchZone = createAsyncThunk("fetchZone",async ()=>{
    const response = await axios.get(`${API}/zone/get`)
    const responseData = response.data.data
    return responseData;
})

const zoneSlice = createSlice({
    name:"zone",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchZone.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchZone.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchZone.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default zoneSlice.reducer;