"use client";
import React from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import mixpanel from "mixpanel-browser";
import Navbar from "./LayoutNav";
import PrivateRoute from "@/navigation/PrivateRoute";
mixpanel.init("4fbbe7193eeaa9f4e91b347194243689");

const LayoutMain = ({ children }) => {
  return (
    <Provider store={store}>
      <PrivateRoute>
        <Navbar>{children}</Navbar>
      </PrivateRoute>
    </Provider>
  );
};

export default LayoutMain;
