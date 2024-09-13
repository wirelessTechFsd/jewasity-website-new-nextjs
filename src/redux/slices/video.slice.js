import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../helpers/axiosInstance";
const initialState = {
  videos: [],
  loading: false,
  compressLoading: false,
  videoLinks: [],
  recentFeaturedVideos: [],
  peeks: [],
  featuredVideos: [],
};
export const searchByArticle = createAsyncThunk(
  "video/searchByArticle",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `video/search-by-article-name?title=${data?.payload}`
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getRecentFeaturedVideos = createAsyncThunk(
  "video/getRecentFeaturedVideos",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`video/recent-featured-videos`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getVideos = createAsyncThunk(
  "video/getVideos",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`video?page=${data?.payload}`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllPeeks = createAsyncThunk(
  "video/getPeeks",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `video/peeks?page=${data?.payload}&pageSize=${30}`
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const watchVideo = createAsyncThunk(
  "video/watchVideo",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`video/${data?.payload}/watch`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllVideosLinks = createAsyncThunk(
  "video/getAllVideosLinks",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `video/get-all-videos-links?page=${data?.payload}`
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getAllPeeksVideosLinks = createAsyncThunk(
  "video/getAllPeeksVideosLinks",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `video/all-peeks-links?page=${data?.payload}`
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
export const uploadThumbnailVideo = createAsyncThunk(
  "video/uploadThumbnail",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post(
        `video/upload-image-user`,
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
export const getSingleVideo = createAsyncThunk(
  "video/getSingleVideo",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `video/get-single-video/${data.payload}`
      );
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
const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchByArticle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchByArticle.fulfilled, (state, { payload }) => {
      state.videos = payload?.video;
      state.loading = false;
    });
    builder.addCase(searchByArticle.rejected, (state, payload) => {
      state.loading = false;
    });
    builder.addCase(getVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideos.fulfilled, (state, { payload }) => {
      state.videos = payload?.data?.videos;
      state.loading = false;
    });
    builder.addCase(getVideos.rejected, (state, payload) => {
      state.loading = false;
    });
    builder.addCase(getAllPeeks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllPeeks.fulfilled, (state, { payload }) => {
      state.peeks = payload?.data?.videos;
      state.loading = false;
    });
    builder.addCase(getAllPeeks.rejected, (state, payload) => {
      state.loading = false;
    });

    builder.addCase(getVideosByDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVideosByDate.fulfilled, (state, { payload }) => {
      state.videos = payload?.data?.videos;
      state.loading = false;
    });
    builder.addCase(getVideosByDate.rejected, (state) => {
      state.loading = false;
    });

    builder.addCase(uploadVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadVideo.fulfilled, (state, { payload }) => {
      state.videos = payload?.data?.videos;
      state.loading = false;
    });
    builder.addCase(uploadVideo.rejected, (state, payload) => {
      state.loading = false;
    });

    builder.addCase(getAllVideosLinks.pending, (state) => {});
    builder.addCase(getAllVideosLinks.fulfilled, (state, { payload }) => {
      state.videoLinks = payload?.data;
      state.featuredVideos = payload?.featuredVideo;
    });
    builder.addCase(getAllVideosLinks.rejected, (state, payload) => {});
    builder.addCase(getAllPeeksVideosLinks.pending, (state) => {});
    builder.addCase(getAllPeeksVideosLinks.fulfilled, (state, { payload }) => {
      state.videoLinks = payload?.data;
      state.featuredVideos = payload?.featuredVideo;
    });
    builder.addCase(getAllPeeksVideosLinks.rejected, (state, payload) => {});
    builder.addCase(getRecentFeaturedVideos.pending, (state) => {});
    builder.addCase(getRecentFeaturedVideos.fulfilled, (state, { payload }) => {
      state.recentFeaturedVideos = payload?.data;
    });
    builder.addCase(getRecentFeaturedVideos.rejected, (state, payload) => {});
  },
});

export const {} = videoSlice.actions;
export default videoSlice.reducer;
