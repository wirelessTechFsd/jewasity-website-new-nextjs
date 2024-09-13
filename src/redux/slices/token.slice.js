import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../helpers/axiosInstance";
const initialState = {
  token: "",
  loading: true,
  maintenanceMode: false,
};
export const getWebsiteMode = createAsyncThunk(
  "token/getWebsiteMode",
  async (_, thunkAPI) => {
    try {
      const response = await Client.get(`admin/get-website-mode`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
export const getToken = createAsyncThunk(
  "token/getToken",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get("token");
      localStorage.setItem("u-enypt-token", response?.data?.token);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const tokenSlice = createSlice({
  name: "token",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getToken.fulfilled, (state, action) => {
      state.token = action.payload;
      state.loading = false;
    });
    builder.addCase(getToken.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getWebsiteMode.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getWebsiteMode.fulfilled, (state, action) => {
      // Use action.payload directly to set maintenanceMode
      state.maintenanceMode = action.payload?.data?.mode === "ACTIVE";
      state.loading = false;
    });
    builder.addCase(getWebsiteMode.rejected, (state) => {
      state.loading = false;
    });
  },
});


export const {} = tokenSlice.actions;
export default tokenSlice.reducer;
