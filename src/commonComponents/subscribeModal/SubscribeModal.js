import React, { useEffect } from "react";
import MyDropzone from "../dropzone/Dropzone";
import Image from "../image/Image";
import Button from "../button/Button";
import { useSubscription } from "../../hooks/useSubscription";
import InputField from "../input/InputField";

const SubscribeModal = ({ isOpen, onClose }) => {
  const {
    phone,
    setPhone,
    subscribeHandler,
    loading,
    error,
    email,
    setError,
    setEmail,
    consent, setConsent
  } = useSubscription(isOpen);
  useEffect(() => {
    if (!loading) {
      onClose();
    }
  }, [loading]);
  useEffect(() => {
    setError("");
  }, [email, phone]);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none rounded-lg">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="relative w-[700px] max-w-[700px]  overflow-auto mx-auto my-6 bg-white py-6 px-8 rounded-lg">
            {/* Modal content */}
            <div className="modal-content">
              <div className="flex items-start justify-between">
                <h3 className="xl:text-[24px] lg:text-[24px] md:text-[24px] text-[20px] font-bold">
                  Subscribe
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Image src={"/images/cross.png"} />
                </button>
              </div>
              <div className="modal-body">
                <form className="space-y-5  mt-7">
                  <div className="mt-2">
                    <label
                      htmlFor="email"
                      className="text-[16px] font-semibold"
                    >
                      Email
                    </label>
                    <InputField
                      fieldType="input"
                      type="text"
                      placeholder="Email"
                      value={email}
                      className={"w-full mt-2"}
                      onChange={(e) => setEmail(e.target.value)}
                      loading={loading}
                      error={error}
                    />
                  </div>
                  <div className="mt-2">
                    <label
                      htmlFor="email"
                      className="text-[16px] font-semibold"
                    >
                      Phone Number
                    </label>
                    <InputField
                      fieldType="input"
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      className={"w-full mt-2"}
                      onChange={(e) => setPhone(e.target.value)}
                      loading={loading}
                      error={error}
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      type="checkbox"
                      id="consent"
                      className="mr-2"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <label htmlFor="consent" className="text-[16px]">
                      By providing your phone number, you consent to receive SMS
                      news updates from Jewasity. Message and data rates may
                      apply. You can unsubscribe at any time by replying 'STOP'
                      to opt out.
                    </label>
                  </div>
                </form>
              </div>
              {error && (
                <p className="text-[14px] text-red-400  text-center mt-2">
                  {error}
                </p>
              )}
              <div className="modal-footer">
                <Button
                  title={"Subscribe"}
                  buttonStyle={`px-[24px] py-[15px] bg-primary text-white-2 rounded-[13px] w-full ${
                    error ? "mt-2" : "mt-4"
                  }`}
                  textStyle={"text-[18px]"}
                  loading={loading}
                  onClick={subscribeHandler}
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

export default SubscribeModal;
