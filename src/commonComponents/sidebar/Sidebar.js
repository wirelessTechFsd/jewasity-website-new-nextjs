import React, { useEffect, useState } from "react";
import Image from "../image/Image";
import { useDispatch, useSelector } from "react-redux";
import { getVideos, searchByArticle } from "../../redux/slices/video.slice";
import SearchDropdown from "../searchDropDown/SearchDropdown";
import Button from "../button/Button";
export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  openModal,
  openSubscribeModal,
  navigateToInfluasity,
  openContactModal,
  navigateToMusic,
  navigateToHome,
  navigateToNews,
  navigateToPeeks,
}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { blogsByCategory } = useSelector((state) => state.blog);
  const [dropdown, setDropDown] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query === "") {
        dispatch(
          getVideos({
            payload: 1,
          })
        );
        setSidebarOpen(false);
      } else {
        setDebouncedQuery(query);
        setSidebarOpen(false);
      }
    }, 300); // Adjust debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim() === "") return;
    const fetchData = () => {
      dispatch(
        searchByArticle({
          payload: encodeURIComponent(debouncedQuery),
        })
      );
    };

    fetchData();
  }, [debouncedQuery]);
  return (
    <>
      {sidebarOpen && (
        <div className="h-full w-[350px] sm:w-full xs:w-full absolute left-0 top-0  bg-white border p-6 flex flex-col gap-7 justify-start align-top z-10">
          <div className="flex justify-between items-center">
            <Image src={"/icons/logo.svg"} width={200} />
            <div onClick={() => setSidebarOpen(false)}>
              <Image src={"/images/cross.png"} width={25} height={25} />
            </div>
          </div>
          <div className="xl:hidden 2xl:hidden w-full">
            {/* <div className="bg-white-1 px-[26px] py-[17px] rounded-[28px] flex items-center justify-between w-full">
              <input
                type="text"
                className="bg-white-1 font-dmSans text-[15px] w-full outline-none"
                placeholder="Search by Article"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <img src="/icons/search.svg" />
            </div> */}
            <SearchDropdown setSidebarOpen={setSidebarOpen} />
          </div>
          <div
            className="flex items-center justify-start gap-[6.9px] xl:hidden 2xl:hidden lg:hidden ml-4"
            onClick={navigateToHome}
          >
            <img src="/icons/home.svg" />
            <p className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[20px]">
              Home
            </p>
          </div>
          <div
            className="flex items-center justify-start gap-[6.9px] xl:hidden 2xl:hidden lg:hidden ml-4"
            onClick={navigateToPeeks}
          >
            <img src="/icons/play-light.svg" />
            <p className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[20px]">
              Peeks
            </p>
          </div>
          <div
            className="flex items-center justify-start gap-[6.9px] xl:hidden 2xl:hidden lg:hidden  ml-4"
            onClick={() => {
              setDropDown(!dropdown);
            }}
          >
            <img src="/icons/newspaper.svg" />
            <p className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[20px]">
              News
            </p>
            <img src="/icons/arrow-down.svg" />
          </div>
          {dropdown && (
            <div className="flex flex-col justify-start items-start gap-3  ml-8">
              {Object.keys(blogsByCategory)
                .filter((category) => category !== "Uncategorized")
                .map((option, i) => (
                  <p
                    key={i}
                    className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[20px] cursor-pointer"
                    onClick={() => {
                      navigateToNews(option);
                      setDropDown(false);
                    }}
                  >
                    {option}
                  </p>
                ))}
            </div>
          )}
          <div
            className="flex items-center justify-start gap-[6.9px] xl:hidden 2xl:hidden lg:hidden  ml-4"
            onClick={navigateToMusic}
          >
            <img src="/icons/music-note-beamed.svg" />
            <p className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[20px]">
              Music
            </p>
          </div>
          <div
            className="flex items-center justify-start gap-[6.9px] xl:hidden 2xl:hidden lg:hidden  ml-4"
            onClick={navigateToInfluasity}
          >
            <img src="/icons/music-note-beamed.svg" />
            <p className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[20px]">
              Influencity
            </p>
          </div>
          <div
            className="flex items-center justify-start gap-[6.9px] xl:hidden 2xl:hidden lg:hidden  ml-4"
            onClick={openContactModal}
          >
            <img src="/icons/sent.svg" />
            <p className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[20px]">
              Contact
            </p>
          </div>
          <div className="items-center justify-start hidden sm:flex xs:flex  ml-4">
            <p
              className="font-dmSans text-primary font-medium text-[20px]"
              onClick={() => {
                setSidebarOpen(false);
                openModal();
              }}
            >
              Submit a video
            </p>
          </div>
          <Button
            title={"Subscribe"}
            buttonStyle="px-[24px] py-[15px] bg-primary text-white-2 rounded-[13px] hidden sm:block xs:block"
            textStyle={"text-[18px]"}
            onClick={openSubscribeModal}
          />
        </div>
      )}
    </>
  );
}
