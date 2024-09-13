import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "../image/Image";
import Loader from "../loader/Loader";

export default function MyDropzone({
  uploadedFiles,
  setUploadedFiles,
  onDrop,
  getRootProps,
  getInputProps,
  isDragActive,
  compressloading,
  clearDropZone,
  fileSize,
}) {
  return (
    <div
      className="border-2 relative border-dashed border-gray-400 p-8 rounded-md text-center min-h-[120px]"
      aria-disabled={compressloading}
    >
      {uploadedFiles?.length > 0 && !compressloading && (
        <span
          className="absolute top-1 right-1 cursor-pointer"
          onClick={clearDropZone}
        >
          <Image src={"/images/cross.png"} height={20} width={20} />
        </span>
      )}
      {compressloading ? (
        <div className="flex justify-center items-center w-full mt-3">
          <Loader height={40} width={40} color="#FF3C00" />
          <div className="ml-2 flex flex-col justify-start items-start gap-0">
            <p className="text-[16px] font-medium font-dmSans">
            Uploading video. Please wait, this may take some time.
            </p>
            <p className="text-[14px] font-medium font-dmSans mt-[-5px]"> File Size: {fileSize} MB</p>
          </div>
        </div>
      ) : (
        <div {...getRootProps()} className="w-full">
          {!compressloading && <input {...getInputProps()} />}
          {uploadedFiles?.length > 0 ? (
            <div>
              <p className="text-[16px] font-medium font-dmSans">
                Uploaded File:
              </p>
              <ul>
                {uploadedFiles?.map((fileName, index) => (
                  <li
                    key={index}
                    className="text-[16px] font-medium font-dmSans"
                  >
                    {fileName?.length > 30
                      ? fileName?.slice(0, 30) + "..."
                      : fileName}
                  </li>
                ))}
              </ul>
            </div>
          ) : isDragActive ? (
            <p>Drop the MP4 videos here ...</p>
          ) : (
            <div className="flex items-center justify-center flex-col gap-3 mt-[-10px]">
              <Image src={"/images/upload.png"} height={30} width={30} />
              <p className="xs:text-[18px]  lg:text-[18px] md:text-[18px] text-[16px] font-dmSans font-semibold">
                Upload Your File Here
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
