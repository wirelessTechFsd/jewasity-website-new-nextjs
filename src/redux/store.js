import { configureStore } from "@reduxjs/toolkit";
import tokenSlice from "./slices/token.slice";
import videoSlice from "./slices/video.slice";
import subscriptionSlice from "./slices/subscription.slice";
import contactSlice from "./slices/contact.slice";
import blogSlice from "./slices/blog.slice";
import musicSlice from "./slices/music.slice";
import audioSlice from "./slices/audio.slice";
import influencerSlice from "./slices/influencity.slice";

export const store = configureStore({
  reducer: {
    token: tokenSlice,
    video: videoSlice,
    subscription: subscriptionSlice,
    contact: contactSlice,
    blog: blogSlice,
    music: musicSlice,
    audio: audioSlice,
    influencer: influencerSlice,
  },
});
