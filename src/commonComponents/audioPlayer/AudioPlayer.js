

import React, { useCallback } from "react";
import ReactPlayer from "react-player";
import BlogVideoOverlay from "../blogVideoOverlay/BlogVideoOverlay";
import Loader from "../loader/Loader";
import { useAudioPlayer } from "./useAudioPlayer";
import Image from "../image/Image";

export default function AudioPlayerModal({
  videosList,
  setVideoList,
  modalShow,
  setModalShow,
  handleModalHide,
  blogId,
  setBlogId,
  handleBuffer,
  handleBufferEnd,
  isBuffering,
  playingMusic,
}) {
  const {
    width,
    height,
    playerRef,
    isMuted,
    setIsMuted,
    handleVideoProgress,
    activeIndex,
    setActiveIndex,
    videoProgress,
    setVideoProgress,
    videoWidth,
    videoHeight,
    isPlaying,
    setIsPlaying,
    swiperRef,
    sliderRef,
    handleNextSlide,
    handlePrevSlide,
    handleRepeatVideo,
    handleSoundChange,
    handleTouchStart,
    handleVideoClick,
    loading,
    setLoading,
    moviesList,
    activeVideo,
    setActiveVideo,
    handleCalculateDuration,
    handleSpeedChange,
    state,
    handleMoveForward,
    handleMoveBackward,
    handleDownload,
    handleProgressClick,
    handleFullScreenToggle,
    isFullScreen,
    videoContainerRef,
  } = useAudioPlayer(modalShow, videosList);

  const handleModalClick = useCallback(() => {
    setActiveIndex(0);
    setVideoList([]);
    handleModalHide();
    setModalShow(false);
  }, [setActiveIndex, setVideoList, handleModalHide, setModalShow]);
console.log("playerRef",playerRef.current)
  const videoSwiper = useCallback(
    () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          width: videoWidth,
          height: videoHeight,
        }}
      >
        <div className="relative w-full h-full">
          {loading && (
            <div className="absolute h-full w-full flex justify-center items-center">
              <Loader width={50} height={50} color="#fff" />
            </div>
          )}
          <div className="relative flex items-center justify-center flex-row-reverse  gap-6 h-[80%]  px-10">
            <h2 className=" text-white text-[18px]">{playingMusic?.title}</h2>
            <div
              className="flex justify-center items-center rotate-animation"
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
            >
              <Image
                src={playingMusic?.thumbnailUrl}
                className="object-cover rounded-full"
                style={{ height: "30px", width: "30px" }}
              />
            </div>
          </div>
          <div className="h-[20%]">
            <ReactPlayer
              key={playingMusic?.id}
              url={playingMusic?.audioUrl}
              muted={!isMuted}
              playbackRate={state?.speed}
              playing={isPlaying}
              ref={playerRef}
              controls={false}
              onDuration={handleCalculateDuration}
              onBuffer={handleBuffer}
              onBufferEnd={handleBufferEnd}
              onProgress={handleVideoProgress}
              width="100%"
              height="100%"
              playsinline
              style={{
                overflow: "hidden",
                transition: "opacity 0.3s ease-in-out",
                opacity: loading || isBuffering ? 0.5 : 1,
              }}
              onClick={handleVideoClick}
              onEnded={handleNextSlide}
              onReady={() => {
                setLoading(false);
                handleBufferEnd();
              }}
            />
          </div>
        </div>
      </div>
    ),
    [
      videosList,
      activeIndex,
      sliderRef,
      swiperRef,
      videoHeight,
      videoWidth,
      isMuted,
      isPlaying,
      handleVideoProgress,
      handleVideoClick,
      handleNextSlide,
      setLoading,
      isBuffering,
      loading,
    ]
  );

  return (
    <>
      {modalShow && (
        <div
          className={`fixed z-10 inset-0 overflow-hidden ${
            width < 767
              ? "bg-black backdrop-filter backdrop-blur-lg"
              : ""
          }`}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={handleModalClick}
            >
              <div className="absolute inset-0 bg-black opacity-50 rounded-md"></div>
            </div>
            <div
              className={
                "relative w-[100vw] h-[100vh] object-cover overflow-hidden rounded-[20px]"
              }
              style={{
                marginTop: 0,
                height: videoHeight ,
                width: videoWidth,
                overflow: "hidden",
              }}
              ref={videoContainerRef}
            >
              <BlogVideoOverlay
                isMuted={!isMuted}
                handleSoundChange={handleSoundChange}
                width={"100%"}
                duration={state.totalDuration}
                height={height}
                progressWidth={videoProgress}
                handleRepeatVideo={handleRepeatVideo}
                handleVideoClick={handleVideoClick}
                isPlaying={isPlaying}
                music={true}
                speed={state.speed}
                handleMoveBackward={handleMoveBackward}
                handleMoveForward={handleMoveForward}
                playDuration={state.playDuration}
                handleSpeedChange={handleSpeedChange}
                handleDownload={handleDownload}
                handleProgressClick={handleProgressClick}
                handleFullScreenToggle={handleFullScreenToggle}
                handleModalHide={handleModalHide}
                isFullScreen={isFullScreen}
                audio={true}
              />
              {videoSwiper()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
