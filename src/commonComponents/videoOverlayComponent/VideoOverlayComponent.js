// import React, { useState } from "react";
// import Image from "../image/Image";
// import Button from "../button/Button";
// import { useNavigate, useNavigation } from "react-router-dom";
// import { SERVER_URL } from "../../config/axiosConfig";
// import ShareModal from "../shareModal/ShareModal";
// import { renderDate } from "../../utils/dateFormater";
// const VideoOverlayComponent = ({
//   handleVideoClick,
//   handleTouchStart,
//   handleModalHide,
//   handleRepeatVideo,
//   setActiveIndex,
//   setVideoList,
//   width,
//   height,
//   setModalShow,
//   videosList,
//   progressWidth,
//   handleSoundChange,
//   isMuted,
//   handleNextSlide,
//   handlePrevSlide,
//   setIsPlaying,
//   blogId,
//   activeVideo,
//   isFeatured,
// }) => {
//   const navigate = useNavigate();
//   const handleVideoWatch = () => {
//     localStorage.setItem("video-watched", true);
//     setIsPlaying(true);
//   };
//   const [open, setOpen] = useState(false);
//   const [shareModal, setShareModal] = useState(false);
//   const icons = [
//     {
//       id: 0,
//       path: "/icons/download.svg",
//       onClick: () =>
//         window.open(
//           `${SERVER_URL}/v1/video/download-video/${activeVideo}`,
//           "_blank"
//         ),
//     },
//     {
//       id: 1,
//       path: "/icons/exchange.svg",
//       onClick: () => handleRepeatVideo(),
//     },
//     {
//       id: 2,
//       path: "/icons/share.svg",
//       onClick: () => setShareModal(true),
//     },
//   ];
//   return (
//     <>
//       <ShareModal
//         isOpen={shareModal}
//         onClose={() => setShareModal(false)}
//         isFeatured={isFeatured}
//       />
//       {localStorage.getItem("video-watched") ? (
//         <div
//           className={`absolute h-full w-full flex flex-col items-start justify-between   pt-[24px] z-[100] `}
//           onTouchStart={handleTouchStart}
//         >
//           <div className="flex justify-between w-full  px-[30px] sm:px[15px] xs:px-[10px]">
//             {!blogId?.featuredImageUrl &&
//               (!isMuted ? (
//                 <button
//                   class={`bg-white bg-opacity-[0.15] text-white  w-[43px] h-[43px] md:w-[40x] sm:w-[40px] xs:w-[40px] md:h-[40x] sm:h-[40px] xs:h-[40px] md:p-1 sm:p-1 xs:p-1 rounded-[100%] flex items-center justify-center`}
//                   onClick={handleSoundChange}
//                 >
//                   <Image src={"/icons/soundwave.svg"} />
//                 </button>
//               ) : (
//                 <Image
//                   src={"/icons/silent.svg"}
//                   height={width < 992 && height < 992 ? 40 : 43}
//                   width={width < 992 && height < 992 ? 40 : 43}
//                   onClick={handleSoundChange}
//                 />
//               ))}

//             {!isFeatured?.featured && (
//               <Image
//                 src={"/icons/whiteCross.svg"}
//                 height={width < 992 && height < 992 ? 40 : 43}
//                 width={width < 992 && height < 992 ? 40 : 43}
//                 onClick={() => {
//                   handleModalHide();
//                 }}
//                 className={"cursor-pointer"}
//               />
//             )}
//           </div>

//           {/* {blogId && ( */}
//           <div className="flex w-[100%] justify-between items-center h-[400px] px-[30px] sm:px[15px] xs:px-[10px]">
//             {!isFeatured?.featured && (
//               <div className="md:hidden sm:hidden xs:hidden">
//                 <button
//                   class="bg-white bg-opacity-[0.15] text-white px-4 py-2  hover:bg-opacity-70 w-[43px] md:w-[30px] sm:w-[30px] xs:w-[30px]  h-[43px] md:h-[30px] sm:h-[30px] xs:h-[30px] rounded-[100%] flex items-center justify-center"
//                   onClick={handlePrevSlide}
//                   style={{
//                     transform: "rotate(-90deg)",
//                   }}
//                 >
//                   <Image src="/images/arrow.png" />
//                 </button>
//               </div>
//             )}

