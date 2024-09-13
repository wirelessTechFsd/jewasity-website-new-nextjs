import React from "react";
import SEO from "../commonComponents/SEO";

export default function NotFound() {
  return (
    <>
      <SEO title={"Not Found"} />
      <div className="flex flex-col items-center justify-center h-[100vh] w-full">
        <h1 className="text-[50px] font-bold font-dmSans ">404</h1>
        <h2 className="text-[30px] font-medium font-dmSans">Page Not Found</h2>
        <p>The page you were looking for is currently not found.</p>
      </div>
    </>
  );
}
