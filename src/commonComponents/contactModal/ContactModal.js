import React, { useEffect } from "react";
import MyDropzone from "../dropzone/Dropzone";
import Image from "../image/Image";
import Button from "../button/Button";
import InputField from "../input/InputField";
import { useContact } from "../../hooks/useContact";

const ContactModal = ({ isOpen, onClose }) => {
  const {
    state,
    contactHandler,
    loading,
    error,
    errorMessage,
    ctaStateChangeHandler,
  } = useContact(isOpen);

  useEffect(() => {
    if (!loading) {
      onClose();
    }
  }, [loading]);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="relative w-[700px] max-w-[90%] max-h-screen overflow-y-auto mx-auto my-6 bg-white py-6 px-8 rounded-lg">
            {/* Modal content */}
            <div className="modal-content">
              <div className="flex items-start justify-between">
                <h3 className="xl:text-[24px] lg:text-[24px] md:text-[24px] text-[20px] font-bold">
                  Contact
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Image src={"/images/cross.png"} />
                </button>
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
                    <label
                      htmlFor="lastName"
                      className="text-[16px] font-semibold"
                    >
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
                      htmlFor="email"
                      className="text-[16px] font-semibold"
                    >
                      Email
                    </label>
                    <InputField
                      fieldType="input"
                      type="email"
                      placeholder="Email"
                      value={state.email}
                      className={"w-full mt-2"}
                      onChange={(e) =>
                        ctaStateChangeHandler("email", e.target.value)
                      }
                      error={error.email}
                      loading={loading}
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="message"
                      className="text-[16px] font-semibold"
                    >
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
                <p className="text-[14px] text-red-400 mt-1 text-center">{errorMessage}</p>
              )}
              <div className="modal-footer">
                <Button
                  title={"Send Message"}
                  buttonStyle={`px-[24px] py-[15px] bg-primary text-white-2 rounded-[13px] w-full ${
                    error ? "mt-2" : "mt-4"
                  }`}
                  textStyle={"text-[18px]"}
                  loading={loading}
                  onClick={contactHandler}
                  disable={loading}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactModal;
