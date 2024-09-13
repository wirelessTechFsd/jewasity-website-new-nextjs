import { useCallback, useEffect, useRef, useState } from "react";
import UseWindowDimensions from "../../utils/getWindowDimensions";
import mixpanel from "mixpanel-browser";

export const useMediaModal = (
  modalShow,
  videosList,
  activeIndex,
  setActiveIndex,
  videoLength,
  featuredIndex,
  addRandomFeaturedVideo,
  setFeaturedIndex,
  featuredArray
) => {
  const { width, height } = UseWindowDimensions();
  const playerRef = useRef(null);
  const swiperRef = useRef(null);
  const sliderRef = useRef(null);
  const [isFeatured, setIsFeatured] = useState({});

  const [isMuted, setIsMuted] = useState(true);
  // const [activeIndex, setActiveIndex] = useState(null);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(
    localStorage.getItem("video-watched") ? true : false
  );
  const [loading, setLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");
  const [sliderDimensions, setSliderDimensions] = useState({
    width: 0,
    height: 0,
  });

  const videoWidth = width < 768 ? "100%" : 537;
  const musicVideoWidth = width < 768 ? width : 700;
  const calculateVideoHeight = (width, height) => {
    if (width < 768) return height;
    if (height < 590) return 530;
    if (height < 690) return 580;
    if (height < 768) return 650;
    if (height < 810) return 700;
    if (height < 992) return 800;
    if (height < 1050) return 900;
    return 955;
  };
  const videoHeight = calculateVideoHeight(width, height);

  useEffect(() => {
    if (sliderRef.current) {
      const { width, height } = sliderRef.current.getBoundingClientRect();
      setSliderDimensions({ width, height });
    }
  }, [sliderRef]);

  useEffect(() => {
    if (modalShow) {
      setVideoProgress(0);
      document.body.style.overflow = "hidden";
    } else {
      setVideoProgress(0);
      document.body.style.overflow = "auto";
    }
  }, [modalShow]);

  useEffect(() => {
    if (modalShow) {
      setLoading(true);
      setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
    }
  }, [modalShow, setLoading, setActiveVideo, playerRef]);

  const handleSoundChange = () => setIsMuted(!isMuted);

  const handleVideoClick = () => setIsPlaying(!isPlaying);

  // const handleNextSlide = useCallback(() => {
  //   if (swiperRef.current?.swiper) {
  //     swiperRef.current.swiper.slideNext();
  //     setVideoProgress(0);
  //     setActiveIndex(swiperRef.current.swiper.realIndex);
  //     setLoading(true);
  //     console.log("first click");
  //     setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
  //   }
  // }, [swiperRef]);
  const handleNextSlide = useCallback(() => {
    if (swiperRef.current?.swiper && activeIndex > videoLength?.min) {
      setVideoProgress(0);
      setActiveIndex((prevIndex) => prevIndex - 1); // Increment activeIndex
      setLoading(true);
      setIsPlaying(true);
      setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
      swiperRef.current.swiper.slideNext();
    }
  }, [swiperRef, activeIndex, videosList.length]);

  // const handlePrevSlide = useCallback(() => {
  //   if (swiperRef.current?.swiper) {
  //     swiperRef.current.swiper.slidePrev();
  //     setVideoProgress(0);
  //     setActiveIndex(swiperRef.current.swiper.realIndex);
  //     setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
  //   }
  // }, [swiperRef]);
  // const handlePrevSlide = useCallback(() => {
  //   if (swiperRef.current?.swiper && activeIndex > 0) {
  //     swiperRef.current.swiper.slidePrev();
  //     setVideoProgress(0);
  //     setActiveIndex(swiperRef.current.swiper.realIndex);
  //     setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
  //   }
  // }, [swiperRef, activeIndex]);
  const handlePrevSlide = useCallback(() => {
    if (swiperRef.current?.swiper && activeIndex < videoLength?.max) {
      setVideoProgress(0);
      setActiveIndex((prevIndex) => prevIndex + 1); // Decrement activeIndex
      setLoading(true);
      setIsPlaying(true);
      setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
      swiperRef.current.swiper.slidePrev();
    }
  }, [swiperRef, activeIndex]);
  // const handleSwipe = useCallback(
  //   (direction) => {
  //     if (swiperRef.current?.swiper) {
  //       if (direction === "up") {
  //         swiperRef.current.swiper.slideNext();
  //       } else if (direction === "down") {
  //         swiperRef.current.swiper.slidePrev();
  //       }
  //       setVideoProgress(0);
  //       setActiveIndex(swiperRef.current.swiper.realIndex);
  //       setLoading(true);
  //       setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
  //     }
  //   },
  //   [swiperRef]
  // );
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNextSlide(); // Move forward when the right arrow key is pressed
      } else if (e.key === "ArrowLeft") {
        handlePrevSlide(); // Move backward when the left arrow key is pressed
      }
    };

    // Add event listener for keydown events
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleNextSlide, handlePrevSlide]); 
  const handleSwipe = useCallback(
    (direction) => {
      if (swiperRef.current?.swiper) {
        if (direction === "up" && activeIndex > videoLength?.min) {
          if (featuredIndex !== 5) {
            if (featuredIndex == 3) {
              addRandomFeaturedVideo();
            }
            if (featuredArray?.length) {
              setFeaturedIndex((prev) => prev + 1);
            }
            setActiveIndex((prevIndex) => prevIndex - 1); // Increment activeIndex
            setVideoProgress(0);
            setLoading(true);
            setIsPlaying(true);
            setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
          }
          if (featuredIndex === 5) {
            setFeaturedIndex(0);
            setActiveIndex((prevIndex) => prevIndex - 1); // Increment activeIndex
            setVideoProgress(0);
            setLoading(true);
            setIsPlaying(true);
            setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
          }

          swiperRef.current.swiper.slideNext();
        } else if (direction === "down" && activeIndex < videoLength?.max) {
          setVideoProgress(0);
          if (featuredArray?.length) {
            setActiveIndex((prevIndex) => prevIndex + 1); 
          }
         // Decrement activeIndex
          setLoading(true);
          setIsPlaying(true);
          setActiveVideo(playerRef?.current?.props?.url?.split("com/")[1]);
          swiperRef.current.swiper.slidePrev();
        }
      }
    },
    [swiperRef, activeIndex, videoLength]
  );

  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    const touchStartY = e.touches[0].clientY;

    const touchMoveHandler = (moveEvent) => {
      const touchEndX = moveEvent.touches[0].clientX;
      const touchEndY = moveEvent.touches[0].clientY;

      const deltaX = touchEndX - touchStartX;
      const deltaY = touchEndY - touchStartY;

      const swipeThreshold = 10;

      if (
        Math.abs(deltaY) > Math.abs(deltaX) &&
        Math.abs(deltaY) > swipeThreshold
      ) {
        if (!isFeatured?.featured) {
          handleSwipe(deltaY > 0 ? "down" : "up");
        }
      }
      document.removeEventListener("touchmove", touchMoveHandler);
    };

    document.addEventListener("touchmove", touchMoveHandler);
  };

  const handleRepeatVideo = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setVideoProgress(0);
      // setLoading(true);
    }
  }, [playerRef]);

  const handleVideoProgress = useCallback((progress) => {
    setVideoProgress((progress.played * 100).toFixed(2));
  }, []);

  const moviesList = [
    {
      id: 0,
      link: "https://firebasestorage.googleapis.com/v0/b/jewasity.appspot.com/o/856787-hd_1920_1080_30fps.mp4?alt=media&token=53bbc719-02a8-4914-9ac4-f00d541d0827",
    },
    {
      id: 1,
      link: "https://firebasestorage.googleapis.com/v0/b/jewasity.appspot.com/o/4620563-hd_1080_2048_25fps.mp4?alt=media&token=163a22a4-53ab-4b8a-abbf-f184dfa620db",
    },
  ];
  const handleVideoPlay = (video) => {
    mixpanel.track("Video Played", {
      videoId: video?.id,
      title: video?.title,
      type: video?.isFeatured ? "Featured Video" : "Video",
    });
  };
  return {
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
    sliderDimensions,
    setSliderDimensions,
    sliderRef,
    handleNextSlide,
    handlePrevSlide,
    handleRepeatVideo,
    handleSoundChange,
    handleTouchStart,
    handleVideoClick,
    moviesList,
    loading,
    setLoading,
    activeVideo,
    setActiveVideo,
    musicVideoWidth,
    isFeatured,
    setIsFeatured,
    handleVideoPlay,
  };
};
