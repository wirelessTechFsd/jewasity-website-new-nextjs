import React from "react";
import { Oval } from "react-loader-spinner";

export default function Loader({ height, width, color = "#fff" }) {
  return (
    <Oval
      visible={true}
      height={height}
      width={width}
      color={color}
      ariaLabel="oval-loading"
      wrapperStyle={{}}
      wrapperClass=""
    />
  );
}
