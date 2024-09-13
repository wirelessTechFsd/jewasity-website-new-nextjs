import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Client } from "../../helpers/axiosInstance";
const initialState = {
  blogs: [],
  loading: false,
  blogsByCategory: {},
  latestStories: [],
  recentBlogs: [],
  searchResult: [],
  randomAds: [],
  blogsList: [],
  locations: [],
};
export const getBlog = createAsyncThunk(
  "blog/getBlog",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`blog/get-blog/${data?.payload}`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getRecentBlogs = createAsyncThunk(
  "blog/getRecentBlogs",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`blog/get-recent-blogs`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBlogBycategory = createAsyncThunk(
  "blog/blogs-by-category",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`blog/get-blogs/blogs-by-category`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getSearchedBlog = createAsyncThunk(
  "blog/searchBlog",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(
        `blog/search-blog?query=${data?.payload}`
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getRandomAds = createAsyncThunk(
  "ads/getRandomAds",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`ads/get-random-ads`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const addBlogComment = createAsyncThunk(
  "blog/addComment",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post(`blog/add-comment`, data.payload);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBlogsListByCategory = createAsyncThunk(
  "blog/blogList",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`blog/blog-list/${data?.payload}`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBlogsListByTags = createAsyncThunk(
  "blog/tagBlogsList",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`blog/blogs-list/${data?.payload}`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBlogsLocations = createAsyncThunk(
  "blog/getBlogsLocations",
  async (data, thunkAPI) => {
    try {
      const response = await Client.get(`blog/get-locations`);
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getBlogsByLocations = createAsyncThunk(
  "blog/getBlogsByLocations",
  async (data, thunkAPI) => {
    try {
      const response = await Client.post(
        `blog/location-blogs-list`,
        data.payload
      );
      data.callback && data.callback(response.data);
      return response.data;
    } catch (error) {
      data.callback && data.callback(error.response.data);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlog: (state, action) => {
      state.blogs = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBlog.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlog.fulfilled, (state, action) => {
      state.loading = false;
      state.blogs = action.payload?.data;
    });
    builder.addCase(getBlog.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getBlogBycategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlogBycategory.fulfilled, (state, action) => {
      state.loading = false;
      state.latestStories = action.payload?.data;
      state.blogsByCategory = action.payload?.blogsByCategory;
    });
    builder.addCase(getBlogBycategory.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getRecentBlogs.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRecentBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.recentBlogs = action.payload?.data;
    });
    builder.addCase(getRecentBlogs.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getRandomAds.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRandomAds.fulfilled, (state, action) => {
      state.loading = false;
      state.randomAds = action.payload?.data;
    });
    builder.addCase(getRandomAds.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getBlogsListByCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlogsListByCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.blogsList = action.payload?.data;
    });
    builder.addCase(getBlogsListByCategory.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(getBlogsListByTags.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlogsListByTags.fulfilled, (state, action) => {
      state.loading = false;
      state.blogsList = action.payload?.data;
    });
    builder.addCase(getBlogsListByTags.rejected, (state, action) => {
      state.blogsList = [];
      state.loading = false;
    });
    builder.addCase(getBlogsLocations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlogsLocations.fulfilled, (state, action) => {
      state.loading = false;
      state.locations = action.payload?.data;
    });
    builder.addCase(getBlogsLocations.rejected, (state, action) => {
      state.locations = [];
      state.loading = false;
    });
    builder.addCase(getBlogsByLocations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBlogsByLocations.fulfilled, (state, action) => {
      console.log("request done", action.payload);
      state.loading = false;
      state.blogsList = action.payload?.data;
    });
    builder.addCase(getBlogsByLocations.rejected, (state, action) => {
      state.blogsList = [];
      state.loading = false;
    });
    builder.addCase(getSearchedBlog.fulfilled, (state, action) => {
      state.searchResult = action.payload?.blogs;
    });
  },
});

export const { setBlog } = blogSlice.actions;
export default blogSlice.reducer;
