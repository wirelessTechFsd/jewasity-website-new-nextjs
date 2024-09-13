import React, { useEffect } from "react";
import SEO from "../commonComponents/SEO";

const terms = [
  {
    title: "1. Information Collection",
    description:
      "We collect the personal information you provide voluntarily when using our services, including your name, email address, and other contact details.",
  },
  {
    title: "2. Use of Information",
    description:
      "We use your information to deliver, maintain, and enhance our services, as well as to communicate with you.",
  },
  {
    title: "3. Sharing of Information",
    description:
      "Your personal information will not be shared with third parties without your consent, except where required by law.",
  },
  {
    title: "4. Data Security",
    description:
      "We employ appropriate security measures to protect your personal information from unauthorized access.",
  },
  // {
  //   title: "5. Changes to Privacy Policy",
  //   description:
  //     "Jewasity is not liable for any damages arising from the use of our site or the information provided.",
  // },
];

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <SEO title={"Privacy Policy"}/>
      <div className="mt-[80px] max-w-[80%] mx-auto">
        <h1 className="mb-[20px] text-[50px] md:text-[40px] sm:text-[30px] xs:text-[30px] text-[#37475B] ">
          Privacy Policy
        </h1>

        <>
          {terms.map((term, index) => (
            <div className="mb-3" key={index}>
              <h2 className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark  font-semibold mb-1">
                {term.title}
              </h2>
              <p className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark">
                {term.description}
              </p>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}
