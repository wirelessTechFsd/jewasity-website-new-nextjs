import React from "react";
import Image from "../image/Image";
import ReactPlayer from "react-player";
import { SERVER_URL } from "../../config/axiosConfig";
import Loader from "../loader/Loader";
import { renderDate } from "../../utils/dateFormater";

export function MusicCard({
  imgSrc,
  title,
  date,
  cardWidth,
  onClick,
  imgStyle,
}) {
  return (
    <div
      className={`relative group ${cardWidth}`}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div className="relative">
        {imgSrc ? (
          <Image
            src={imgSrc}
            className={`w-full h-[226.54px] object-cover rounded-[20px] ${
              imgStyle || ""
            } bg-black object-cover`}
            defaultSrc="/icons/jewasity.png"
            defaultHeight="200px"
            defaultWidth="200px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <img src={"/icons/jewasity.png"} />
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[17px] duration-300">
          <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent px-4 py-4 text-white rounded-full border-4 border-white border-solid">
            <Image
              src={"/icons/play.svg"}
              height={40}
              width={40}
              className="object-cover"
            />
          </button>
        </div>
      </div>
      {title && (
        <p
          className={`mt-[30.2px] text-[18px] font-regular text-grey mb-[68px] break-words`}
        >
          {title?.length > 80 ? title.substring(0, 80) + "..." : title}
        </p>
      )}
      {date && (
        <p className="text-[15px] text-grey-dark opacity-[0.5] absolute bottom-[40.5px]">
          {renderDate(date)}
        </p>
      )}
    </div>
  );
}

export function AudioCard({
  imgSrc,
  title,
  date,
  cardWidth,
  onClick,
  imgStyle,
  audioUrl,
  isPlaying,
  onPlay,
  played,
  progress,
  handleRepeatVideo,
  playerRef,
  onEnded
}) {
  const [loading, setLoading] = React.useState(true);
  const handleDownload = () => {
    const videoName = audioUrl?.split("com/")[1];
    window.open(`${SERVER_URL}/v1/video/download-video/${videoName}`, "_blank");
  };
  const handleCardClick = () => {
    onPlay();
    if (onClick) onClick();
  };
  const CardImage = ({ imgsrc }) => {
    return (
      <>
        {imgsrc ? (
          <Image
            src={imgsrc}
            className={`w-[100%] h-[226.54px] object-cover rounded-[20px] ${
              imgStyle || ""
            } bg-black`}
            defaultSrc="/icons/jewasity.png"
            // defaultHeight="200px"
            // defaultWidth="200px"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-[235px]">
            <img src={"/icons/jewasity.png"} />
          </div>
        )}
      </>
    );
  };

  const handleProgressClick = (event) => {
    const progressBar = event.currentTarget;
    const clickPositionX =
      event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const clickRatio = clickPositionX / progressBarWidth;
    const newTime = clickRatio * playerRef.current.getDuration();
    playerRef.current.seekTo(newTime);
  };
  const handleMoveForward = () => {
    const newPosition = playerRef.current.getCurrentTime() + 5;
    playerRef.current.seekTo(newPosition);
  };

  const handleMoveBackward = () => {
    const newPosition = playerRef.current.getCurrentTime() - 5;
    playerRef.current.seekTo(newPosition);
  };
  return (
    <div className={`relative group ${cardWidth}`}>
      <div className="relative">
        <CardImage imgsrc={imgSrc} />
        {isPlaying && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 rounded-[20px] h-full backdrop-blur-md overflow-hidden">
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50  rounded-[20px]">
                <Loader height={40} width={40} color={"#fff"} />
              </div>
            )}
            <img
              src={imgSrc || "/icons/jewasity.png"}
              alt="Center Icon"
              className="w-20 h-20 mt-10 animate-spin-slow object-cover"
            />
            <ReactPlayer
              ref={playerRef}
              url={audioUrl}
              playing={isPlaying}
              controls={false}
              width="90%"
              height="50px"
              onProgress={progress}
              onReady={() => {
                setLoading(false);
              }}
              onEnded={onEnded}
            />
            <div
              className="absolute top-4 right-4 cursor-pointer flex items-center gap-4"
            >
              <div onClick={handleRepeatVideo}>
                <Image src={"/icons/exchange-white.svg"} />
              </div>
              <div  onClick={handleDownload}>
                <Image src={"/icons/download-white.svg"} />
              </div>
            </div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 items-center">
              <div
                className="flex  items-center gap-3 cursor-pointer"
                onClick={handleMoveBackward}
              >
                <Image src={"/icons/backward.svg"} />
              </div>
              <div onClick={handleCardClick} className="cursor-pointer">
                <Image src={"/icons/pause.svg"} />
              </div>
              <div
                className="flex  items-center gap-3 cursor-pointer"
                onClick={handleMoveForward}
              >
                <Image src={"/icons/forward.svg"} />
              </div>
            </div>
            {isPlaying && (
          <div
            className="h-[6px] bg-white-1 bg-opacity-[0.7]  rounded-[23px]  cursor-pointer absolute bottom-0 left-0 w-full"
            onClick={handleProgressClick}
          >
            <div
              className=" bg-gradient-to-r from-[#ff916f] via-[#ff4a12] to-[#ff3c00] h-[6px] transition-width duration-500  rounded-[23px] "
              style={{ width: `${played}%` }}
            />
          </div>
        )}
          </div>
        )}
       

        {!isPlaying && (
          <div
            className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[17px] duration-300"
            onClick={handleCardClick}
          >
            <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-transparent px-4 py-4 text-white rounded-full border-4 border-white border-solid">
              <Image
                src={isPlaying ? "/icons/pause.svg" : "/icons/play.svg"}
                height={40}
                width={40}
                className="object-cover"
              />
            </button>
          </div>
        )}
      </div>
      {title && (
        <p
          className={`mt-[30.2px] text-[18px] font-regular text-grey mb-[68px] break-words`}
        >
          {title}
        </p>
      )}
      {date && (
        <p className="text-[15px] text-grey-dark opacity-[0.5] absolute bottom-[40.5px]">
            {renderDate(date)}
        </p>
      )}
    </div>
  );
}
