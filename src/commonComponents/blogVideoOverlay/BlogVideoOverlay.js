import React, { useState } from "react";
import Image from "../image/Image";
import ShareModal from "../shareModal/ShareModal";

export default function BlogVideoOverlay({
  width,
  height,
  isMuted,
  handleSoundChange,
  progressWidth,
  handleRepeatVideo,
  handleVideoClick,
  isPlaying,
  duration,
  playDuration,
  handleMoveBackward,
  handleMoveForward,
  handleSpeedChange,
  speed,
  handleDownload,
  music,
  handleProgressClick,
  handleFullScreenToggle, // Add this prop
  isFullScreen,
  handleModalHide,
  playingMusic,
  audio,
}) {
  const [shareModal, setShareModal] = useState(false);
  return (
    <>
      <ShareModal
        isOpen={shareModal}
        onClose={() => setShareModal(false)}
        isFeatured={playingMusic}
      />

      <div
        className={`absolute ${
          music ? "px-[40px]" : "px-[50px]"
        }  py-[45px] lg:px-[30px] md:px-[30px] sm:px-[15px] xs:px-[15px]  w-full flex flex-col justify-between h-full z-[999]`}
      >
        <div className="flex items-center justify-between w-full">
          {!isMuted ? (
            <button
              class={`hidden sm:flex xs:flex bg-white bg-opacity-[0.15] text-white  w-[43px] h-[43px] md:w-[40x] sm:w-[40px] xs:w-[40px] md:h-[40x] sm:h-[40px] xs:h-[40px] md:p-1 sm:p-1 xs:p-1 rounded-[100%]  items-center justify-center`}
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
              className={"hidden sm:block xs:block"}
            />
          )}
          {music && (
            <div className="flex items-center justify-end w-full">
              <Image
                src={"/icons/whiteCross.svg"}
                height={width < 992 && height < 992 ? 40 : 43}
                width={width < 992 && height < 992 ? 40 : 43}
                onClick={() => {
                  handleModalHide();
                }}
                className={"cursor-pointer"}
              />
            </div>
          )}
        </div>
        <div className="h-full w-full z-[999]" onClick={handleVideoClick} ></div>
        <div>
          <div
            className="h-[6px] bg-white-1 bg-opacity-[0.5]   mb-[15.3px] cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className=" h-[6px] bg-gradient-to-r from-[#ff916f] via-[#ff4a12] to-[#ff3c00] rounded-[23px] transition-width duration-500 "
              style={{ width: `${progressWidth}%` }}
            />
          </div>
          <div className="flex justify-between items-center">
            <p className="text-[13px] text-white">{playDuration}</p>
            <p className="text-[13px] text-white">{duration}</p>
          </div>
          <div className="flex justify-between items-center">
            {/* 1 */}
            <div
              className={`flex items-center  ${
                music ? "gap-[30px]" : "gap-[44px]"
              } lg:gap-[30px] md:gap-[30px] sm:gap-[30px] xs:gap-[30px] w-[30%]`}
            >
              <div
                className="flex  items-center gap-2 sm:hidden xs:hidden cursor-pointer"
                onClick={handleSoundChange}
              >
                {!isMuted ? (
                  <Image src={"/icons/soundwave.svg"} height={13} width={13} />
                ) : (
                  <Image
                    src={"/icons/icon-silent.svg"}
                    height={13}
                    width={13}
                  />
                )}
                {!music && (
                  <p className="text-[12px] text-white lg:hidden md:hidden sm:hidden xs:hidden">
                    Volume
                  </p>
                )}
              </div>
              {!audio && (
                <div class="tooltip">
                  <span class="tooltiptext">
                    <span
                      onClick={() => handleSpeedChange(1)}
                      className={`${
                        speed == 1 ? "bg-primary text-white" : "bg-white"
                      } px-3 py-2 rounded-md`}
                    >
                      1x
                    </span>
                    <span
                      onClick={() => handleSpeedChange(2)}
                      className={`${
                        speed == 2 ? "bg-primary text-white" : "bg-white"
                      } px-3 py-2 rounded-md`}
                    >
                      2x
                    </span>
                  </span>
                  <div className="flex  items-center gap-2">
                    <Image src={"/icons/speed.svg"} height={13} width={13} />
                    {!music && (
                      <p className="text-[12px] text-white lg:hidden md:hidden sm:hidden xs:hidden">
                        Speed
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div
                className="flex  items-center gap-2 cursor-pointer"
                onClick={handleRepeatVideo}
              >
                <Image
                  src={"/icons/exchange-white.svg"}
                  height={13}
                  width={13}
                />
                {!music && (
                  <p className="text-[12px] text-white lg:hidden md:hidden sm:hidden xs:hidden">
                    Repeat
                  </p>
                )}
              </div>
            </div>
            {/* 2 */}
            <div className="flex items-center justify-center gap-[10.6px]  sm:gap-[20px] xs:gap-[10px] w-[40%]">
              <div
                className="flex  items-center gap-1 cursor-pointer"
                onClick={handleMoveBackward}
              >
                <Image src={"/icons/backward.svg"} width={11} height={6} />
              </div>
              <div
                onClick={handleVideoClick}
                className={` h-[37px] w-[37px]   md:p-[12px] sm:p-[12px] xs:p-[12px] rounded-[100%] flex item-center justify-center border-white border-[3px] `}
              >
                {!isPlaying ? (
                  <img src={"/icons/play-fill.svg"} height={15} width={15}  className="ml-[4px]"/>
                ) : (
                  <img src={"/icons/pause-fill.svg"}  height={12} width={12} />
                )}
              </div>
              <div
                className="flex  items-center gap-1 cursor-pointer"
                onClick={handleMoveForward}
              >
                <Image src={"/icons/forward.svg"} width={11} height={6} />
              </div>
            </div>
            {/* 3 */}
            <div
              className={`flex items-center ${
                music ? "gap-[30px]" : "gap-[44px]"
              } justify-end  lg:gap-[30px] md:gap-[30px] sm:gap-[30px] xs:gap-[30px] w-[30%]`}
            >
              <div
                className="flex  items-center gap-2"
                onClick={() => setShareModal(true)}
              >
                <Image src={"/icons/share-white.svg"} height={13} width={13} />
                {!music && (
                  <p className="text-[12px] text-white lg:hidden md:hidden sm:hidden xs:hidden">
                    Share
                  </p>
                )}
              </div>
              <div
                className="flex  items-center gap-2 cursor-pointer"
                onClick={handleDownload}
              >
                <Image
                  src={"/icons/download-white.svg"}
                  height={13}
                  width={13}
                />
                {!music && (
                  <p className="text-[12px] text-white lg:hidden  md:hidden sm:hidden xs:hidden">
                    Download
                  </p>
                )}
              </div>
              {!audio && (
              <div
                className="flex items-center gap-3 cursor-pointer sm:hidden xs:hidden"
                onClick={handleFullScreenToggle}
              >
                <Image
                  src={
                    isFullScreen
                      ? "/icons/fullscreen-exit.svg"
                      : "/icons/fullscreen.svg"
                  }
                  height={13}
                  width={13}
                />
                {!music && (
                  <p className="text-[12px] text-white md:hidden sm:hidden xs:hidden">
                    {isFullScreen ? "Exit" : "Fullscreen"}
                  </p>
                )}
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
