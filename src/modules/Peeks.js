import React, { useCallback, useEffect, useState } from "react";
import { Button, Card } from "../commonComponents";
import data from "../constants/data.json";
import Image from "../commonComponents/image/Image";
import UseWindowDimensions from "../utils/getWindowDimensions";
import ReactPlayer from "react-player";
import MediaModal from "../commonComponents/mediaModal/MediaModal";
import CustomDatePicker from "../commonComponents/datepicker/DatePicker";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadVideo,
  getAllPeeks,
  getAllPeeksVideosLinks,
  getVideos,
  getVideosByDate,
} from "../redux/slices/video.slice";
import moment from "moment";
import { getBlogBycategory, setBlog } from "../redux/slices/blog.slice";
import Pagination from "../commonComponents/pagination/Pagination";
import SEO from "../commonComponents/SEO";
export default function Peeks() {
  const { width } = UseWindowDimensions();
  const [modalShow, setModalShow] = useState(false);
  const [videosList, setVideoList] = useState([]);
  const [page, setPage] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [blogId, setBlogId] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);
  const [isDateFilterApplied, setIsDateFilterApplied] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  //featured work
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [featuredArray, setFeaturedArray] = useState([]);
  //featured work
  const [videoLength, setVideoLength] = useState({
    max: 0,
    min: 0,
  });
  const dispatch = useDispatch();
  const { peeks, loading, videoLinks, featuredVideos } = useSelector(
    (state) => state?.video
  );

  const getLatestVideos = (pageNumber) => {
    dispatch(
      getAllPeeks({
        payload: pageNumber,
        callback: (data) => {
          if (data?.status == 200) {
            let pageNumbers = [];
            for (let i = 1; i <= data?.data?.totalPages; i++) {
              pageNumbers.push(i);
            }
            setPage(pageNumbers);
          } else {
            console.log("An Error Occurred");
          }
        },
      })
    );
  };
  const getVideosLinks = () => {
    dispatch(
      getAllPeeksVideosLinks({
        payload: {},
        callback: (data) => {
          if (data?.status == 200) {
          }
        },
      })
    );
  };

  const getBlogsByCategory = () => {
    dispatch(
      getBlogBycategory({
        payload: "",
        callback: (data) => {
          if (data?.status == 200) {
          }
        },
      })
    );
  };

  useEffect(() => {
    getLatestVideos(selectedPage);
    getVideosLinks();
    getBlogsByCategory();
  }, []);
  useEffect(() => {
    getLatestVideos(selectedPage);
    getVideosLinks();
  }, [selectedPage]);
  const handlePageChange = (number) => {
    setSelectedPage(number);
  };
  const handleApplyDateFilter = (date) => {
    const selectedDate = moment(date).format("YYYY-MM-DD");
    dispatch(
      getVideosByDate({
        payload: `createdAt=${selectedDate}`,
        callback: (data) => {
          if (data?.message == "Videos Fetched Successfully") {
            setIsDateFilterApplied(true);
            let pageNumbers = [];
            for (let i = 1; i <= data?.data?.totalPages; i++) {
              pageNumbers.push(i);
            }
            setPage(pageNumbers);
          } else {
            console.log("An Error Occurred");
          }
        },
      })
    );
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

  // const handleModalShow = useCallback(
  //   (video, i) => {
  //     setBlogId(video?.Blog[0]);
  //     setActiveIndex(video?.videoIndex);
  //     setVideoLength((prev) => ({
  //       ...prev,
  //       min: videoslist[videoslist?.length - 1]?.videoIndex,
  //       max: videoslist[0]?.videoIndex,
  //     }));
  //     const updatedVideoList = [
  //       ...videoslist.map((videoItem, index) => ({
  //         id: videoItem?.id,
  //         url: videoItem?.link,
  //         blog: videoItem?.blog[0] ? videoItem?.blog[0] : [],
  //         featured: videoItem?.featured,
  //         thumbnailUrl: videoItem?.thumbnailUrl,
  //         buttonTitle: videoItem?.buttonTitle,
  //         buttonLink: videoItem?.buttonLink,
  //         createdAt: videoItem?.createdAt,
  //         title: videoItem?.blog[0]?.title || videoItem?.title,
  //         featuredImageUrl: videoItem?.featuredImageUrl,
  //         waterMarkVideoUrl: videoItem?.waterMarkVideoUrl,
  //         reelImageUrl: videoItem?.reelImageUrl,
  //         videoIndex: videoItem?.videoIndex,
  //       })),
  //     ];

  //     dispatch(setBlog());
  //     setVideoList(updatedVideoList.filter((blog) => blog !== undefined));
  //     setModalShow(true);
  //   },
  //   [videoslist, width, setBlogId, setModalShow, setVideoList, dispatch]
  // );

  const handleModalShow = useCallback(
    (video, i) => {
      setFeaturedIndex(0);
      addRandomFeaturedVideo();
      setBlogId(video?.Blog[0]);

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

      dispatch(setBlog());
      setVideoList(updatedVideoList.filter((blog) => blog !== undefined));
      setActiveIndex(video?.videoIndex);
      setModalShow(true);
    },
    [videoLinks, width, setBlogId, setModalShow, setVideoList, dispatch]
  );
  const handleBuffer = () => {
    setIsBuffering(true);
  };

  const handleBufferEnd = () => {
    setIsBuffering(false);
  };
  const handleModalHide = () => {
    setVideoList([]);
    setModalShow(false);
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
  const mediaModal = useCallback(() => {
    return (
      <MediaModal
        videosList={videosList}
        setVideoList={setVideoList}
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleModalHide={handleModalHide}
        blogId={blogId}
        setBlogId={setBlogId}
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
    blogId,
    setVideoList,
    setModalShow,
    handleModalHide,
    setBlogId,
  ]);
  return (
    <div>
      <SEO title={"Peeks"} />
      <div className="mt-12 overflow-x-hidden">
        {mediaModal()}
        <div className="flex items-center gap-[14px] mb-[33px]">
          <Image
            src="/icons/orangeCircle.svg"
            height={20}
            width={20}
            alt="icon"
          />
          <p className="text-[35px] font-regular">Peeks</p>
        </div>
        <div className="mt-[28px] grid xs:grid-cols-1  sm:grid-cols-2 md:grid-cols-3 grid-cols-6 gap-x-[33.2px]">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      '"w-[100%] min-h-[450px] relative border-b-2  pb-[44.5px] mb-[50px]"'
                    }
                  >
                    <div className="skeleton-image  rounded-[20px] animate-pulse" />
                    <div className="skeleton-text mt-[30.2px] mb-[68px] animate-pulse" />
                    <div className="skeleton-date absolute bottom-[41.5px] animate-pulse" />
                  </div>
                );
              })}
            </>
          ) : (
            <>
              {!peeks?.length > 0 ? (
                <div className="flex justify-start items-center text-[18px] w-full">
                  No Video Found.
                </div>
              ) : (
                peeks
                  ?.filter(
                    (item) => !item?.featured
                    // &&
                    // (!item?.Blog[0]?.category ||
                    //   item?.Blog[0]?.category?.toLowerCase() ===
                    //     "uncategorized")
                  )
                  ?.map((item, i) => {
                    return (
                      <Card
                        title={item?.title}
                        // date={moment(item?.createdAt).format(
                        //   "MMM DD YYYY | h:mm A"
                        // )}
                        thumbnail={item?.thumbnailUrl}
                        date={item?.createdAt}
                        imgSrc={item?.thumbnailUrl}
                        key={i}
                        breaking={item?.Blog[0]?.breaking || item?.isBreaking}
                        cardWidth={`w-[100%]  relative border-b-2 ${
                          !item?.watched ? "border-[#808080]" : ""
                        } pb-[44.5px] mb-[50px]`}
                        // imgStyle={"min-h-[15px] object-cover"}
                        line={true}
                        onClick={() => handleModalShow(item)}
                      />
                    );
                  })
              )}
            </>
          )}
        </div>
        {/* <div className="flex justify-end items-center gap-[12px]">
          {page.map((item) => {
            return (
              <div
                className={`h-[36px] w-[36px] cursor-pointer flex items-center justify-center rounded-[11px] border-[1px] ${
                  item == selectedPage
                    ? "border-primary text-primary"
                    : "border-grey-dark text-grey-dark"
                }`}
                onClick={() => handlePageChange(item)}
              >
                {item}
              </div>
            );
          })}
        </div> */}
        <Pagination
          totalPages={page.length}
          selectedPage={selectedPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
