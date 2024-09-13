
import { useCallback, useEffect, useRef, useState } from "react";
import UseWindowDimensions from "../../utils/getWindowDimensions";
import { SERVER_URL } from "../../config/axiosConfig";

export const useMusicMediaModal = (modalShow, videosList,playingMusic) => {
  const { width, height } = UseWindowDimensions();
  const playerRef = useRef(null);
  const swiperRef = useRef(null);
  const sliderRef = useRef(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const videoContainerRef = useRef(null);

  const [isMuted, setIsMuted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoProgress, setVideoProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [state, setState] = useState({
    totalDuration: "00:00",
    playDuration: "00:00",
    speed: 1,
  });
  const [loading, setLoading] = useState(false);
  const [activeVideo, setActiveVideo] = useState("");
  const [sliderDimensions, setSliderDimensions] = useState({
    width: 0,
    height: 0,
  });

  const videoWidth = isFullScreen ? width : width < 768 ? width : 637;

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

  const handleSoundChange = () => setIsMuted(!isMuted);

  const handleVideoClick = () => setIsPlaying(!isPlaying);

  const handleRepeatVideo = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setVideoProgress(0);
    }
  }, [playerRef]);

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

  const handleCalculateDuration = (duration) => {
    const totalSeconds = Math.floor(duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    setState((prevState) => ({
      ...prevState,
      totalDuration: `${formattedMinutes}:${formattedSeconds}`,
    }));
  };

  const handleSpeedChange = (newSpeed) => {
    setState((prevState) => ({
      ...prevState,
      speed: newSpeed,
    }));
  };

  const handleMoveForward = () => {
    const newPosition = playerRef.current.getCurrentTime() + 5;
    playerRef.current.seekTo(newPosition);
  };

  const handleMoveBackward = () => {
    const newPosition = playerRef.current.getCurrentTime() - 5;
    playerRef.current.seekTo(newPosition);
  };

  const handleVideoProgress = useCallback((progress) => {
    const duration = playerRef.current?.getDuration() || 0;
    const playDurationSeconds = Math.floor(progress.played * duration);
    const playMinutes = Math.floor(playDurationSeconds / 60);
    const playSeconds = playDurationSeconds % 60;
    const formattedPlayMinutes = String(playMinutes).padStart(2, "0");
    const formattedPlaySeconds = String(playSeconds).padStart(2, "0");
    const playDuration = `${formattedPlayMinutes}:${formattedPlaySeconds}`;
    const newProgress = (progress.played * 100).toFixed(2);
    setState((prevState) => ({
      ...prevState,
      playDuration,
    }));
    setVideoProgress(newProgress);
  }, []);
  const handleDownload = () => {
    const videoName = playingMusic?.waterMarkVideoUrl?.split("com/")[1] ||  playingMusic?.videoUrl?.split("com/")[1];
    window.open(`${SERVER_URL}/v1/video/download-video/${videoName}`, "_blank");
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
  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
      setIsFullScreen(true);
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to disable full-screen mode: ${err.message}`
        );
      });
      setIsFullScreen(false);
    }
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
    // handleNextSlide,
    // handlePrevSlide,
    handleRepeatVideo,
    handleSoundChange,
    // handleTouchStart,
    handleVideoClick,
    moviesList,
    loading,
    setLoading,
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
  };
};
