import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import Layout from "../modules/Layout";
import Home from "../modules/Home";
import Details from "../modules/Blog";
import Music from "../modules/Music";
import Lock from "../modules/lock";
import BlogByCategory from "../modules/BlogByCategory";
import Permissions from "../modules/Permissions";
import WriteForUs from "../modules/WriteForUs";
import TermAndConditions from "../modules/TermAndConditions";
import PrivacyPolicy from "../modules/PrivacyPolicy";
import Peeks from "../modules/Peeks";
import MaintenanceMode from "../modules/MaintainanceMode";
import NotFound from "../modules/NotFound";
import AdvertiseWithUs from "../modules/AdvertiseWithUs";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import Influasity from "../modules/Influasity";

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: <Lock />,
  //   errorElement: <NotFound />,
  // },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout>
          <Home />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/peeks",
    element: (
      <PrivateRoute>
        <Layout>
          <Peeks />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/music",
    element: (
      <PrivateRoute>
        <Layout>
          <Music />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/Influensity",
    element: (
      <PrivateRoute>
        <Layout>
          <Influasity />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/blog/:redirect",
    element: (
      <PrivateRoute>
        <Layout>
          <Details />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/blogs-list/:category",
    element: (
      <PrivateRoute>
        <Layout>
          <BlogByCategory />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/tag-blogs-list/:tags",
    element: (
      <PrivateRoute>
        <Layout>
          <BlogByCategory />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/location-blogs-list/:location",
    element: (
      <PrivateRoute>
        <Layout>
          <BlogByCategory />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/permissions",
    element: (
      <PrivateRoute>
        <Layout>
          <Permissions />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/write-for-us",
    element: (
      <PrivateRoute>
        <Layout>
          <WriteForUs />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/terms-and-conditions",
    element: (
      <PrivateRoute>
        <Layout>
          <TermAndConditions />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },

  {
    path: "/privacy",
    element: (
      <PrivateRoute>
        <Layout>
          <PrivacyPolicy />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/advertise-with-us",
    element: (
      <PrivateRoute>
        <Layout>
          <AdvertiseWithUs />
        </Layout>
      </PrivateRoute>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "/maintenance-mode",
    element: (
      <PublicRoute>
        <MaintenanceMode />
      </PublicRoute>
    ),
    errorElement: <NotFound />,
  },
]);
