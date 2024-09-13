import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../helpers/axiosInstance";
const initialState = {
  loading: false,
  influencity: [],
};

export const getInfluencers = createAsyncThunk(
    "influencer/getInfluencers",
    async (data, thunkAPI) => {
      try {
        const response = await Client.get(`influencity/get-influencer`);
        data.callback && data.callback(response.data);
        return response.data;
      } catch (error) {
        data.callback && data.callback(error.response.data);
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );
  

const influencerSlice = createSlice({
  name: "influencer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getInfluencers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getInfluencers.fulfilled, (state, action) => {
      state.influencity = action.payload.influencers;
      state.loading = false;
    });
    builder.addCase(getInfluencers.rejected, (state) => {
      state.loading = false;
    });
   
  },
});


export const {} = influencerSlice.actions;
export default influencerSlice.reducer;