//             <div onClick={handleVideoClick} className="w-[100%] h-[100%]"></div>
//             {/* */}

//             {!isFeatured?.featured && (
//               <div className="md:hidden sm:hidden xs:hidden">
//                 <button
//                   class="bg-white bg-opacity-[0.15] text-white px-4 py-2  hover:bg-opacity-70 w-[43px] md:w-[30px] sm:w-[30px] xs:w-[30px]  h-[43px] md:h-[30px] sm:h-[30px] xs:h-[30px] rounded-[100%] flex items-center justify-center"
//                   onClick={handleNextSlide}
//                   style={{
//                     transform: "rotate(90deg)",
//                   }}
//                 >
//                   <Image src="/images/arrow.png" />
//                 </button>
//               </div>
//             )}

//             {/* </div> */}
//           </div>
//           {/* )} */}
//           <div className="w-[100%] relative bg-black bg-opacity-20 px-[30px] sm:px[15px] xs:px-[10px] pt-3 ">
//             {/* {blogId && ( */}
//             <p
//               className="xl:text-[12px] text-[18px] text-white opacity-[0.5] font-regular cursor-pointer break-words max-h-[160px] overflow-y-auto  scrollbar-hide"
//               onClick={() => setOpen(!open)}
//             >
//               {(() => {
//                 const truncateText = (text, length) => {
//                   return text.length > length
//                     ? text.slice(0, length) + "..........Read more"
//                     : text;
//                 };

//                 if (blogId?.title) {
//                   return !open
//                     ? truncateText(blogId.title, 155)
//                     : blogId?.title?.slice(0, 400);
//                 } else if (isFeatured?.title) {
//                   return !open
//                     ? truncateText(isFeatured.title, 155)
//                     : isFeatured.title?.slice(0, 400);
//                 }
//                 return null;
//               })()}
//             </p>
//             {!isFeatured?.featured && (
//               <p className="xl:text-[12px] text-[18px] text-white opacity-[0.5] font-regular mt-6">
//                 {renderDate(blogId?.createdAt)}
//               </p>
//             )}
//             {/* )} */}
//             {/* {blogId && ( */}
//             <div className="mt-[24px] w-[100%] flex justify-between items-center gap-[20px]  pb-[50px]">
//               {/* {blogId?.id && ( */}
//               {(blogId?.blog?.id ||
//                 (isFeatured?.featured && isFeatured?.buttonLink)) && (
//                 <Button
//                   title={
//                     isFeatured?.featured ? isFeatured?.buttonTitle : "Read More"
//                   }
//                   textStyle={"text-[14px] text-white"}
//                   buttonStyle={
//                     "w-[55%] py-[17px] rounded-[13px] bg-gradient-to-r from-[#ff916f] via-[#ff4a12] to-[#ff3c00]"
//                   }
//                   // disable={!blogId?.blog?.id || !isFeatured?.featured}
//                   onClick={() => {
//                     setTimeout(() => {
//                       if (isFeatured?.buttonLink) {
//                         window.open(isFeatured?.buttonLink, "_blank");
//                       } else {
//                         setActiveIndex(0);
//                         setVideoList([]);
//                         setModalShow(false);
//                         navigate(`/blog/${blogId?.blog?.id}`);
//                         window.location.reload();
//                       }
//                     }, 300);
//                   }}
//                 />
//               )}

