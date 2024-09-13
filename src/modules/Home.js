"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Card } from "../commonComponents";
import data from "../constants/data.json";
import Image from "../commonComponents/image/Image";
import UseWindowDimensions from "../utils/getWindowDimensions";
import ReactPlayer from "react-player";
import MediaModal from "../commonComponents/mediaModal/MediaModal";
import CustomDatePicker from "../commonComponents/datepicker/DatePicker";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
// import { useNavigate } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadVideo,
  getAllVideosLinks,
  getSingleVideo,
  getVideos,
  getVideosByDate,
} from "../redux/slices/video.slice";
import moment from "moment";
import MusicCard from "../commonComponents/musicCard/MusicCard";
import { getBlogBycategory, setBlog } from "../redux/slices/blog.slice";
import { useSearchParams } from "react-router-dom";
import Pagination from "../commonComponents/pagination/Pagination";
import SEO from "../commonComponents/SEO";
import { useRouter } from "next/navigation";

export default function Home() {
  const dispatch = useDispatch();
  // let [searchParams, setSearchParams] = useSearchParams();
  // const params = {
  //   title: searchParams.get("title"),
  //   watch: searchParams.get("watch"),
  // };
  const cardRefs = useRef([]);
  const { width } = UseWindowDimensions();
  const [modalShow, setModalShow] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handle = useFullScreenHandle();
  const [videosList, setVideoList] = useState([]);
  const [page, setPage] = useState([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [startDate, setStartDate] = useState(new Date());
  const [blogId, setBlogId] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);
  const [isDateFilterApplied, setIsDateFilterApplied] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  //featured work
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [featuredArray, setFeaturedArray] = useState([]);
  //featured work
  const { videoLinks, featuredVideos } = useSelector((state) => state.video);
  const [videoLength, setVideoLength] = useState({
    max: 0,
    min: 0,
  });
  const { videos, loading } = useSelector((state) => state?.video);
  const { latestStories: blogsByCategory, loading: blogLoading } = useSelector(
    (state) => state?.blog
  );
  // const navigate = useNavigate();
  const router = useRouter();

  const getVideosLinks = () => {
    // if (params?.watch == "true" && params?.title?.length > 0) {
    //   console.log("called man");
    //   dispatch(
    //     getSingleVideo({
    //       payload: params?.title,
    //       callback: (data) => {
    //         if (data?.status === 200) {
    //           dispatch(
    //             getAllVideosLinks({
    //               payload: {},
    //               callback: (innerData) => {
    //                 if (innerData?.status == 200) {
    //                   handleModalShowWithLink(data?.data, innerData?.data);
    //                 }
    //               },
    //             })
    //           );
    //         }
    //       },
    //     })
    //   );
    // } else {
    //   dispatch(
    //     getAllVideosLinks({
    //       payload: {},
    //       callback: (data) => {
    //         if (data?.status == 200) {
    //         }
    //       },
    //     })
    //   );
    // }
  };
  const getLatestVideos = (pageNumber) => {
    dispatch(
      getVideos({
        payload: pageNumber,
        callback: async (data) => {
          if (data?.status == 200) {
            let pageNumbers = [];
            for (let i = 1; i <= data?.data?.totalPages; i++) {
              pageNumbers.push(i);
            }
            getVideosLinks();
            setPage(pageNumbers);
          } else {
            console.log("An Error Occurred");
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

  //featured work
  // const addRandomFeaturedVideo = () => {
  //   if (featuredVideos && featuredVideos.length > 0) {
  //     const randomIndex = Math.floor(Math.random() * featuredVideos.length);
  //     const randomVideo = featuredVideos[randomIndex];

  //     setFeaturedArray((prevArray) => [...prevArray, randomVideo]);
  //   }
  // };
  // const addRandomFeaturedVideo = () => {
  //   if (featuredVideos && featuredVideos.length > 0) {
  //     let randomIndex;
  //     let randomVideo;

  //     // Ensure that the new video is different from the current one in featuredArray
  //     do {
  //       randomIndex = Math.floor(Math.random() * featuredVideos.length);
  //       randomVideo = featuredVideos[randomIndex];
  //     } while (featuredArray.length > 0 && featuredArray[0] === randomVideo);
  //     const newValue = [
  //       {
  //         id: randomVideo?.id,
  //         url: randomVideo?.link,
  //         blog: randomVideo?.blog ? randomVideo?.blog : [],
  //         featured: randomVideo?.featured,
  //         thumbnailUrl: randomVideo?.thumbnailUrl,
  //         buttonTitle: randomVideo?.buttonTitle,
  //         buttonLink: randomVideo?.buttonLink,
  //         createdAt: randomVideo?.createdAt,
  //         title: randomVideo?.blog?.title || randomVideo?.title,
  //         featuredImageUrl: randomVideo?.featuredImageUrl,
  //         waterMarkVideoUrl: randomVideo?.waterMarkVideoUrl,
  //         reelImageUrl: randomVideo?.reelImageUrl,
  //       },
  //     ];
  //     // Set the featuredArray with the new random video
  //     setFeaturedArray(newValue);
  //   }
  // };
  // const addRandomFeaturedVideo = useCallback(() => {
  //   if (featuredVideos && featuredVideos.length > 0) {
  //     let randomIndex;
  //     let randomVideo;

  //     // Ensure that the new video is different from the current one in featuredArray
  //     do {
  //       randomIndex = Math.floor(Math.random() * featuredVideos.length);
  //       randomVideo = featuredVideos[randomIndex];
  //     } while (featuredArray.length > 0 && featuredArray[0]?.id === randomVideo?.id);

  //     const newValue = [
  //       {
  //         id: randomVideo?.id,
  //         url: randomVideo?.link,
  //         blog: randomVideo?.blog ? randomVideo?.blog : [],
  //         featured: randomVideo?.featured,
  //         thumbnailUrl: randomVideo?.thumbnailUrl,
  //         buttonTitle: randomVideo?.buttonTitle,
  //         buttonLink: randomVideo?.buttonLink,
  //         createdAt: randomVideo?.createdAt,
  //         title: randomVideo?.blog?.title || randomVideo?.title,
  //         featuredImageUrl: randomVideo?.featuredImageUrl,
  //         waterMarkVideoUrl: randomVideo?.waterMarkVideoUrl,
  //         reelImageUrl: randomVideo?.reelImageUrl,
  //       },
  //     ];

  //     // Set the featuredArray with the new random video
  //     setFeaturedArray(newValue);
  //   }
  // },[featuredIndex]);

  const addRandomFeaturedVideo = useCallback(() => {
    if (featuredVideos && featuredVideos?.length > 0) {
      const featuredSet = new Set(featuredArray?.map((video) => video?.id));
      let randomVideo;
      let attempts = 0;
      const maxAttempts = 10; // To prevent infinite loops

      // Find a random video that is not in the featured array
      do {
        const randomIndex = Math.floor(Math.random() * featuredVideos?.length);
        randomVideo = featuredVideos[randomIndex];
        attempts++;
      } while (featuredSet?.has(randomVideo?.id) && attempts < maxAttempts);

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
  //featured woork
  //for link video
  const handleModalShowWithLink = (video, allVideos) => {
    setFeaturedIndex(0);
    if (video?.Blog?.length > 0) {
      setBlogId(video?.Blog[0]);
    }
    if (featuredVideos?.length > 0) {
      addRandomFeaturedVideo();
    }

    if (allVideos?.length > 0) {
      setVideoLength((prev) => ({
        ...prev,
        min: allVideos[allVideos?.length - 1]?.videoIndex,
        max: allVideos[0]?.videoIndex,
      }));

      const updatedVideoList = [
        ...allVideos.map((videoItem, index) => ({
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
    }
  };
  //
  const handleModalShow = useCallback(
    (video, i) => {
      setFeaturedIndex(0);
      if (video?.Blog?.length > 0) {
        setBlogId(video?.Blog[0]);
      }
      if (featuredVideos?.length > 0) {
        addRandomFeaturedVideo();
      }

      if (videoLinks?.length > 0) {
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
      }
    },
    [
      videoLinks,
      width,
      setBlogId,
      setModalShow,
      setVideoList,
      dispatch,
      // params?.title,
      // params?.watch,
    ]
  );

  const handleBuffer = () => {
    setIsBuffering(true);
  };

  const handleBufferEnd = () => {
    setIsBuffering(false);
  };
  const handleRemoveFilter = () => {
    setStartDate(new Date());
    getLatestVideos(selectedPage);
    setIsDateFilterApplied(false);
  };
  const handlePageChange = (number) => {
    setSelectedPage(number);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const handleModalHide = () => {
    setVideoList([]);
    setModalShow(false);
    // width < 767 && handle.exit();
  };

  const navigateToDetails = (redirectLink) => {
    console.log("🚀 ~ navigateToDetails ~ redirectLink:", redirectLink);
    router.push(`/blog/${redirectLink}`);
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
      {/* <SEO title={"Jewasity"} /> */}
      {mediaModal()}
      <div className="mt-[90.8px]">
        <div className="flex gap-[12px] items-center flex-wrap">
          <Button
            title={"Recent Peeks"}
            buttonStyle={
              "w-[148px] h-[48px] bg-white-1 rounded-[28px] flex items-center justify-center gap-[7px]"
            }
            textStyle={"text-grey-dark font-medium text-[12px]"}
            icon={
              <div className="h-[11px] w-[11px] rounded-2xl  bg-gradient-to-r from-[#ff916f] via-[#fd6738] to-[#ff3c00] fade-in-out" />
            }
            onClick={getLatestVideos}
          />

          <CustomDatePicker
            startDate={startDate}
            setStartDate={setStartDate}
            handleApplyDateFilter={handleApplyDateFilter}
            isDateFilterApplied={isDateFilterApplied}
          />
          {isDateFilterApplied && (
            <Button
              title={"Remove Filter"}
              buttonStyle={
                "w-[148px] h-[48px] bg-white-1 rounded-[28px] flex items-center justify-center gap-[7px]"
              }
              textStyle={"text-grey-dark font-medium text-[12px]"}
              icon={
                <Image
                  src={"/icons/cross-black.svg"}
                  height={"15px"}
                  width={"15px"}
                />
              }
              onClick={handleRemoveFilter}
            />
          )}
        </div>
        <div className="mt-[28px] grid xs:grid-cols-1  sm:grid-cols-2 md:grid-cols-3 grid-cols-6 gap-x-[33.2px] mb-7">
          {loading ? (
            <>
              {[1, 2, 3, 4, 5, 6].map((item) => {
                return (
                  <div
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
              {!videos?.length > 0 ? (
                <div className="flex justify-start items-center text-[18px] w-full">
                  No Video Found.
                </div>
              ) : (
                videos
                  // ?.filter(
                  //   (item) => !item?.featured
                  //   // &&
                  //   // (!item?.Blog[0]?.category ||
                  //   //   item?.Blog[0]?.category?.toLowerCase() ===
                  //   //     "uncategorized")
                  // )
                  ?.map((item, i) => {
                    return (
                      <div ref={(el) => (cardRefs.current[i] = el)} key={i}>
                        <Card
                          title={item?.title}
                          // date={moment(item?.createdAt).format(
                          //   "MMM DD YYYY | h:mm A"
                          // )}
                          date={item?.createdAt}
                          thumbnail={item?.thumbnailUrl}
                          imgSrc={item?.thumbnailUrl}
                          key={i}
                          sponsored={item?.featured}
                          breaking={item?.Blog[0]?.breaking || item?.isBreaking}
                          cardWidth={`w-[100%] ${
                            width < 762
                              ? "h-[600px]"
                              : width < 1020
                              ? "h-[600px]"
                              : width < 1150
                              ? "h-[650px]"
                              : "h-[550px]"
                          }   relative border-b-2 ${
                            !item?.watched ? "border-[#808080]" : ""
                          } pb-[44.5px] mb-[50px]`}
                          // imgStyle={"min-h-[15px] object-cover"}
                          line={true}
                          onClick={() => {
                            console.log("item");
                            if (cardRefs.current[i]) {
                              if (width < 640) {
                                cardRefs.current[i].scrollIntoView({
                                  behavior: "smooth",
                                  block: "center",
                                });
                              }
                              handleModalShow(item, i);
                            }
                          }}
                        />
                      </div>
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
        <div className="mt-[120px]">
          {blogLoading ? (
            <>
              {[1, 2, 3, 4, 5].map((item) => {
                return (
                  <div
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
              {Object.keys(blogsByCategory)?.length === 0 ? (
                <div className="flex justify-start items-center text-[18px] w-full">
                  No Blog Found.
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-[14px] mb-[33px]">
                    <Image
                      src="/icons/orangeCircle.svg"
                      height={20}
                      width={20}
                      alt="icon"
                    />
                    <p className="text-[35px] font-regular">Latest Stories</p>
                  </div>
                  <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-x-[24px]">
                    {blogsByCategory?.map((item, i) => (
                      <Card
                        key={item.title}
                        title={item?.title}
                        // date={moment(item?.createdAt).format(
                        //   "MMM DD YYYY | h:mm A"
                        // )}
                        date={item?.createdAt}
                        breaking={item?.breaking}
                        imgSrc={item?.image}
                        cardWidth={
                          "w-[100%] min-h-[350px] relative cursor-pointer"
                        }
                        imgStyle={"h-[235px]"}
                        onClick={() => navigateToDetails(item?.redirectLink)}
                      />
                    ))}
                  </div>
                </>
                // Object.keys(blogsByCategory)?.map((category, categoryIndex) => {
                //   if (
                //     !category ||
                //     category === "" ||
                //     category.toLowerCase() === "uncategorized"
                //   )
                //     return null;

                //   return (
                //     <div key={categoryIndex} id={category}>
                //       <div className="flex items-center gap-[14px] mb-[33px]">
                //         <Image
                //           src="/icons/orangeCircle.svg"
                //           height={20}
                //           width={20}
                //           alt="icon"
                //         />
                //         <p className="text-[35px] font-regular">{category}</p>
                //       </div>
                //       <div className="h-[2px] mb-[68.5px] bg-grey-dark opacity-[0.2]" />
                //       <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-x-[24px]">
                //         {blogsByCategory[category]
                //           ?.slice(0, 5)
                //           ?.map((item, i) => (
                //             <Card
                //               title={item?.title}
                //               // date={moment(item?.createdAt).format(
                //               //   "MMM DD YYYY | h:mm A"
                //               // )}
                //               date={item?.createdAt}
                //               breaking={item?.breaking}
                //               imgSrc={item?.image}
                //               key={i}
                //               cardWidth={
                //                 "w-[100%] min-h-[350px] relative cursor-pointer"
                //               }
                //               imgStyle={"h-[235px]"}
                //               onClick={() =>
                //                 navigateToDetails(item?.redirectLink)
                //               }
                //             />
                //           ))}
                //       </div>
                //     </div>
                //   );
                // })
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
