import React, { useEffect } from "react";
import SEO from "../commonComponents/SEO";

const terms = [
  {
    title: "1. Acceptance of Terms",
    description:
      "By accessing and using Jewasity.com, you agree to comply with these Terms and Conditions. If you do not agree, please refrain from using our website.",
  },
  {
    title: "2. Use of Content",
    description:
      "All content on Jewasity.com is provided for informational purposes only. Unauthorized use, reproduction, or distribution of our content is strictly prohibited.",
  },
  {
    title: "3. User Conduct",
    description:
      "You agree not to use our site for any unlawful activities or engage in behavior that could harm our community.",
  },
  {
    title: "4. Intellectual Property",
    description:
      "All intellectual property rights related to our content and services are owned by Jewasity. Reproduction, distribution, or the creation of derivative works from our content without our explicit permission is prohibited.",
  },
  {
    title: "5. Limitation of Liability",
    description:
      "Jewasity is not responsible for any damages resulting from the use of our site or the information provided.",
  },
  {
    title: "6. Changes to Terms",
    description:
      "We reserve the right to modify these Terms and Conditions at any time. Your continued use of the site signifies acceptance of the updated terms.",
  },
];

export default function TermAndConditions() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  return (
    <div>
      <SEO title={"Terms And Conditions"} />
      <div className="mt-[80px] max-w-[80%] mx-auto">
        <h1 className="mb-[20px] text-[50px] md:text-[40px] sm:text-[30px] xs:text-[30px] text-[#37475B] ">
          Terms & Conditions
        </h1>
        <p className="text-[22px] sm:text-[18px] xs:text-[16px] text-grey-dark font-semibold mb-2">
          How to Submit:
        </p>
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
        <p className="text-[18px] sm:text-[16px] xs:text-[14px] text-grey-dark pt-8">
          By accessing and using Jewasity.com, you agree to comply with and be
          bound by these Terms and Conditions. If you do not agree, please do
          not visit our website.
        </p>
      </div>
    </div>
  );
}
