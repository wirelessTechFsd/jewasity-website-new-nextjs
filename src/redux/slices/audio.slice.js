import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../helpers/axiosInstance";
const initialState = {
  audio: [],
  loading: false,
};
export const getAudio = createAsyncThunk(
  "audio/getAudio",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`audio?page=${data?.payload}`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAudio.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAudio.fulfilled, (state, { payload }) => {
      state.audio = payload?.data?.audios;
      state.loading = false;
    });
    builder.addCase(getAudio.rejected, (state, payload) => {
      state.loading = false;
    });
  },
});

export const {} = audioSlice.actions;
export default audioSlice.reducer;
