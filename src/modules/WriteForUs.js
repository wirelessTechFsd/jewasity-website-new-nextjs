import React, { useEffect } from "react";
import SEO from "../commonComponents/SEO";

export default function WriteForUs() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <SEO title={"Write for Us"}/>
      <div className="mt-[80px] max-w-[80%] mx-auto">
        <h1 className="mb-[20px] text-[50px] md:text-[40px] sm:text-[30px] xs:text-[30px] text-[#37475B] ">
          Write for Us
        </h1>
        <p className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark">
          Are you passionate about Jewish news and culture? Join our team of
          writers at Jewasity. We welcome contributions on a variety of topics,
          including community news, world events, and cultural insights.
        </p>
        <p className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark  font-semibold mt-1 mb-2">
          How to Submit:
        </p>
        <ul>
          <li className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark">
            - Send your article proposal or draft to
            <a href="mailto:office@Jewasity.com" className="ml-1">
              office@Jewasity.com
            </a>
            .
          </li>
          <li className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark">
            - Include a brief bio and any relevant writing samples.
          </li>
          <li className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark">
            - Our editorial team will review your submission and get back to
            you.
          </li>
          <li className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark">
            - We look forward to hearing from you!
          </li>
        </ul>
      </div>
    </div>
  );
}
