"use client";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "../commonComponents/image/Image";
import UseWindowDimensions from "../utils/getWindowDimensions";
import { Button, Card } from "../commonComponents";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
import blogData from "../blog.json";
import BlogVideoOverlay from "../commonComponents/blogVideoOverlay/BlogVideoOverlay";
import ReactPlayer from "react-player";
import InputField from "../commonComponents/input/InputField";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  addBlogComment,
  getBlog,
  getBlogBycategory,
  getRandomAds,
  getRecentBlogs,
  setBlog,
} from "../redux/slices/blog.slice";
import Loader from "../commonComponents/loader/Loader";
import toast from "react-hot-toast";
import { SERVER_URL } from "../config/axiosConfig";
import mixpanel from "mixpanel-browser";
import {
  downloadVideo,
  getAllVideosLinks,
  getRecentFeaturedVideos,
  getVideos,
} from "../redux/slices/video.slice";
import MediaModal from "../commonComponents/mediaModal/MediaModal";
import SEO from "../commonComponents/SEO";
import { useRouter } from "next/navigation";

const Details = ({blogId}) => {
  const playerRef = useRef(null);
  const { blogs, loading, recentBlogs, randomAds } = useSelector(
    (state) => state.blog
  );
  const { recentFeaturedVideos } = useSelector((state) => state.video);
  const dispatch = useDispatch();

  const getBlogData = () => {
    dispatch(
      getBlog({
        payload: blogId,
        callback: (data) => {
          if (data?.status === 500) {
            // toast.error(data?.data?.message);
          }
        },
      })
    );
    dispatch(getRandomAds({}));
    dispatch(getRecentFeaturedVideos({}));
    dispatch(getRecentBlogs({}));
  };
  useEffect(() => {
    getBlogData();
  }, [blogId]);
  // const navigate = useNavigate();
  const router = useRouter();
  const { width, height } = UseWindowDimensions();
  // const location = useLocation();
  // const location = router.prefetch();
  console.log("🚀 ~ Details ~ location:", location)
  const playerRefs = useRef([]);
  const [videoStates, setVideoStates] = useState({});
  const [comment, setComment] = useState({
    name: "",
    lastName: "",
    email: "",
    description: "",
    loading: false,
  });
  const addComment = (blogs) => {
    setComment((prev) => ({ ...prev, loading: true }));
    dispatch(
      addBlogComment({
        payload: {
          firstName: comment.name,
          lastName: comment.lastName,
          email: comment.email,
          comment: comment.description,
          blogId: blogs?.id,
        },
        callback: (data) => {
          if (data?.status == 200) {
            setComment({
              name: "",
              lastName: "",
              email: "",
              description: "",
              loading: false,
            });
          }
        },
      })
    );
  };
  const videoContainerRefs = useRef([]);
  const initializeVideoState = (index) => ({
    isPlaying: false,
    isMuted: true,
    speed: 1,
    totalDuration: "00:00",
    duration: 0,
    playDuration: "00:00",
    videoProgress: 0,
    isFullScreen: false,
  });

  useEffect(() => {
    if (blogs?.videoLinks) {
      const initialStates = {};
      blogs.videoLinks.forEach((_, index) => {
        initialStates[index] = initializeVideoState(index);
      });
      setVideoStates(initialStates);
    }
  }, [blogs]);

  const handleSoundChange = (index) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [index]: {
        ...prevStates[index],
        isMuted: !prevStates[index].isMuted,
      },
    }));
  };

  const handleVideoProgress = (index, progress, duration) => {
    const playDurationSeconds = Math.floor(progress.played * duration);
    const playMinutes = Math.floor(playDurationSeconds / 60);
    const playSeconds = playDurationSeconds % 60;
    const formattedPlayMinutes = String(playMinutes).padStart(2, "0");
    const formattedPlaySeconds = String(playSeconds).padStart(2, "0");
    const playDuration = `${formattedPlayMinutes}:${formattedPlaySeconds}`;
    const newProgress = (progress.played * 100).toFixed(2);
    setVideoStates((prevStates) => ({
      ...prevStates,
      [index]: {
        ...prevStates[index],
        playDuration,
        videoProgress: newProgress,
      },
    }));
  };

  const handleCalculateDuration = (index, duration) => {
    const totalSeconds = Math.floor(duration);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
    setVideoStates((prevStates) => ({
      ...prevStates,
      [index]: {
        ...prevStates[index],
        duration,
        totalDuration: `${formattedMinutes}:${formattedSeconds}`,
      },
    }));
  };

  const handleRepeatVideo = (index) => {
    if (playerRefs.current[index]) {
      playerRefs.current[index].seekTo(0);
    }
  };

  const handleSpeedChange = (index, newSpeed) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [index]: {
        ...prevStates[index],
        speed: newSpeed,
      },
    }));
  };

  const handleVideoClick = (index) => {
    setVideoStates((prevStates) => ({
      ...prevStates,
      [index]: {
        ...prevStates[index],
        isPlaying: !prevStates[index].isPlaying,
      },
    }));
  };

  // const scrollIntoView = (location) => {
  //   if (location.hash) {
  //     const element = document.getElementById(location.hash.split("#")[1]);
  //     if (element) {
  //       element.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // };

  // useEffect(() => {
  //   if (location.hash?.length > 0) {
  //     scrollIntoView(location);
  //   } else {
  //     window.scrollTo({
  //       top: 0,
  //       behavior: "smooth",
  //     });
  //   }
  // }, [location]);

  const handleMoveForward = (index) => {
    const newPosition = playerRefs.current[index].getCurrentTime() + 5;
    playerRefs.current[index].seekTo(newPosition);
  };

  const handleMoveBackward = (index) => {
    const newPosition = playerRefs.current[index].getCurrentTime() - 5;
    playerRefs.current[index].seekTo(newPosition);
  };
  const handleDownload = (index) => {
    const currentlyPlayingVideoId =
      blogs?.waterMarkVideoUrls[index] || blogs?.videoLinks[index];
    if (currentlyPlayingVideoId) {
      const videoId = currentlyPlayingVideoId.split("com/")[1];
      window.open(`${SERVER_URL}/v1/video/download-video/${videoId}`, "_blank");
    } else {
      toast.error("Video URL is not valid.");
    }
  };
  const handleProgressClick = (index, event) => {
    const progressBar = event.currentTarget;
    const clickPositionX =
      event.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const clickRatio = clickPositionX / progressBarWidth;
    const newTime = clickRatio * playerRefs.current[index].getDuration();
    playerRefs.current[index].seekTo(newTime);
  };
  const handleFullScreenToggle = (index) => {
    const videoContainer = videoContainerRefs.current[index];
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`
        );
      });
      setVideoStates((prevStates) => ({
        ...prevStates,
        [index]: {
          ...prevStates[index],
          isFullScreen: true,
        },
      }));
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to disable full-screen mode: ${err.message}`
        );
      });
      setVideoStates((prevStates) => ({
        ...prevStates,
        [index]: {
          ...prevStates[index],
          isFullScreen: false,
        },
      }));
    }
  };
  const [isBuffering, setIsBuffering] = useState(false);
  const [copy, setCopy] = useState(false);
  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 7000);
    }
  }, [copy]);
  const ShareLinks = useCallback(
    ({ title, image, description }) => {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(title);
      return (
        <div className="mt-[37px]">
          <div className="flex items-center">
            <p className="text-[18px] text-primary mr-[14.5px]">Share</p>
            <Image src="/icons/line.png" alt="line" />
            <div className="flex item-center gap-[45px] md:gap-[30px] sm:gap-[25px] xs:gap-[20px] ml-[25px]">
              {blogData?.shareLinks?.whatsapp?.link && (
                <a
                  href={`https://wa.me/?text=${text}%20${url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-[-3px]"
                >
                  <Image
                    src={blogData?.shareLinks?.whatsapp?.icon}
                    alt="WhatsApp"
                  />
                </a>
              )}
              {blogData?.shareLinks?.facebook?.link && (
                <a
                  href={`https://www.facebook.com/sharer.php?u=${url}/${text}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={blogData?.shareLinks?.facebook?.icon}
                    alt="Facebook"
                  />
                </a>
              )}
              {/* {blogData?.shareLinks?.instagram?.link && (
                <a
                  // href={`https://www.facebook.com/sharer.php?u=${url}/${text}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={blogData?.shareLinks?.instagram?.icon}
                    alt="Facebook"
                  />
                </a>
              )} */}
              {blogData?.shareLinks?.twitter?.link && (
                <a
                  href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={blogData?.shareLinks?.twitter?.icon}
                    alt="Twitter"
                  />
                </a>
              )}
              {blogData?.shareLinks?.linkedIn?.link && (
                <a
                  href={`https://www.linkedin.com/shareArticle?url=${url}&title=${text}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={blogData?.shareLinks?.linkedIn?.icon}
                    alt="LinkedIn"
                  />
                </a>
              )}
              {blogData?.shareLinks?.t?.link && (
                <a
                  href={`https://t.me/share/url?url=${url}&text=${text}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={blogData?.shareLinks?.t?.icon} alt="Telegram" />
                </a>
              )}
              <div
                className="cursor-pointer mt-[-3px]"
                onClick={() => {
                  const link = `https://${window.location.host}/blog/${blogTitle}`;
                  navigator.clipboard.writeText(link);
                  setCopy(true);
                }}
              >
                <Image
                  src={copy ? "/icons/copy-done.svg" : "/icons/copy.svg"}
                  className={copy ? "" : "opacity-[0.3]"}
                />
              </div>
            </div>
          </div>
        </div>
      );
    },
    [copy]
  );
  useEffect(() => {
    const divElement = document.querySelector(".blog-content");
    if (divElement) {
      const images = divElement.getElementsByTagName("img");
      for (let img of images) {
        const wrapper = document.createElement("div");
        wrapper.style.display = "flex";
        wrapper.style.justifyContent = "center";
        wrapper.style.alignItems = "center";
        // wrapper.style.width = '100%';

        // img.style.width = '100%';

        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);
      }
    }
  }, [blogs]);

  useEffect(() => {
    mixpanel.track("Blog Viewed", {
      blogId: blogs?.id,
      title: blogs?.title,
    });
  }, [blogs]);

  //reel modal
  const { videos, loading: videoLoading } = useSelector(
    (state) => state?.video
  );
  const { videoLinks, featuredVideos } = useSelector((state) => state.video);
  const [videosList, setVideoList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [reelBlogId, setReelBlogId] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [featuredArray, setFeaturedArray] = useState([]);
  const [videoLength, setVideoLength] = useState({
    max: 0,
    min: 0,
  });
  const getLatestVideos = (pageNumber) => {
    dispatch(
      getVideos({
        payload: pageNumber,
        callback: (data) => {
          if (data?.status == 200) {
          } else {
            console.log("An Error Occurred");
          }
        },
      })
    );
  };
  const getVideosLinks = () => {
    dispatch(
      getAllVideosLinks({
        payload: {},
        callback: (data) => {
          if (data?.status == 200) {
          }
        },
      })
    );
  };

  useEffect(() => {
    getLatestVideos();
    getVideosLinks();
  }, []);
  const handleModalHide = () => {
    setVideoList([]);
    setModalShow(false);
    // width < 767 && handle.exit();
  };
  const handleDownloadVideo = () => {
    try {
      dispatch(
        downloadVideo({
          payload: "video_5271-video.mp4",
          callback: (data) => {
            if (data?.status == 200) {
            }
          },
        })
      );
    } catch (error) {}
  };

  const handleBuffer = () => {
    setIsBuffering(true);
  };

  const handleBufferEnd = () => {
    setIsBuffering(false);
  };

  const addRandomFeaturedVideo = useCallback(() => {
    if (featuredVideos && featuredVideos.length > 0) {
      const featuredSet = new Set(featuredArray.map((video) => video.id));
      let randomVideo;
      let attempts = 0;
      const maxAttempts = 10; // To prevent infinite loops

      // Find a random video that is not in the featured array
      do {
        const randomIndex = Math.floor(Math.random() * featuredVideos.length);
        randomVideo = featuredVideos[randomIndex];
        attempts++;
      } while (featuredSet.has(randomVideo?.id) && attempts < maxAttempts);

      if (randomVideo) {
        const newValue = [
          {
            id: randomVideo.id,
            url: randomVideo.link,
            blog: randomVideo.blog || [],
            featured: randomVideo.featured,
            thumbnailUrl: randomVideo.thumbnailUrl,
            buttonTitle: randomVideo.buttonTitle,
            buttonLink: randomVideo.buttonLink,
            createdAt: randomVideo.createdAt,
            title: randomVideo.blog?.title || randomVideo.title,
            featuredImageUrl: randomVideo.featuredImageUrl,
            waterMarkVideoUrl: randomVideo.waterMarkVideoUrl,
            reelImageUrl: randomVideo.reelImageUrl,
          },
        ];

        // Set the featuredArray with the new random video
        setFeaturedArray(newValue);
      } else {
        console.error("No valid video found after multiple attempts.");
      }
    } else {
      console.error("Featured videos array is empty or undefined.");
    }
  }, [featuredArray, featuredVideos]);

  const handleModalShow = useCallback(
    (video, i) => {
      setFeaturedIndex(0);
      addRandomFeaturedVideo();
      setReelBlogId(video?.Blog[0]);

      setVideoLength((prev) => ({
        ...prev,
        min: videoLinks[videoLinks?.length - 1]?.videoIndex,
        max: videoLinks[0]?.videoIndex,
      }));
      const updatedVideoList = [
        ...videoLinks.map((videoItem, index) => ({
          id: videoItem?.id,
          url: videoItem?.link,
          blog: videoItem?.blog[0] ? videoItem?.blog[0] : [],
          featured: videoItem?.featured,
          thumbnailUrl: videoItem?.thumbnailUrl,
          buttonTitle: videoItem?.buttonTitle,
          buttonLink: videoItem?.buttonLink,
          createdAt: videoItem?.createdAt,
          title: videoItem?.blog[0]?.title || videoItem?.title,
          featuredImageUrl: videoItem?.featuredImageUrl,
          waterMarkVideoUrl: videoItem?.waterMarkVideoUrl,
          reelImageUrl: videoItem?.reelImageUrl,
          videoIndex: videoItem?.videoIndex,
        })),
      ];

      setVideoList(updatedVideoList.filter((blog) => blog !== undefined));
      setActiveIndex(video?.videoIndex);
      setModalShow(true);
    },
    [videoLinks, width, setReelBlogId, setModalShow, setVideoList, dispatch]
  );

  const mediaModal = useCallback(() => {
    return (
      <MediaModal
        videosList={videosList}
        setVideoList={setVideoList}
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleModalHide={handleModalHide}
        blogId={reelBlogId}
        setBlogId={setReelBlogId}
        downloadVideo={handleDownloadVideo}
        handleBuffer={handleBuffer}
        handleBufferEnd={handleBufferEnd}
        isBuffering={isBuffering}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
        videoLength={videoLength}
        featuredArray={featuredArray}
        featuredIndex={featuredIndex}
        setFeaturedIndex={setFeaturedIndex}
        setFeaturedArray={setFeaturedArray}
        addRandomFeaturedVideo={addRandomFeaturedVideo}
      />
    );
  }, [
    videosList,
    modalShow,
    reelBlogId,
    setVideoList,
    setModalShow,
    handleModalHide,
    setReelBlogId,
  ]);

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-[70%] mt-[100px]">
        <Loader color="#FF3C00" height={40} width={40} />
      </div>
    );
  }

  if (!blogs || blogs?.length === 0) {
    return <p className="text-[22px] text-center mt-[100px]">No Blog Found.</p>;
  }

  return (
    <>
      <SEO
        title={blogs?.title}
        description={blogs?.description}
        image={blogs?.image}
        redirectLink={blogs?.redirectLink}
        createdAt={blogs?.createdAt}
        authorName={blogs?.authorName}
      />
      {mediaModal()}

      <div className="mt-[91.9px] 2xl:w-[80%] xl:w-[93%] lg:w-[95%] mx-auto flex items-start gap-[90px] md:gap-[60px] sm:gap-[60px] xs:gap-[40px] md:flex-wrap sm:flex-wrap xs:flex-wrap">
        {/* left side */}
        <div className="w-[60%] lg:w-[60%] md:w-[100%]  sm:w-[100%] xs:w-[100%]">
          <h1 className="text-[30px] text-[#37475B]  lg-max-w-[100%] md:max-w-[100%] sm:max-w-[100%] xs:max-w-[100%]">
            {blogs?.title}
          </h1>
          <div className="flex mt-[49.5px] items-start gap-4 md:flex-wrap sm:flex-wrap xs:flex-wrap">
            <p className="text-[20px]  text-grey-dark opacity-[0.4]">
              Published{" "}
              {moment(blogs?.createdAt).format("MMM DD YYYY | h:mm A")}
            </p>
            <p className="text-[20px] text-grey-dark opacity-[0.5]">
              By {blogs?.authorName || "Jewasity stuff"}
            </p>
          </div>
          {blogs?.tags?.length > 0 && (
            <div className="flex gap-3 flex-wrap items-center mt-6">
              {blogs?.tags?.length &&
                blogs?.tags?.map((item) => (
                  <>
                    {item?.length > 0 && (
                      <span
                        className="p-2 bg-[#C3C7CD] bg-opacity-[0.4] rounded-md text-[16px] font-semibold cursor-pointer"
                        onClick={() => router.push(`/tag-blogs-list/${item}`)}
                      >
                        {item}
                      </span>
                    )}
                  </>
                ))}
            </div>
          )}

          <ShareLinks title={blogs?.title} image={blogs?.image} />
          <Image
            src={blogs?.image}
            width={"100%"}
            className={"mt-[34.4px] mb-[53px]"}
            credit={blogs?.credit}
          />
          <div
            className="blog-content text-[18px] text-grey-dark text-opacity-[0.6] mt-[50px] mb-[50px]"
            dangerouslySetInnerHTML={{
              __html: blogs?.description,
            }}
          ></div>

          {blogs?.videoLinks?.length &&
            blogs?.videoLinks?.map((videoUrl, index) => {
              const {
                isPlaying,
                isMuted,
                speed,
                totalDuration,
                playDuration,
                videoProgress,
                isFullScreen,
              } = videoStates[index] || initializeVideoState(index);

              return (
                <>
                  {videoUrl ? (
                    <div
                      key={index}
                      className="flex w-full h-full relative bg-black rounded-[15px] mb-[85px] md:mb-[40px] sm:mb-[30px] xs:mb-[30px]"
                      ref={(el) => (videoContainerRefs.current[index] = el)}
                    >
                      <BlogVideoOverlay
                        isMuted={isMuted}
                        handleSoundChange={() => handleSoundChange(index)}
                        width={width}
                        speed={speed}
                        duration={totalDuration}
                        height={height}
                        progressWidth={videoProgress}
                        handleRepeatVideo={() => handleRepeatVideo(index)}
                        handleVideoClick={() => handleVideoClick(index)}
                        isPlaying={isPlaying}
                        handleMoveBackward={() => handleMoveBackward(index)}
                        handleMoveForward={() => handleMoveForward(index)}
                        playDuration={playDuration}
                        handleProgressClick={(event) =>
                          handleProgressClick(index, event)
                        }
                        handleSpeedChange={(newSpeed) =>
                          handleSpeedChange(index, newSpeed)
                        }
                        handleFullScreenToggle={() =>
                          handleFullScreenToggle(index)
                        }
                        isFullScreen={isFullScreen}
                        handleDownload={() => handleDownload(index)}
                      />
                      <ReactPlayer
                        key={index}
                        url={videoUrl}
                        width={"100%"}
                        playbackRate={speed}
                        onDuration={(duration) =>
                          handleCalculateDuration(index, duration)
                        }
                        muted={isMuted}
                        playing={isPlaying}
                        ref={(el) => (playerRefs.current[index] = el)}
                        onProgress={(progress) =>
                          handleVideoProgress(
                            index,
                            progress,
                            videoStates[index]?.duration
                          )
                        }
                        height={height < 992 ? "800px" : "1017px"}
                        style={{ borderRadius: 15, overflow: "hidden" }}
                      />
                    </div>
                  ) : (
                    ""
                  )}
                </>
              );
            })}
          <BlogCommentSection
            comment={comment}
            setComment={setComment}
            addComment={() => addComment(blogs)}
          />
          {width > 1024 && <AllComments comments={blogs?.comments} />}
        </div>
        {/* right side */}
        <div className="w-[40%] lg:w-[40%] md:w-[100%]  sm:w-[100%] xs:w-[100%]">
          <LatestPeeks videos={videos} handleModalShow={handleModalShow} />
          <div className="top-border bottom-border py-[52.6px]">
            <AdsSection randomAds={randomAds} start={0} end={2} />
          </div>
          <FollowUs />

          <div className="py-[52.3px] bottom-border w-full">
            <LatestNews
              recentBlogs={recentBlogs}
              navigate={router}
              blogs={blogs}
            />
          </div>
          <div className="py-[52.3px] w-full">
            <a
              href={`https://api.whatsapp.com/send?phone=19294651512&text=Sign%20up%20`}
              target="_blank"
            >
              <div className="w-full relative rounded-[6px] overflow-hidden">
                <Image
                  src={"/images/whatsapp-status.png"}
                  className={"w-full object-contain"}
                />
              </div>
            </a>
            <div className="mt-[43px]">
              <div className="top-border bottom-border py-[52.6px]">
                <AdsSection randomAds={randomAds} start={2} end={3} />
              </div>
            </div>
          </div>
        </div>

        <BlogCommentSection
          comment={comment}
          setComment={setComment}
          addComment={() => addComment(blogs)}
          isSmall={true}
        />
        {width < 1024 && <AllComments comments={blogs?.comments} />}
      </div>
    </>
  );
};

