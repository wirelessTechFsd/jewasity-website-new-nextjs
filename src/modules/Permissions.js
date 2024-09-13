import React, { useEffect } from "react";
import SEO from "../commonComponents/SEO";

export default function Permissions() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <SEO title={"Permissions"} />
      <div className="mt-[80px] max-w-[80%] mx-auto">
        <h1 className="mb-[20px] text-[50px] md:text-[40px] sm:text-[30px] xs:text-[30px] text-[#37475B] ">
          Permissions
        </h1>
        <p className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark">
          For permission to use any content from Jewasity, please contact us at
          <a href="mailto:office@Jewasity.com" className="ml-1">
            office@Jewasity.com
          </a>
          . Please provide detailed information about the content you wish to
          use and the purpose of its use. We will then review your request and
          respond as soon as possible.
        </p>
      </div>
    </div>
  );
}
