import React, { useEffect, useRef, useState } from "react";
import MyDropzone from "../dropzone/Dropzone";
import Image from "../image/Image";
import Button from "../button/Button";
import { useFormModal } from "../../hooks/useFormModal";
import InputField from "../input/InputField";
import ReCAPTCHA from "react-google-recaptcha";
import { Client } from "../../helpers/axiosInstance";
import toast from "react-hot-toast";
import MultiplicationPuzzle from "../multiplicationPuzzle/MultiplicationPuzzle";

const FormModal = ({ isOpen, onClose }) => {
  const {
    state,
    uploadedFiles,
    setUploadedFiles,
    onDrop,
    getRootProps,
    getInputProps,
    isDragActive,
    onFieldChange,
    error,
    uploadVideoHandler,
    loading,
    errorMessage,
    compressloading,
    clearDropZone,
    fileSize,
    getThumbnailProps,
    getThumbnailInputProps,
    isThumbnailDragActive,
    thumbnail,
    setThumbnail,
    onThumbnailDrop,
    thumbanilLoading,
    setthumbnailLoading,
    clearThumbnailDropZone,
    onChange,
    captchaVerified,
    setCaptchaVerified,
    thumbnailFileSize,
    setError,
    setErrorMessage,
  } = useFormModal(isOpen);
  const captchaRef = useRef(null);

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
          <div className="relative w-[90vw] max-w-[700px] max-h-screen overflow-y-auto mx-auto my-6 bg-white py-6 px-8 rounded-lg">
            {/* Modal content */}
            <div className="modal-content">
              <div className="flex items-center justify-between">
                <h3 className="xl:text-[24px] lg:text-[24px] md:text-[24px] text-[20px] font-bold mb-4">
                  Submit Video
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700 absolute right-0 mr-4 mb-4"
                >
                  <Image src={"/images/cross.png"} />
                </button>
              </div>
              <div className="modal-body" style={{ height: "auto" }}>
                <div className=" mt-3 mb-2">
                  <label htmlFor="title" className="text-[16px] font-semibold">
                    Video
                  </label>
                </div>
                <MyDropzone
                  uploadedFiles={uploadedFiles}
                  setUploadedFiles={setUploadedFiles}
                  onDrop={onDrop}
                  getRootProps={getRootProps}
                  getInputProps={getInputProps}
                  isDragActive={isDragActive}
                  compressloading={compressloading}
                  clearDropZone={clearDropZone}
                  fileSize={fileSize}
                />
                {/* <div className=" mt-3 mb-2">
                  <label htmlFor="title" className="text-[16px] font-semibold">
                    Thumbnail (Optional)
                  </label>
                </div>
                <MyDropzone
                  uploadedFiles={thumbnail}
                  setUploadedFiles={setThumbnail}
                  onDrop={onThumbnailDrop}
                  getRootProps={getThumbnailProps}
                  getInputProps={getThumbnailInputProps}
                  isDragActive={isThumbnailDragActive}
                  compressloading={thumbanilLoading}
                  clearDropZone={clearThumbnailDropZone}
                  fileSize={thumbnailFileSize}
                /> */}

                <form className="space-y-4  mt-3">
                  <div className="mt-2">
                    <div className="mb-2">
                      <label
                        htmlFor="title"
                        className="text-[16px] font-semibold"
                      >
                        Tell us what Happened
                      </label>
                    </div>
                    <InputField
                      // loading={compressloading}
                      placeholder={"Title"}
                      fieldType={"input"}
                      type={"text"}
                      className={"w-full"}
                      value={state.title}
                      error={error.title}
                      onChange={(e) =>
                        onFieldChange(state, "title", e.target.value)
                      }
                    />
                  </div>

                  {/* <div className="mt-2">
                    <label
                      htmlFor="title"
                      className="text-[16px] font-semibold"
                    >
                      Button Title
                    </label>
                    <InputField
                      loading={compressloading}
                      placeholder={"Button Title"}
                      fieldType={"input"}
                      type={"text"}
                      className={"w-full"}
                      value={state.buttonTitle}
                      error={error.buttonTitle}
                      onChange={(e) =>
                        onFieldChange(state, "buttonTitle", e.target.value)
                      }
                    />
                  </div> */}
                  {/* <div className="mt-0">
                    <label htmlFor="link" className="text-[16px] font-semibold">
                      Button Link
                    </label>
                    <InputField
                      loading={compressloading}
                      placeholder={"Button Link"}
                      fieldType={"input"}
                      type={"text"}
                      value={state.buttonLink}
                      error={error.buttonLink}
                      className={"w-full"}
                      onChange={(e) =>
                        onFieldChange(state, "buttonLink", e.target.value)
                      }
                    />
                  </div> */}
                  {/* <div className="mt-2">
                    <label
                      htmlFor="description"
                      className="text-[16px] font-semibold"
                    >
                      Description
                    </label>
                    <InputField
                      loading={compressloading}
                      placeholder={"Description"}
                      type={"text"}
                      value={state.description}
                      error={error.description}
                      className={"w-full max-h-[150px] h-[150px] mt-[0px]"}
                      onChange={(e) =>
                        onFieldChange(state, "description", e.target.value)
                      }
                    />
                  </div> */}
                </form>
              </div>
              {/* {loading && (
                <p className="text-[14px] text-primary text-center mt-1">
                  Video is uploading. Please be patient...
                </p>
              )} */}
             
              <div className="mt-6">
                {/* <ReCAPTCHA
                  sitekey={"6LcF1TUqAAAAAOjryw1Br31HPFMwzg9Thk0FikCP"}
                   size="invisible"
                  onChange={onChange}
                /> */}
                <MultiplicationPuzzle
                  setCaptchaVerified={setCaptchaVerified}
                  setError={setError}
                  setErrorMessage={setErrorMessage}
                />
              </div>
              {errorMessage && (
                <p className="text-[14px] text-red-600 text-center mt-1">
                  {errorMessage}
                </p>
              )}
              <Button
                title={"Submit"}
                buttonStyle="px-[24px] py-[15px] bg-primary text-white-2 rounded-[13px] w-full mt-3"
                textStyle={"text-[18px]"}
                onClick={uploadVideoHandler}
                loading={loading}
                disable={loading || compressloading}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormModal;