//               {/* )} */}
//               <div
//                 className={`flex gap-[43px] sm:gap-[30px] xs:gap-[30px] ${
//                   blogId?.blog?.id ||
//                   (isFeatured?.featured && isFeatured?.buttonLink)
//                     ? "w-[45%]"
//                     : "w-[100%]"
//                 }  ${
//                   blogId?.blog?.id ||
//                   (isFeatured?.featured && isFeatured?.buttonLink)
//                     ? "justify-end"
//                     : "justify-center"
//                 } sm:justify-between xs:justify-between`}
//               >
//                 {icons.map((icon) => {
//                   if (blogId?.featuredImageUrl && icon.id == 0) {
//                     return null;
//                   }
//                   return (
//                     <Image
//                       key={icon.id}
//                       src={icon.path}
//                       className={"cursor-pointer"}
//                       width={width < 762 ? 24 : 27}
//                       height={height < 762 ? 24 : 27}
//                       onClick={icon.onClick}
//                     />
//                   );
//                 })}
//               </div>
//             </div>
//             {/* )} */}

//             <div
//               className={` h-[4px]  bg-gradient-to-r from-[#ff916f] via-[#ff4a12] to-[#ff3c00] absolute bottom-0 rounded-[23px] transition-width duration-500`}
//               style={{ width: `${progressWidth}%` }}
//             />
//           </div>
//         </div>
//       ) : (
//         <div
//           className={`absolute h-full w-full flex flex-col items-start justify-between ${
//             false && "px-[30px] sm:px[15px] xs:px-[10px] pt-[24px]"
//           } z-[100]`}
//           onClick={handleVideoWatch}
//         >
//           <div className="relative w-[100%] h-[100%]">
//             <div className="absolute inset-0   backdrop-filter backdrop-blur-lg flex items-center justify-center">
//               <div className="animate-slideInRight">
//                 <div className="flex justify-center flex-col items-center blur-none">
//                   <p className="text-white text-[18px] sm:text-[14px] xs:text[14px] font-medium font-dmSans text-center">
//                     Watching Stories
//                   </p>
//                   <p className="text-white opacity-[0.6] text-[14px] sm:text-[12px] xs:text-[12px]  text-center w-[200px] mt-2">
//                     You can use these gestures to control playback
//                   </p>
//                 </div>
//                 <div className="mt-8 flex flex-col gap-4">
//                   <div className="flex items-center  w-[270px] px-4 py-2 rounded-[15px] relative overflow-hidden">
//                     {/* Blurred background */}
//                     <div
//                       className="absolute inset-0 backdrop-filter backdrop-blur-lg rounded-[15px]"
//                       style={{ backgroundColor: "rgba(192, 192, 192, 0.5)" }}
//                     ></div>
//                     {/* Content */}
//                     <div className="relative flex items-center gap-[20px]">
//                       <Image
//                         src={"/icons/arrow-2.svg"}
//                         height={20}
//                         width={20}
//                         className={"ml-2"}
//                         style={{
//                           transform: width < 762 ? "" : "rotate(90deg)",
//                         }}
//                       />
//                       <div>
//                         <p className="text-white text-[14px] sm:text-[13px] xs:text[13px] font-medium font-dmSans">
//                           Go Forward
//                         </p>
//                         <p className="text-white opacity-[0.6] text-[13px] sm:text-[11px] xs:text-[11px]">
//                           {width < 762 ? "Slide Up" : "Click Right Arrow"}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-[20px] w-[270px]  px-4 py-2">
//                     <Image
//                       src="/images/hand-click.png"
//                       height={30}
//                       width={30}
//                     />
//                     <div>
//                       <p className="text-white text-[14px] sm:text-[13px] xs:text[13px] font-medium font-dmSans">
//                         Pause Video
//                       </p>
//                       <p className="text-white opacity-[0.6] text-[13px] sm:text-[11px] xs:text-[11px]">
//                         Click on screen
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-[20px] w-[270px]  px-4 py-2">
//                     <Image
//                       src="/icons/arrow-1.svg"
//                       height={20}
//                       width={20}
//                       className={`ml-2`}
//                       style={{
//                         transform: width < 762 ? "" : "rotate(90deg)",
//                       }}
//                     />
//                     <div>
//                       <p className="text-white text-[14px] sm:text-[13px] xs:text[13px] font-medium font-dmSans">
//                         Go Previous
//                       </p>
//                       <p className="text-white opacity-[0.6] text-[13px] sm:text-[11px] xs:text-[11px]">
//                         {width < 762 ? "Slide Down" : "Click Left Arrow"}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default VideoOverlayComponent;

