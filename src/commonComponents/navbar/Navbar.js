import React, { useEffect, useState } from "react";
import Button from "../button/Button";
import Image from "../image/Image";
// import { Link } from "react-router-dom";
import DropDown from "../dropdown/DropDown";
import { useNavbar } from "./useNavbar";
import SearchDropdown from "../searchDropDown/SearchDropdown";
import { useRouter } from "next/navigation";

export default function Navbar({
  setSidebarOpen,
  sidebarOpen,
  openModal,
  openSubscribeModal,
  openContactModal,
  navigateToMusic,
  navigateToInfluasity,
  navigateToHome,
  navigateToPeeks,
  navigateToNews,
}) {
  const navLinks = [
    {
      id: 1,
      name: "Home",
      icon: "/icons/home.svg",
      type: "link",
      onClick: navigateToHome,
    },
    {
      id: 2,
      name: "Peeks",
      icon: "/icons/play-light.svg",
      type: "link",
      onClick: navigateToPeeks,
    },
    {
      id: 3,
      name: "News",
      icon: "/icons/newspaper.svg",
      type: "dropdown",
      onClick: navigateToNews,
    },
    {
      id: 4,
      name: "Music",
      icon: "/icons/music-note-beamed.svg",
      type: "link",
      onClick: navigateToMusic,
    },
    {
      id: 5,
      name: "Influensity",
      icon: "/icons/music-note-beamed.svg",
      type: "link",
      onClick: navigateToInfluasity,
    },
    {
      id: 6,
      name: "Contact",
      icon: "/icons/sent.svg",
      type: "link",
      onClick: openContactModal,
    },
  ];
  const router = useRouter();
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 10);
    });
  });
  const { query, setQuery, blogsByCategory } = useNavbar();
  const NavLink = ({ onClick, name, icon }) => {
    return (
      <div
        className="flex items-center gap-[6.9px] md:hidden sm:hidden xs:hidden cursor-pointer"
        onClick={onClick}
      >
        <img src={icon} />
        <p className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[18px]">
          {name}
        </p>
      </div>
    );
  };
  return (
    <div className={` ${scroll ? "sticky" : ""}`}>
      <div className="pt-[62px] flex justify-between items-center">
        <div className="flex items-center gap-[42px] lg:gap-[25px] md:gap-[20px] ">
          <Image
            onClick={() => {
              router.push("/");
            }}
            src={"/icons/logo.svg"}
            className={
              "h-[100px] w-[250px] sm:h-[60%] sm:w-[150px] xs:h-[60%] xs:w-[200px]"
            }
          />
        </div>
        <div className="flex items-center gap-[20.3px] lg:gap-[12px] md:gap-[15px]">
          {/* <div className="bg-white-1 px-[26px] py-[17px] rounded-[28px] flex items-center justify-between w-[273px]  lg:hidden md:hidden sm:hidden xs:hidden">
            <input
              type="text"
              className="bg-white-1 font-dmSans text-[15px] w-full outline-none"
              placeholder="Search Article name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <img src="/icons/search.svg" />
          </div> */}
          <div className="lg:hidden md:hidden sm:hidden xs:hidden w-[273px]">
            <SearchDropdown />
          </div>
          {navLinks?.map(({ icon, name, type, onClick }) => {
            return (
              <>
                {type === "link" ? (
                  <NavLink name={name} icon={icon} onClick={onClick} />
                ) : (
                  <DropDown
                    icon={icon}
                    name={name}
                    options={Object.keys(blogsByCategory).filter(
                      (category) => category !== "Uncategorized"
                    )}
                    onClick={navigateToNews}
                  />
                )}
              </>
            );
          })}

          <div
            className="sm:hidden xs:hidden cursor-pointer"
            onClick={openModal}
          >
            <p className="font-dmSans text-primary font-medium text-[18px]">
              Submit a video
            </p>
          </div>
          <Button
            title={"Subscribe"}
            buttonStyle="px-[24px] py-[15px] bg-primary text-white-2 rounded-[13px] sm:hidden xs:hidden"
            textStyle={"text-[18px]"}
            onClick={openSubscribeModal}
          />
          <div className="hidden md:block sm:block xs:block">
            <div
              className="py-[22px] sm:py-[15px] xs:py-[15px] bg-white-1 px-[20px] sm:px-[15px] xs:px-[15px] rounded-[13px] sm:rounded-[9px] xs:rounded-[9px] flex items-center gap-[10.5px]  ml-[10px] "
              onClick={() => {
                window.scrollTo({
                  top: 0,
                });
                setSidebarOpen(!sidebarOpen);
              }}
            >
              <Image src="/icons/burger.svg" />
              <p className="font-dmSans text-[14px] text-secondary sm:hidden xs:hidden">
                Home
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
