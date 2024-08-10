import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"
import { API } from "../../../Host"

export const fetchWard = createAsyncThunk("fetchWard",async ()=>{
    const response = await axios.get(`${API}/ward/get`)
    const responseData = response.data.data
    return responseData;
})

const wardSlice = createSlice({
    name:"ward",
    initialState:{
        isLoading:false,
        data:null,
        isError:false
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchWard.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(fetchWard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
          })
          .addCase(fetchWard.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
          });
      },
})

export default wardSlice.reducer;