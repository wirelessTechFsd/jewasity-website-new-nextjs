import React, { useCallback, useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { Swiper, SwiperSlide } from "swiper/react";
import VideoOverlayComponent from "../videoOverlayComponent/VideoOverlayComponent";
import { useMediaModal } from "./useMediaModal";
import Loader from "../loader/Loader";
import { useDispatch } from "react-redux";
import { watchVideo } from "../../redux/slices/video.slice";
import Image from "../image/Image";
const useIsSafari = () => {
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafariBrowser =
      userAgent.includes("safari") &&
      !userAgent.includes("chrome") &&
      !userAgent.includes("crios") &&
      !userAgent.includes("fxios") &&
      !userAgent.includes("edgios");

    setIsSafari(isSafariBrowser);
  }, []);
  return isSafari;
};

export default function MediaModal({
  videosList,
  setVideoList,
  modalShow,
  setModalShow,
  handleModalHide,
  blogId,
  setBlogId,
  downloadVideo,
  handleBuffer,
  handleBufferEnd,
  isBuffering,
  activeVideoIndex,
  activeIndex,
  setActiveIndex,
  videoLength,
  setFeaturedIndex,
  setFeaturedArray,
  featuredArray,
  featuredIndex,
  addRandomFeaturedVideo,
}) {
  const {
    width,
    height,
    playerRef,
    isMuted,
    setIsMuted,
    handleVideoProgress,

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
    isFeatured,
    setIsFeatured,
    handleVideoPlay,
  } = useMediaModal(
    modalShow,
    videosList,
    activeIndex,
    setActiveIndex,
    videoLength,
    featuredIndex,
    addRandomFeaturedVideo,
    setFeaturedIndex,
    featuredArray
  );
  const handleNextSlideResetFeaturedArray = () => {
    if (featuredIndex !== 5) {
      // if (featuredIndex == 3) {
      //   addRandomFeaturedVideo();
      // }
      if (featuredArray?.length) {
        setFeaturedIndex((prev) => prev + 1);
      }

      handleNextSlide();
    }
    if (featuredIndex === 5) {
      setFeaturedIndex(0);
      handleNextSlide();
    }
  };
  const dispatch = useDispatch();
  const [playerKey, setPlayerKey] = useState(0); // Key to force re-render of ReactPlayer

  const handleSlideChange = ({ realIndex }) => {
    setActiveIndex(realIndex);
    // Refresh player on slide change
    setPlayerKey((prevKey) => prevKey + 1); // Increment key to force ReactPlayer to re-render
  };
  // Ref to store timeout IDs for each slide
  const timeoutIds = useRef([]);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  useEffect(() => {
    if (modalShow) {
      setLoading(true);
      setIsPlaying(true); // Autoplay the video when the modal is reopened
      setIsButtonVisible(true); 
      setTimeout(() => {
        setIsButtonVisible(false);
      }, 1000);
    }

    return () => {
      timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId));
    };
  }, [modalShow, setLoading, setActiveVideo, playerRef]);

  useEffect(() => {
    // Clear the timeout for the current slide when activeIndex changes
    timeoutIds.current.forEach((timeoutId) => clearTimeout(timeoutId));
  }, [activeIndex]);

  const handleModalClick = () => {
    setActiveIndex(null);
    setVideoList([]);
    handleModalHide();
    setModalShow(false);
    setIsPlaying(false);
  };
  // useEffect(() => {
  //   setIsMuted(true);
  // }, [modalShow]);

  const playingVideoArray =
    featuredIndex === 5 && featuredArray?.length
      ? featuredArray
      : videosList?.filter(
          (newMovie, index) => newMovie?.videoIndex == activeIndex
        );
  const videoSwiper = useCallback(() => {
    return (
      <Swiper
        direction={width > 767 ? "horizontal" : "vertical"}
        key={videosList.length}
        pagination={{ clickable: true }}
        loop={true}
        simulateTouch={true}
        touchStartPreventDefault={false}
        rewind={false}
        className="mySwiper"
        allowTouchMove={true}
        ref={swiperRef}
        style={{ height: "100%", width: "100%" }}
        threshold={100} // Add a higher threshold for swipe
        speed={600}
        touchRatio={0.5} // Default is 1. Lower values make it less sensitive
        longSwipesRatio={0.5}
        onSlideChange={handleSlideChange}
      >
        {videosList?.filter(
          (newMovie, index) => newMovie?.videoIndex == activeIndex
        )?.map((movie, i) => {
          return (
            <SwiperSlide
              accessKey={movie?.id}
              key={movie?.id}
              ref={sliderRef}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "black",
                width: videoWidth,
                height: videoHeight,
              }}
            >
              <div
                className={`relative ${
                  movie?.reelImageUrl
                    ? "w-full h-full  flex justify-center items-center"
                    : ""
                }`}
              >
                {(loading || isBuffering) && (
                  <div className="absolute h-full w-full flex justify-center items-center">
                    <Loader width={50} height={50} color="#ff3c00" />
                  </div>
                )}
                {movie?.reelImageUrl || movie?.featuredImageUrl ? (
                  <img
                    src={movie?.reelImageUrl || movie?.featuredImageUrl}
                    alt="Movie Reel"
                    style={{
                      width: videoWidth,
                      height: "100%",
                      objectFit: "contain",
                    }}
                    onLoad={() => {
                      setLoading(false);
                      handleVideoPlay(movie);
                      setIsFeatured(movie);
                      setBlogId(movie);
                      dispatch(
                        watchVideo({
                          payload: movie?.id,
                        })
                      );
                      const timeoutId = setTimeout(() => {
                        handleNextSlideResetFeaturedArray();
                      }, 5000);
                      timeoutIds.current[movie?.videoIndex || movie?.index] =
                        timeoutId;
                    }}
                  />
                ) : (
                  <ReactPlayer
                    key={playerKey}
                    url={movie?.url}
                    muted={!isMuted}
                    playing={!isBuffering && isPlaying}
                    ref={playerRef}
                    controls={false}
                    onBuffer={handleBuffer}
                    onBufferEnd={handleBufferEnd}
                    onProgress={handleVideoProgress}
                    width="100%"
                    height={width < 768 ? "100%" : videoHeight}
                    playsinline
                    style={{
                      overflow: "hidden",
                      transition: "opacity 0.3s ease-in-out",
                      opacity: loading || isBuffering ? 0.5 : 1,
                    }}
                    onClick={handleVideoClick}
                    onEnded={handleNextSlideResetFeaturedArray}
                    onReady={() => {
                      handleVideoPlay(movie);
                      dispatch(
                        watchVideo({
                          payload: movie?.id,
                        })
                      );
                      setLoading(false);
                      handleBufferEnd();
                      setIsFeatured(movie);
                      setBlogId(movie);
                      setActiveVideo(
                        movie?.waterMarkVideoUrl?.split("com/")[1]
                      );
                    }}
                  />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    );
  }, [
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
  ]);

  const isSafari = useIsSafari();

  return (
    <>
      {modalShow && (
        <div
          className={`fixed z-[99999] inset-0 overflow-hidden ${
            width < 767 ? "bg-black backdrop-filter backdrop-blur-lg" : ""
          }`}
        >
          <div className="flex items-center justify-center min-h-screen">
            <div
              className="fixed inset-0 transition-opacity"
              onClick={!isFeatured?.featured ? handleModalClick : null}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
            </div>
            <div
              className={
                width < 768
                  ? "relative  w-[100vw] h-[100vh] object-cover"
                  : "relative rounded-[24px] sm:rounded-none xs:rounded-none"
              }
              style={{
                marginTop: width < 767 ? -22.5 : 0,
                height:
                    videoHeight,
                width: videoWidth,
                overflow: "hidden",
                paddingBottom: width < 768 ? 'env(safe-area-inset-bottom)' : 0,
              }}
            >
              {!loading && (
                <VideoOverlayComponent
                  handleModalClick={handleModalClick}
                  handleVideoClick={handleVideoClick}
                  handleTouchStart={
                    videosList?.length > 1 ? handleTouchStart : null
                  }
                  handleModalHide={handleModalHide}
                  setActiveIndex={setActiveIndex}
                  handleRepeatVideo={handleRepeatVideo}
                  width={width}
                  height={height}
                  setVideoList={setVideoList}
                  videosList={videosList}
                  setModalShow={setModalShow}
                  progressWidth={videoProgress}
                  isFeatured={isFeatured}
                  isMuted={!isMuted}
                  handleSoundChange={handleSoundChange}
                  handleNextSlide={handleNextSlideResetFeaturedArray}
                  handlePrevSlide={handlePrevSlide}
                  setIsPlaying={setIsPlaying}
                  blogId={blogId}
                  activeVideo={activeVideo}
                  isPlaying={isPlaying}
                  isButtonVisible={isButtonVisible} 
                  setIsButtonVisible={setIsButtonVisible}
                />
              )}

              {videoSwiper()}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
