import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../commonComponents";
import data from "../constants/data.json";
import { AudioCard, MusicCard } from "../commonComponents/musicCard/MusicCard";
import Image from "../commonComponents/image/Image";
import { useDispatch, useSelector } from "react-redux";
import {
  downloadVideo,
  getAllMusicLinks,
  getMusic,
} from "../redux/slices/music.slice";
import UseWindowDimensions from "../utils/getWindowDimensions";
import moment from "moment";
import MediaModal from "../commonComponents/mediaModal/MediaModal";
import MusicMediaModal from "../commonComponents/musicMediaModal/MusicMediaModal";
import AudioPlayerModal from "../commonComponents/audioPlayer/AudioPlayer";
import { getAudio } from "../redux/slices/audio.slice";
import Pagination from "../commonComponents/pagination/Pagination";
import SEO from "../commonComponents/SEO";

export default function Music() {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [progress, setProgress] = useState(0);
  const playerRef = useRef(null);
  // const handleAudioPlay = (index) => {
  //   setPlayingIndex(index === playingIndex ? null : index);
  //   setProgress(0); // Reset progress when switching tracks
  // };
  const handleAudioPlay = (index) => {
    setPlayingIndex(index === playingIndex ? null : index);
    setProgress(0); // Reset progress when switching tracks
  };

  const playNextAudio = () => {
    setPlayingIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % audio.length; // Loop to the first song if at the end
      return nextIndex;
    });
    setProgress(0);
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

    setProgress(newProgress);
    if (newProgress >= 100) {
      playNextAudio();
    }
  }, []);
  // const playNextAudio = () => {
  //   setPlayingIndex((prevIndex) => {
  //     const nextIndex = (prevIndex + 1) % audio.length;
  //     return nextIndex;
  //   });
  //   setProgress(0);
  // };
  const handleRepeatVideo = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(0);
      setProgress(0);
    }
  }, [playerRef]);

  const [selectedPage, setSelectedPage] = useState(1);
  const [selectedAudioPage, setSelectedAudioPage] = useState(1);
  const [modalShow, setModalShow] = useState(false);
  const [audioModalShow, setAudioModalShow] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [playingMusic, setPlayingMusic] = useState("");
  const [playingAudio, setPlayingAudio] = useState("");
  const [videosList, setVideoList] = useState([]);
  const [page, setPage] = useState([]);
  const [audioPage, setAudioPage] = useState([]);
  const [blogId, setBlogId] = useState("");
  const [isBuffering, setIsBuffering] = useState(false);
  const dispatch = useDispatch();
  const getLatestMusic = (pageNumber) => {
    dispatch(
      getMusic({
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
  const getAudioMusic = (pageNumber) => {
    dispatch(
      getAudio({
        payload: pageNumber,
        callback: (data) => {
          if (data?.status == 200) {
            let pageNumbers = [];
            for (let i = 1; i <= data?.data?.totalPages; i++) {
              pageNumbers.push(i);
            }
            setAudioPage(pageNumbers);
          } else {
            console.log("An Error Occurred");
          }
        },
      })
    );
  };

  const { music, loading } = useSelector((state) => state?.music);
  const { audio, audioLoading } = useSelector((state) => state?.audio);
  useEffect(() => {
    getLatestMusic(selectedPage);
  }, []);
  useEffect(() => {
    getLatestMusic(selectedPage);
  }, [selectedPage]);
  useEffect(() => {
    getAudioMusic(selectedAudioPage);
  }, []);
  useEffect(() => {
    getAudioMusic(selectedAudioPage);
  }, [selectedAudioPage]);
  const handleModalShow = useCallback((video) => {
    setPlayingMusic(video);
    setModalShow(true);
    // width < 767 && handle.enter();
  }, []);
  const handleAudioModalShow = useCallback((video) => {
    setPlayingAudio(video);
    setAudioModalShow(true);
    // width < 767 && handle.enter();
  }, []);
  const handleModalHide = () => {
    setVideoList([]);
    setModalShow(false);
  };
  const handleAudioModalHide = () => {
    // setVideoList([]);
    setAudioModalShow(false);
  };
  const handlePageChange = (number) => {
    setSelectedPage(number);
  };
  const handleAudioPageChange = (number) => {
    setSelectedAudioPage(number);
  };
  const handleBuffer = () => {
    setIsBuffering(true);
  };

  const handleBufferEnd = () => {
    setIsBuffering(false);
  };
  const mediaModal = useCallback(() => {
    return (
      <MusicMediaModal
        videosList={videosList}
        setVideoList={setVideoList}
        modalShow={modalShow}
        setModalShow={setModalShow}
        handleModalHide={handleModalHide}
        blogId={blogId}
        setBlogId={setBlogId}
        handleBuffer={handleBuffer}
        handleBufferEnd={handleBufferEnd}
        isBuffering={isBuffering}
        playingMusic={playingMusic}
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
  const AudioModal = useCallback(() => {
    return (
      <AudioPlayerModal
        videosList={audio}
        setVideoList={setVideoList}
        modalShow={audioModalShow}
        setModalShow={setAudioModalShow}
        handleModalHide={handleAudioModalHide}
        blogId={blogId}
        setBlogId={setBlogId}
        handleBuffer={handleBuffer}
        handleBufferEnd={handleBufferEnd}
        isBuffering={isBuffering}
        playingMusic={playingAudio}
      />
    );
  }, [audio, audioModalShow, setAudioModalShow, handleModalHide]);
  return (
    <div>
      <SEO title={"Music"} />
      {/* music */}
      <div>
        {mediaModal()}
        {/* {AudioModal()} */}
        <div className="mt-[90.8px]">
          {/* )} */}

          <div className="mt-[120px]">
            <div className="flex items-center gap-[14px] mb-[33px]">
              <div className="h-[20px] w-[20px] rounded-2xl  bg-gradient-to-r from-[#ff916f] via-[#fd6738] to-[#ff3c00]" />
              {/* <Image src="/icons/orangeCircle.svg" height={20} width={20} /> */}
              <p className="text-[35px] font-regular">Latest Video Releases</p>
            </div>
            <div className="h-[2px] mb-[68.5px] bg-grey-dark opacity-[0.2]" />
            <div className="grid xs:grid-cols-1  sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-x-[24px]">
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
                  {!music?.length > 0 ? (
                    <div className="flex justify-start items-center text-[18px] w-full">
                      No Video Found.
                    </div>
                  ) : (
                    music?.map((items, i) => {
                      return (
                        <MusicCard
                          title={items.title}
                          // date={moment(items?.createdAt).format(
                          //   "MMM DD YYYY | h:mm A"
                          // )}
                          date={items?.createdAt}
                          imgSrc={items.thumbnailUrl}
                          key={i}
                          cardWidth={"w-[100%]"}
                          imgStyle={"max-h-[226.54px] "}
                          onClick={() => handleModalShow(items)}
                          // onClick={navigateToDetails}
                        />
                      );
                    })
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end items-center gap-[12px]">
          {page.map((item) => {
            return (
              <div
                className={`h-[36px] w-[36px] flex items-center justify-center rounded-[11px] border-[1px] ${
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
        </div>
      </div>
      {/* audio */}
      <div>
        <div className="mt-[90.8px]">
          {/* )} */}

          <div className="mt-[120px]">
            <div className="flex items-center gap-[14px] mb-[33px]">
              <div className="h-[20px] w-[20px] rounded-2xl  bg-gradient-to-r from-[#ff916f] via-[#fd6738] to-[#ff3c00]" />
              {/* <Image src="/icons/orangeCircle.svg" height={20} width={20} /> */}
              <p className="text-[35px] font-regular">Latest Audio Releases</p>
            </div>
            <div className="h-[2px] mb-[68.5px] bg-grey-dark opacity-[0.2]" />
            <div className="grid xs:grid-cols-1  sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-x-[24px]">
              {audioLoading ? (
                // <>
                //   {[1, 2, 3, 4, 5, 6].map((item) => {
                //     return (
                //       <div
                //         className={
                //           '"w-[100%] min-h-[450px] relative border-b-2  pb-[44.5px] mb-[50px]"'
                //         }
                //       >
                //         <div className="skeleton-image  rounded-[20px] animate-pulse" />
                //         <div className="skeleton-text mt-[30.2px] mb-[68px] animate-pulse" />
                //         <div className="skeleton-date absolute bottom-[41.5px] animate-pulse" />
                //       </div>
                //     );
                //   })}
                // </>
                <Pagination
                  totalPages={page.length}
                  selectedPage={selectedPage}
                  onPageChange={handlePageChange}
                />
              ) : (
                <>
                  {!audio?.length > 0 ? (
                    <div className="flex justify-start items-center text-[18px] w-full">
                      No Video Found.
                    </div>
                  ) : (
                    audio?.map((item, i) => (
                      <AudioCard
                        playerRef={playerRef}
                        key={i}
                        title={item.title}
                        // date={moment(item?.createdAt).format(
                        //   "MMM DD YYYY | h:mm A"
                        // )}
                        date={item?.createdAt}
                        imgSrc={item.thumbnailUrl}
                        cardWidth={"w-[100%]"}
                        imgStyle={"h-[226.54px]"}
                        onClick={() => handleAudioModalShow(item)}
                        audioUrl={item.audioUrl}
                        isPlaying={
                          progress !== 100 ? i === playingIndex : false
                        }
                        onPlay={() => handleAudioPlay(i)}
                        played={i === playingIndex ? progress : 0}
                        progress={handleVideoProgress}
                        handleRepeatVideo={handleRepeatVideo}
                        onEnded={playNextAudio} // Trigger next audio on end
                      />
                    ))
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        {/* <div className="flex justify-end items-center gap-[12px]"> */}
        <Pagination
          totalPages={audioPage.length}
          selectedPage={selectedAudioPage}
          onPageChange={handleAudioPageChange}
        />
        {/* {audioPage.map((item) => {
            return (
              // <div
              //   className={`h-[36px] w-[36px] flex items-center justify-center rounded-[11px] border-[1px] ${
              //     item == selectedAudioPage
              //       ? "border-primary text-primary"
              //       : "border-grey-dark text-grey-dark"
              //   }`}
              //   onClick={() => handleAudioPageChange(item)}
              // >
              //   {item}
              // </div>
             
            );
          })} */}
        {/* </div> */}
      </div>
    </div>
  );
}
