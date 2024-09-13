import React from "react";
import { useContact } from "../hooks/useContact";
import InputField from "../commonComponents/input/InputField";
import Image from "../commonComponents/image/Image";
import Button from "../commonComponents/button/Button";
import SEO from "../commonComponents/SEO";
export default function AdvertiseWithUs() {
  const {
    state,
    advertiseHandler,
    loading,
    error,
    errorMessage,
    ctaStateChangeHandler,
    setErrorMessage,
    onErrorChange,
  } = useContact(false);
  return (
    <>
      <SEO title={"Advertise with us"} />
      <div className="max-w-[50%] ml-[auto] mr-[auto] mt-16">
        {/* Modal content */}
        <div className="modal-content">
          <div className="flex items-start justify-between">
            <h3 className=" text-[50px] md:text-[40px] sm:text-[30px] xs:text-[30px] text-[#37475B]">
              Advertise with us
            </h3>
          </div>
          <div className="modal-body">
            <form className="space-y-5 mt-7">
              <div className="mt-2">
                <label
                  htmlFor="firstName"
                  className="text-[16px] font-semibold"
                >
                  First Name
                </label>
                <InputField
                  fieldType="input"
                  type="text"
                  placeholder="First Name"
                  value={state.firstName}
                  className={"w-full mt-2"}
                  onChange={(e) =>
                    ctaStateChangeHandler("firstName", e.target.value)
                  }
                  error={error.firstName}
                  loading={loading}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="lastName" className="text-[16px] font-semibold">
                  Last Name
                </label>
                <InputField
                  fieldType="input"
                  type="text"
                  placeholder="Last Name"
                  value={state.lastName}
                  className={"w-full mt-2"}
                  onChange={(e) =>
                    ctaStateChangeHandler("lastName", e.target.value)
                  }
                  error={error.lastName}
                  loading={loading}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="phoneNumber"
                  className="text-[16px] font-semibold"
                >
                  Phone Number
                </label>
                <InputField
                  fieldType="input"
                  type="text"
                  placeholder="Phone Number"
                  value={state.phoneNumber}
                  className={"w-full mt-2"}
                  onChange={(e) => {
                    const value = e.target.value;
                    const phoneRegex = /^[0-9]{10}$/;

                    // Update the state with the phone number
                    ctaStateChangeHandler("phoneNumber", value);

                    // Validate the phone number
                    if (!phoneRegex.test(value.trim())) {
                      onErrorChange("phoneNumber", true);
                      setErrorMessage("Please enter a valid phone number.");
                    } else {
                      onErrorChange("phoneNumber", false);
                      setErrorMessage(""); // Clear the error message if the phone number is valid
                    }
                  }}
                  error={error.phoneNumber}
                  loading={loading}
                />
              </div>
              <div className="mt-2">
                <label htmlFor="message" className="text-[16px] font-semibold">
                  Message
                </label>
                <InputField
                  type="text"
                  placeholder="Message"
                  value={state.message}
                  className={"w-full mt-2 h-[150px]"}
                  onChange={(e) =>
                    ctaStateChangeHandler("message", e.target.value)
                  }
                  error={error.message}
                  loading={loading}
                />
              </div>
            </form>
          </div>
          {errorMessage && (
            <p className="text-[14px] text-red-400 mt-1 text-center">
              {errorMessage}
            </p>
          )}
          <div className="modal-footer">
            <Button
              title={"Send Message"}
              buttonStyle={`px-[24px] py-[15px] bg-primary text-white-2 rounded-[13px] w-full ${
                error ? "mt-2" : "mt-4"
              }`}
              textStyle={"text-[18px]"}
              loading={loading}
              onClick={advertiseHandler}
              disable={loading}
            />
          </div>
        </div>
      </div>
    </>
  );
}
