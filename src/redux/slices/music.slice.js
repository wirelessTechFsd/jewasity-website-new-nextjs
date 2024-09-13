import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../helpers/axiosInstance";
const initialState = {
  music: [],
  loading: false,
  compressLoading: false,
  musicLinks: [],
};
export const getMusic = createAsyncThunk(
  "music/getMusic",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`music?page=${data?.payload}`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllMusicLinks = createAsyncThunk(
  "music/getAlMusicLinks",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `music/get-all-music-links?page=${data?.payload}`
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getVideosByDate = createAsyncThunk(
  "video/getVideosByDate",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `video/get-videos-by-date?${data?.payload}`
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const compressVideo = createAsyncThunk(
  "video/compressVideo",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post(`video/compress-video`, data?.payload);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const videoThumbnail = createAsyncThunk(
  "video/compressVideo",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post(
        `video/cut-thumbnail-video`,
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
export const uploadVideo = createAsyncThunk(
  "video/uploadVideo",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post("video/upload", data?.payload);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const downloadVideo = createAsyncThunk(
  "video/downloadVideo",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `video/download-video/${data?.payload}`
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
const musicSlice = createSlice({
  name: "music",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMusic.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMusic.fulfilled, (state, { payload }) => {
      state.music = payload?.data?.videos;
      state.loading = false;
    });
    builder.addCase(getMusic.rejected, (state, payload) => {
      state.loading = false;
    });
    builder.addCase(getAllMusicLinks.pending, (state) => {});
    builder.addCase(getAllMusicLinks.fulfilled, (state, { payload }) => {
      state.musicLinks = payload?.data;
    });
    builder.addCase(getAllMusicLinks.rejected, (state, payload) => {});
  },
});

export const {} = musicSlice.actions;
export default musicSlice.reducer;