export default Details;

//blog sections
const AllComments = ({ isSmall, comments }) => {
  return (
    <div>
      <div className="mt-[85px] md:mt-[40px] sm:mt-[30px] xs:mt-[30px]">
        <div className="flex items-center gap-[14px]">
          <Image src="/icons/orangeCircle.svg" />
          <p className="text-[30px]"> Comments ({comments?.length})</p>
        </div>

        <div>
          {comments?.map((commentData) => {
            return (
              <div class="space-y-4">
                <div class=" py-4  border-b-[1.5px] border-solid border-[#ced1d4]">
                  <div class="flex items-center mb-2">
                    <div>
                      <h3 class="text-lg font-medium text-gray-900">
                        {commentData?.firstName + " " + commentData?.lastName}
                      </h3>
                      <p class="text-xs text-gray-500">
                        Posted on{" "}
                        {moment(commentData?.createdAt).format("MMMM DD, YYYY")}{" "}
                      </p>
                    </div>
                  </div>
                  <p class="text-gray-700">{commentData?.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
const BlogCommentSection = ({ comment, setComment, isSmall, addComment }) => {
  return (
    <div
      className={`${
        isSmall
          ? "hidden md:block sm:block xs:block"
          : "hidden 2xl:block xl:block lg:block"
      }`}
    >
      <div id="comment" />
      <div className="w-[720px] lg:w-[100%] md:w-[100%] sm:w-[100%] xs:w-[100%]  sm:mb-[-40px] xs:mb-[-40px]">
        <div className="flex items-center gap-[14px]">
          <Image src="/icons/orangeCircle.svg" />
          <p className="text-[30px]">Leave A Comment</p>
        </div>
        <div className="mt-[35.5px] flex items-center gap-[10px] sm:flex-wrap xs:flex-wrap">
          <InputField
            fieldType={"input"}
            type={"text"}
            placeholder={"First Name"}
            className={"w-[33.3%] sm:w-[100%] xs:w-[100%]"}
            value={comment.name}
            onChange={(e) =>
              setComment((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <InputField
            fieldType={"input"}
            type={"text"}
            placeholder={"Last name"}
            className={"w-[33.3%] sm:w-[100%] xs:w-[100%]"}
            value={comment.lastName}
            onChange={(e) =>
              setComment((prev) => ({ ...prev, lastName: e.target.value }))
            }
          />
          <InputField
            fieldType={"input"}
            type={"text"}
            placeholder={"Email"}
            className={"w-[33.3%] sm:w-[100%] xs:w-[100%]"}
            value={comment.email}
            onChange={(e) =>
              setComment((prev) => ({ ...prev, email: e.target.value }))
            }
          />
        </div>
        <InputField
          placeholder={"Write your comment...."}
          className={"max-h-[250px] h-[250px] w-[100%]"}
          value={comment.description}
          onChange={(e) =>
            setComment((prev) => ({ ...prev, description: e.target.value }))
          }
        />
        <Button
          buttonStyle="w-[161px] sm:w-[100%] xs:w-[100%] mt-[8px] py-[17px] rounded-[13px] bg-gradient-to-r from-[#ff916f] via-[#ff4a12] to-[#ff3c00]"
          title="Submit"
          onClick={addComment}
          loading={comment.loading}
          textStyle={"text-14px text-white"}
        />
      </div>
    </div>
  );
};
const AdsSection = ({ randomAds, start, end }) => {
  return (
    <div>
      {randomAds?.slice(start, end)?.map((ad, i) => {
        return (
          <div
            className=" bg-[#000] flex items-center justify-center mb-[27.7px]"
            onClick={() => window.open(`${ad?.link}`, "_blank")}
          >
            {ad?.imageUrl ? (
              <Image
                src={ad?.imageUrl}
                className={"w-full h-full object-cover"}
              />
            ) : (
              <video width="100%" controls={false} muted loop autoPlay>
                <source src={ad?.videoUrl} type="video/mp4" />
              </video>
            )}
          </div>
        );
      })}
    </div>
  );
};
const LatestNews = ({ recentBlogs, navigate, blogs }) => {
  return (
    <div>
      <p className="text-[30px] font-dmSans font-light mb-[25px]">
        Latest News
      </p>
      <div className="flex flex-col md:flex-row sm:flex-row xs:flex-row gap-[43px] sm:flex-wrap flex-start xs:flex-wrap sm:justify-center xs:justify-center">
        {recentBlogs
          ?.filter((item) => item?.id !== blogs?.id)
          ?.slice(0, 2)
          .map((blogItem, i) => {
            return (
              <Card
                title={blogItem?.title}
                breaking={blogItem?.breaking}
                imgSrc={blogItem?.image}
                key={i}
                cardWidth={"h-[320px] w-[100%] relative cursor-pointer"}
                imgStyle={"h-[235px]"}
                onClick={() => router.push(`/blog/${blogItem?.redirectLink}`)}
              />
            );
          })}
      </div>
    </div>
  );
};
const LatestPeeks = ({ videos, handleModalShow }) => {
  return (
    <div>
      <h1 className="text-[30px] text-[#37475B]  xs:text-[20px]">
        Latest Peeks
      </h1>
      <div className="mt-2 pt-10 py-16  w-full grid grid-cols-2 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[36.3px]">
        <>
          {!videos?.length > 0 ? (
            <div className="flex justify-start items-center text-[18px] w-full">
              No Video Found.
            </div>
          ) : (
            videos
              ?.slice(0, 4)
              ?.filter((item) => !item?.featured)
              ?.map((item, i) => {
                return (
                  <Card
                    title={item?.title}
                    imgSrc={item?.thumbnailUrl}
                    key={i}
                    thumbnail={item?.thumbnailUrl}
                    breaking={item?.Blog[0]?.breaking || item?.isBreaking}
                    cardWidth={`w-[100%]  relative border-b-2 ${
                      !item?.watched ? "border-[#808080]" : ""
                    } pb-[0.5px] mb-[10px] cursor-pointer`}
                    line={false}
                    onClick={() => handleModalShow(item)}
                  />
                );
              })
          )}
        </>
      </div>
    </div>
  );
};
const FollowUs = () => {
  return (
    <div className="py-[52.3px] bottom-border">
      <p className="text-[30px] font-dmSans font-light">Follow us on</p>
      <div className="pt-[26.4px] flex items-center gap-[20.1px] flex-wrap xl:flex-nowrap 2xl:flex-nowrap">
        <a href={`https://x.com/jewasity`} target="_blank">
          <Image src={"/icons/twitterx.svg"} />
        </a>
        <a href={`https://www.instagram.com/jewasity/`} target="_blank">
          <Image src={"/icons/instagram.svg"} />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=19294651512&text=Sign%20up%20"
          target="_blank"
        >
          <Image src={"/icons/whatsapp-new.svg"} />
        </a>
        <a href={`https://www.t.me/Jewasity`} target="_blank">
          <Image src={"/icons/telegram.svg"} />
        </a>
      </div>
    </div>
  );
};
