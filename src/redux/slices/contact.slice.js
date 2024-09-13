import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../helpers/axiosInstance";
const initialState = {};
export const sendMessage = createAsyncThunk(
  "contact/sendMessage",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post("contact/send", data?.payload);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const advertiseWithUs = createAsyncThunk(
  "contact/advertiseWithUs",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post("contact/advertise-with-us", data?.payload);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = contactSlice.actions;
export default contactSlice.reducer;
