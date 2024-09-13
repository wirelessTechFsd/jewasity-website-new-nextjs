import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../helpers/axiosInstance";
const initialState = {
  subscriptions: [],
  loading: true,
};
export const getSubscription = createAsyncThunk(
  "subscription/getSubscription",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get("subscription");
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addSubscription = createAsyncThunk(
  "subscription/addSubscription",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post(
        "subscription/add-subscription",
        data?.payload
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubscription.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubscription.fulfilled, (state, payload) => {
      state.subscriptions = payload;
      state.loading = false;
    });
    builder.addCase(getSubscription.rejected, (state, payload) => {
      state.loading = false;
    });
  },
});

export const {} = subscriptionSlice.actions;
export default subscriptionSlice.reducer;
