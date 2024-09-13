import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch, useSelector } from "react-redux";
import {
  compressVideo,
  getVideos,
  uploadThumbnailVideo,
  uploadVideo,
  videoThumbnail,
} from "../redux/slices/video.slice";
import toast from "react-hot-toast";
import { Client } from "../helpers/axiosInstance";

export const useFormModal = ({ isOpen }) => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [thumbnailFileSize, setThumbnailFileSize] = useState(0);
  const [compressloading, setCompressLoading] = useState(false);
  const [thumbanilLoading, setthumbnailLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState([]);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [urls, setUrls] = useState({
    videoUrl: "",
    thumbnailUrl: "",
  });
  const [state, setState] = useState({
    title: "",
    description: "",
    buttonTitle: "",
    buttonLink: "",
    file: null,
    thumbnailFile: null,
  });
  const [error, setError] = useState({
    title: false,
    description: false,
    buttonTitle: false,
    buttonLink: false,
    file: false,
    thumbnailFile: false,
    captchaVerified: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const onFieldChange = (prevState, key, value) => {
    setState({
      ...prevState,
      [key]: value,
    });
  };
  const onErrorChange = (key, value) => {
    setError((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  const onChange = async (value) => {
    try {
      const verifyCaptcha = await Client.post("verify-captcha", {
        token: value,
      });
      if (verifyCaptcha.status === 200) {
        setCaptchaVerified(true);
        setError((prevState) => ({
          ...prevState,
          captchaVerified: false,
        }));
        setErrorMessage('')
      } else {
        setCaptchaVerified(false);
        setError((prevState) => ({
          ...prevState,
          captchaVerified: false,
        }));
        setErrorMessage('Correct! You can proceed.')
      }
    } catch (error) {
      toast.error("Captcha Not Verified");
      setCaptchaVerified(false);
      setError((prevState) => ({
        ...prevState,
        captchaVerified: false,
      }));
      setErrorMessage('')
    }
  };
  useEffect(() => {
    setError({
      firstName: false,
      lastName: false,
      email: false,
      message: false,
    });
    setErrorMessage("");
  }, [isOpen]);
  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      setFileSize((file?.size / (1024 * 1024)).toFixed(2));
      reader.readAsDataURL(file);
      setUploadedFiles([file?.name]);
      onFieldChange(state, "file", file);
      formData.append("file", file);
      setCompressLoading(true);
      dispatch(
        compressVideo({
          payload: formData,
          callback: (data) => {
            if (data) {
              setUrls((prevUrl) => ({
                ...prevUrl,
                videoUrl: data?.videoUrl,
              }));
              setCompressLoading(false);
            } else {
              setCompressLoading(false);
              toast.error("An Error Occurred While Uploading...");
              setErrorMessage("An Error Occurred While Uploading...");
            }
          },
        })
      );
    });
  }, []);
  const onThumbnailDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      setThumbnailFileSize((file?.size / (1024 * 1024)).toFixed(2));
      reader.readAsDataURL(file);
      setThumbnail([file?.name]);
      onFieldChange(state, "thumbnailFile", file);
      formData.append("file", file);
      formData.append("type", "video");
      setthumbnailLoading(true);
      dispatch(
        uploadThumbnailVideo({
          payload: formData,
          callback: (data) => {
            if (data) {
              setUrls((prevUrl) => ({
                ...prevUrl,
                thumbnailUrl: data?.imageUrl,
              }));
              setthumbnailLoading(false);
            } else {
              setthumbnailLoading(false);
              toast.error("An Error Occurred While Uploading...");
              setErrorMessage("An Error Occurred While Uploading...");
            }
          },
        })
      );
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "video/mp4": [".mp4", ".MP4"],
    },
    maxFiles: 1,
    multiple: false,
  });
  //for thumbnail not in use
  const {
    getRootProps: getThumbnailProps,
    getInputProps: getThumbnailInputProps,
    isDragActive: isThumbnailDragActive,
  } = useDropzone({
    onDrop: onThumbnailDrop, // Ensure this is correct
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    multiple: false,
  });
  //
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);
  useEffect(() => {
    if (state.title?.length > 0) {
      onErrorChange("title", false);
    }
    if (state.description?.length > 0) {
      onErrorChange("description", false);
    }

    if (state.file) {
      onErrorChange("file", false);
    }
  }, [state.title, state.description, state.file]);

  const uploadVideoHandler = () => {
    try {
      setLoading(true);
      let hasError = false;
      if (!captchaVerified) {
        onErrorChange("captchaVerified", true);
        hasError = true;
      }
      if (hasError) {
        setLoading(false);
        setErrorMessage("Please Verify Captcha.");
        return false;
      }

      // Validate fields
      if (!state.title) {
        onErrorChange("title", true);
        hasError = true;
      }

      // Prepare form data

      // if (urls?.thumbnailUrl) {
      //   if (!urls?.videoUrl) {
      //     onErrorChange("file", true);
      //     hasError = true;
      //   }
      //   if (hasError) {
      //     setLoading(false);
      //     setErrorMessage("Please fill in all required fields.");
      //     return false;
      //   }

      //   dispatch(
      //     uploadVideo({
      //       payload: {
      //         title: state.title,
      //         description: state.description,
      //         thumbnailUrl: urls?.thumbnailUrl,
      //         videoUrl: urls?.videoUrl,
      //       },
      //       callback: (data) => {
      //         if (data?.data) {
      //           // Dispatch get videos action
      //           dispatch(
      //             getVideos({
      //               payload: {},
      //               callback: (data) => {
      //                 if (data) {
      //                   setLoading(false);
      //                   setState({
      //                     title: "",
      //                     description: "",
      //                     buttonTitle: "",
      //                     buttonLink: "",
      //                     file: "",
      //                   });
      //                   setThumbnail([]);
      //                   setUploadedFiles([]);
      //                   toast.success("Video uploaded successfully");
      //                 }
      //               },
      //             })
      //           );
      //         } else {
      //           setLoading(false);
      //           setErrorMessage("An error occurred while uploading...");
      //         }
      //       },
      //     })
      //   );
      // } else {
        if (!state.file) {
          onErrorChange("file", true);
          hasError = true;
        }
        if (hasError) {
          setLoading(false);
          setErrorMessage("Please fill in all required fields.");
          return false;
        }

        const formData = new FormData();
        formData.append("file", state.file);
        formData.append("type", "video");
        dispatch(
          videoThumbnail({
            payload: formData,
            callback: (data) => {
              if (data?.thumbnailUrl) {
                // Dispatch video upload action
                dispatch(
                  uploadVideo({
                    payload: {
                      title: state.title,
                      description: state.description,
                      thumbnailUrl: data?.thumbnailUrl,
                      videoUrl: urls.videoUrl,
                    },
                    callback: (data) => {
                      if (data?.data) {
                        // Dispatch get videos action
                        dispatch(
                          getVideos({
                            payload: {},
                            callback: (data) => {
                              if (data) {
                                setLoading(false);
                                setState({
                                  title: "",
                                  description: "",
                                  buttonTitle: "",
                                  buttonLink: "",
                                  file: "",
                                });
                                setThumbnail([]);
                                setUploadedFiles([]);
                                toast.success("Video uploaded successfully");
                              }
                            },
                          })
                        );
                      } else {
                        setLoading(false);
                        setErrorMessage("An error occurred while uploading...");
                      }
                    },
                  })
                );
              } else {
                setLoading(false);
                setErrorMessage("Failed to generate video thumbnail.");
              }
            },
          })
        );
      // }
      setCaptchaVerified(false);
      // Dispatch video thumbnail action
    } catch (error) {
      setLoading(false);
      setErrorMessage("An error occurred while uploading...");
      console.error("Something went wrong:", error);
    }
  };
  const clearDropZone = () => {
    setUploadedFiles([]);
  };
  const clearThumbnailDropZone = () => {
    setThumbnail([]);
  };
console.log(error)
  return {
    uploadedFiles,
    setUploadedFiles,
    onDrop,
    getRootProps,
    getInputProps,
    isDragActive,
    onFieldChange,
    state,
    setState,
    error,
    uploadVideoHandler,
    loading,
    errorMessage,
    fileSize,
    compressloading,
    clearDropZone,
    getThumbnailProps,
    getThumbnailInputProps,
    isThumbnailDragActive,
    thumbnail,
    setThumbnail,
    onThumbnailDrop,
    thumbanilLoading,
    setthumbnailLoading,
    clearThumbnailDropZone,
    thumbnailFileSize,
    onChange,
    captchaVerified,
    setCaptchaVerified,
    setError,
    setErrorMessage
  };
};