import React, { useState, useEffect, useRef } from "react";
import Image from "../image/Image";
import Button from "../button/Button";
import { useNavigate, useNavigation } from "react-router-dom";
import { SERVER_URL } from "../../config/axiosConfig";
import ShareModal from "../shareModal/ShareModal";
import { renderDate } from "../../utils/dateFormater";
import mixpanel from "mixpanel-browser";

const VideoOverlayComponent = ({
  handleVideoClick,
  handleTouchStart,
  handleModalHide,
  handleRepeatVideo,
  setActiveIndex,
  setVideoList,
  width,
  height,
  setModalShow,
  videosList,
  progressWidth,
  handleSoundChange,
  isMuted,
  handleNextSlide,
  handlePrevSlide,
  setIsPlaying,
  blogId,
  activeVideo,
  isFeatured,
  handleModalClick,
  isPlaying,
  isButtonVisible,
  setIsButtonVisible,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(false);

  useEffect(() => {
    let timer;
    if (isFeatured?.featured) {
      timer = setTimeout(() => {
        setShowSkipButton(true);
      }, 5000);
    }

    return () => clearTimeout(timer);
  }, [isFeatured]);

  const handleVideoWatch = () => {
    localStorage.setItem("video-watched", true);
    setIsPlaying(true);
  };

  const icons = [
    {
      id: 0,
      path: "/icons/download.svg",
      onClick: () =>
        window.open(
          `${SERVER_URL}/v1/video/download-video/${activeVideo}`,
          "_blank"
        ),
    },
    {
      id: 1,
      path: "/icons/exchange.svg",
      onClick: () => handleRepeatVideo(),
    },
    {
      id: 2,
      path: "/icons/share.svg",
      onClick: () => setShareModal(true),
    },
  ];
  const truncateText = (text, length) => {
    return text?.length > length
      ? text?.slice(0, length) + "..........Read more"
      : text;
  };
  const timeoutRef = useRef(null);

  const handleVideoClicked = () => {
    handleVideoClick();
    setIsButtonVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsButtonVisible(false);
    }, 1000);
  };

  useEffect(() => {
    setIsButtonVisible(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsButtonVisible(false);
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isPlaying]);
  const title = blogId?.title || isFeatured?.title;
  return (
    <>
      <ShareModal
        isOpen={shareModal}
        onClose={() => setShareModal(false)}
        isFeatured={isFeatured}
      />
      {localStorage.getItem("video-watched") ? (
        <div
          className={`absolute h-full w-full flex flex-col items-start justify-between pt-[24px] z-[100] `}
          onTouchStart={handleTouchStart}
        >
          <div className="flex justify-between w-full px-[30px] sm:px[15px] xs:px-[10px]">
            <div className="flex items-center gap-2 flex-row-reverse">
              {!blogId?.featuredImageUrl &&
                (!isMuted ? (
                  <button
                    className={`bg-white bg-opacity-[0.15] text-white w-[43px] h-[43px] md:w-[40x] sm:w-[40px] xs:w-[40px] md:h-[40x] sm:h-[40px] xs:h-[40px] md:p-1 sm:p-1 xs:p-1 rounded-[100%] flex items-center justify-center`}
                    onClick={handleSoundChange}
                  >
                    <Image src={"/icons/soundwave.svg"} />
                  </button>
                ) : (
                  <Image
                    src={"/icons/silent.svg"}
                    height={width < 992 && height < 992 ? 40 : 43}
                    width={width < 992 && height < 992 ? 40 : 43}
                    onClick={handleSoundChange}
                  />
                ))}
              {!blogId?.featuredImageUrl &&
                !blogId?.reelImageUrl &&
                (isPlaying ? (
                  <button
                    className={`bg-white bg-opacity-[0.15] text-white w-[43px] h-[43px] md:w-[40x] sm:w-[40px] xs:w-[40px] md:h-[40x] sm:h-[40px] xs:h-[40px] md:p-1 sm:p-1 xs:p-1 rounded-[100%] flex items-center justify-center`}
                    onClick={handleVideoClick}
                  >
                    <Image src={"/icons/pause-fill.svg"} />
                  </button>
                ) : (
                  <button
                    className={`bg-white bg-opacity-[0.15] text-white w-[43px] h-[43px] md:w-[40x] sm:w-[40px] xs:w-[40px] md:h-[40x] sm:h-[40px] xs:h-[40px] md:p-1 sm:p-1 xs:p-1 pl-[2px] rounded-[100%] flex items-center justify-center`}
                    onClick={handleVideoClick}
                  >
                    <Image src={"/icons/play-fill.svg"} />
                  </button>
                ))}
            </div>

            {!isFeatured?.featured && (
              <Image
                src={"/icons/whiteCross.svg"}
                height={width < 992 && height < 992 ? 40 : 43}
                width={width < 992 && height < 992 ? 40 : 43}
                onClick={handleModalClick}
                className={"cursor-pointer"}
              />
            )}
          </div>

          {isFeatured?.featured && (
            <div className="flex justify-start w-full">
              <div className="mt-3 ml-0 px-2 py-2 text-black bg-white bg-opacity-[0.8] text-[13px]">
                Sponsored
              </div>
            </div>
          )}
          <div className="flex w-[100%] justify-between items-center h-[400px] px-[30px] sm:px[15px] xs:px-[10px]">
            {!isFeatured?.featured && (
              <div className="md:hidden sm:hidden xs:hidden">
                <button
                  className="bg-white bg-opacity-[0.15] text-white px-4 py-2 hover:bg-opacity-70 w-[43px] md:w-[30px] sm:w-[30px] xs:w-[30px] h-[43px] md:h-[30px] sm:h-[30px] xs:h-[30px] rounded-[100%] flex items-center justify-center"
                  onClick={handlePrevSlide}
                  style={{
                    transform: "rotate(-90deg)",
                  }}
                >
                  <Image src="/images/arrow.png" />
                </button>
              </div>
            )}

            {/* <div onClick={handleVideoClick} className="w-[100%] h-[100%]"></div> */}
            {!blogId?.featuredImageUrl && !blogId?.reelImageUrl && (
              <div
                onClick={handleVideoClicked}
                className="relative w-[100%] h-[100%]"
              >
                {isButtonVisible && (
                  <button
                    className={`absolute inset-0 flex items-center justify-center w-20 h-20 bg-white bg-opacity-10 rounded-full transition-opacity duration-500 ${
                      isPlaying ? "pause-icon-animation" : "play-icon-animation"
                    }`}
                    aria-label={isPlaying ? "Pause Video" : "Play Video"}
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {isPlaying ? (
                      <span className="pause-icon animate-pause">
                        <Image
                          src={"/icons/pause-fill.svg"}
                          width={22}
                          height={22}
                        />
                      </span> // Pause icon
                    ) : (
                      <span className="play-icon animate-play">
                        <Image
                          src={"/icons/play-fill.svg"}
                          width={25}
                          height={25}
                        />
                      </span> // Play icon
                    )}
                  </button>
                )}
                {/* Your video component or content */}
              </div>
            )}

            {!isFeatured?.featured && (
              <div className="md:hidden sm:hidden xs:hidden">
                <button
                  className="bg-white bg-opacity-[0.15] text-white px-4 py-2 hover:bg-opacity-70 w-[43px] md:w-[30px] sm:w-[30px] xs:w-[30px] h-[43px] md:h-[30px] sm:h-[30px] xs:h-[30px] rounded-[100%] flex items-center justify-center"
                  onClick={handleNextSlide}
                  style={{
                    transform: "rotate(90deg)",
                  }}
                >
                  <Image src="/images/arrow.png" />
                </button>
              </div>
            )}
          </div>
          {showSkipButton && (
            <div className="flex justify-end w-full">
              <button
                className="mb-3 mr-3 px-4 py-2 text-black bg-white bg-opacity-[0.8] rounded-[50px]"
                onClick={handleNextSlide}
              >
                Skip Ad
              </button>
            </div>
          )}
          {/* <div className="w-[100%] relative bg-black bg-opacity-[0.5] px-[30px] sm:px[15px] xs:px-[10px] pt-3 "> */}
          <div
            className="w-[100%] relative  px-[30px] sm:px-[15px] xs:px-[10px] pt-3"
            style={{
              backgroundImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.69), rgba(0, 0, 0, 0.9))",
            }}
          >
            {/* <p
              className="xl:text-[12px] text-[18px] text-white opacity-[0.5] font-regular cursor-pointer break-words max-h-[160px] overflow-y-auto scrollbar-hide"
              onClick={() => setOpen(!open)}
            >
              {(() => {
                const truncateText = (text, length) => {
                  return text.length > length
                    ? text.slice(0, length) + "..........Read more"
                    : text;
                };

                if (blogId?.title) {
                  return !open
                    ? truncateText(blogId.title, 155)
                    : blogId?.title?.slice(0, 400);
                } else if (isFeatured?.title) {
                  return !open
                    ? truncateText(isFeatured.title, 155)
                    : isFeatured.title?.slice(0, 400);
                }
                return null;
              })()}
            </p> */}
            <p
              className={`xl:text-[12px] text-[18px] text-white  font-regular cursor-pointer break-words overflow-y-auto scrollbar-hide ${
                !open ? "truncate-3-lines" : ""
              }`}
              onClick={() => setOpen(!open)}
            >
              {open ? title : truncateText(title, 145)}
            </p>
            {!isFeatured?.featured && (
              <p className="xl:text-[12px] text-[18px] text-white  font-regular mt-6">
                {renderDate(blogId?.createdAt)}
              </p>
            )}
            <div className="mt-[24px] w-[100%] flex justify-between items-center gap-[20px] pb-[50px]">
              {(blogId?.blog?.id ||
                (isFeatured?.featured && isFeatured?.buttonLink)) && (
                <Button
                  title={
                    isFeatured?.featured ? isFeatured?.buttonTitle : "Read More"
                  }
                  textStyle={"text-[14px] text-white"}
                  buttonStyle={
                    "w-[55%] py-[17px] rounded-[13px] bg-gradient-to-r from-[#ff916f] via-[#ff4a12] to-[#ff3c00]"
                  }
                  onClick={() => {
                    setTimeout(() => {
                      if (isFeatured?.buttonLink) {
                        mixpanel.track("Ad Views", {
                          page: window.location.pathname,
                          title,
                        });
                        setTimeout(() => {
                          window.open(isFeatured?.buttonLink, "_blank");
                        }, 200);
                      } else {
                        setActiveIndex(0);
                        setVideoList([]);
                        setModalShow(false);
                        navigate(
                          `/blog/${blogId?.blog?.title?.replaceAll(" ", "-")}`
                        );
                        window.location.reload();
                      }
                    }, 300);
                  }}
                />
              )}

              <div
                className={`flex gap-[43px] sm:gap-[30px] xs:gap-[30px] ${
                  blogId?.blog?.id ||
                  (isFeatured?.featured && isFeatured?.buttonLink)
                    ? "w-[45%]"
                    : "w-[100%]"
                }  ${
                  blogId?.blog?.id ||
                  (isFeatured?.featured && isFeatured?.buttonLink)
                    ? "justify-end"
                    : "justify-center"
                } sm:justify-between xs:justify-between`}
              >
                {icons.map((icon) => {
                  if (blogId?.featuredImageUrl && icon.id == 0) {
                    return null;
                  }
                  return (
                    <Image
                      key={icon.id}
                      src={icon.path}
                      className={"cursor-pointer"}
                      width={width < 762 ? 24 : 27}
                      height={height < 762 ? 24 : 27}
                      onClick={icon.onClick}
                    />
                  );
                })}
              </div>
            </div>

            <div
              className={`h-[4px] bg-gradient-to-r from-[#ff916f] via-[#ff4a12] to-[#ff3c00] absolute bottom-0 rounded-[23px] transition-width duration-500`}
              style={{ width: `${progressWidth}%` }}
            />
          </div>
        </div>
      ) : (
        <div
          className={`absolute h-full w-full flex flex-col items-start justify-between ${
            false && "px-[30px] sm:px[15px] xs:px-[10px] pt-[24px]"
          } z-[100]`}
          onClick={handleVideoWatch}
        >
          <div className="relative w-[100%] h-[100%]">
            <div className="absolute inset-0 backdrop-filter backdrop-blur-lg flex items-center justify-center">
              <div className="animate-slideInRight">
                <div className="flex justify-center flex-col items-center blur-none">
                  <p className="text-white text-[18px] sm:text-[14px] xs:text[14px] font-medium font-dmSans text-center">
                    Watching Stories
                  </p>
                  <p className="text-white opacity-[0.6] text-[14px] sm:text-[12px] xs:text-[12px] text-center w-[200px] mt-2">
                    You can use these gestures to control playback
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-4">
                  <div className="flex items-center w-[270px] px-4 py-2 rounded-[15px] relative overflow-hidden">
                    <div
                      className="absolute inset-0 backdrop-filter backdrop-blur-lg rounded-[15px]"
                      style={{ backgroundColor: "rgba(192, 192, 192, 0.5)" }}
                    ></div>
                    <div className="relative flex items-center gap-[20px]">
                      <Image
                        src={"/icons/arrow-2.svg"}
                        height={20}
                        width={20}
                        className={"ml-2"}
                        style={{
                          transform: width < 762 ? "" : "rotate(90deg)",
                        }}
                      />
                      <div>
                        <p className="text-white text-[14px] sm:text-[13px] xs:text[13px] font-medium font-dmSans">
                          Go Forward
                        </p>
                        <p className="text-white opacity-[0.6] text-[13px] sm:text-[11px] xs:text-[11px]">
                          {width < 762 ? "Slide Up" : "Click Right Arrow"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-[20px] w-[270px] px-4 py-2">
                    <Image
                      src="/images/hand-click.png"
                      height={30}
                      width={30}
                    />
                    <div>
                      <p className="text-white text-[14px] sm:text-[13px] xs:text[13px] font-medium font-dmSans">
                        Pause Video
                      </p>
                      <p className="text-white opacity-[0.6] text-[13px] sm:text-[11px] xs:text-[11px]">
                        Click on screen
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-[20px] w-[270px] px-4 py-2">
                    <Image
                      src="/icons/arrow-1.svg"
                      height={20}
                      width={20}
                      className={`ml-2`}
                      style={{
                        transform: width < 762 ? "" : "rotate(90deg)",
                      }}
                    />
                    <div>
                      <p className="text-white text-[14px] sm:text-[13px] xs:text[13px] font-medium font-dmSans">
                        Go Previous
                      </p>
                      <p className="text-white opacity-[0.6] text-[13px] sm:text-[11px] xs:text-[11px]">
                        {width < 762 ? "Slide Down" : "Click Left Arrow"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoOverlayComponent;
