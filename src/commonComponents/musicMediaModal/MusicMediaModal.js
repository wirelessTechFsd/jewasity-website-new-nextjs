//test3
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoOverlayComponent from "../videoOverlayComponent/VideoOverlayComponent";
import Loader from "../loader/Loader";
import BlogVideoOverlay from "../blogVideoOverlay/BlogVideoOverlay";
import { useMusicMediaModal } from "./useMusicMediaModal";

export default function MusicMediaModal({
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
  } = useMusicMediaModal(modalShow, videosList, playingMusic);
  const handleModalClick = useCallback(() => {
    setActiveIndex(0);
    setVideoList([]);
    handleModalHide();
    setModalShow(false);
  }, [setActiveIndex, setVideoList, handleModalHide, setModalShow]);
  useEffect(() => {
    if (isMuted) {
      setIsMuted(false);
    }
  }, [modalShow]);
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
          <ReactPlayer
            key={playingMusic?.id}
            url={playingMusic?.videoUrl}
            muted={isMuted}
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
              //   setIsFeatured(movie);
            }}
          />
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
            width < 767 ? "bg-black  backdrop-filter backdrop-blur-lg" : ""
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
                "relative  w-[100vw] h-[100vh] object-cover overflow-hidden rounded-[20px]"
              }
              style={{
                marginTop: width < 767 ? -22.5 : 0,
                height: videoHeight,
                width: videoWidth,
                overflow: "hidden",
              }}
              ref={videoContainerRef}
            >
              <BlogVideoOverlay
                isMuted={isMuted}
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
                isFullScreen={isFullScreen}
                handleModalHide={handleModalHide}
                playingMusic={playingMusic}
              />
              {videoSwiper()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
