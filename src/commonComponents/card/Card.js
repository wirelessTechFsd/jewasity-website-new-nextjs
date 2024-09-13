import React from "react";
import Image from "../image/Image";
import { renderDate } from "../../utils/dateFormater";

export default function Card({
  ref,
  imgSrc,
  title,
  date,
  cardWidth,
  line,
  onClick,
  imgStyle,
  breaking,
  thumbnail,
  sponsored
}) {
  return (
    <div
      className={cardWidth}
      onClick={() => {
        onClick && onClick();
      }}
    >
      <div className={`relative w-[100%]`}>
        {imgSrc ? (
          <>
            {thumbnail ? (
              <div className="w-full h-[280px] md:h-[300px] sm:h-[400px] xs:h-[400px] overflow-hidden rounded-[20px]">
                <img
                  src={imgSrc}
                  className="w-full h-full object-cover transform scale-[1]"
                />
              </div>
            ) : (
              <Image
                src={imgSrc}
                className={`w-full ${
                  line ? "" : "h-[226.54px]"
                } object-cover rounded-[20px] ${
                  imgStyle || ""
                } bg-black object-cover`}
                defaultSrc="/icons/jewasity.png"
                defaultHeight="200px"
                defaultWidth="200px"
              />
            )}
          </>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <img src={"/icons/jewasity.png"} alt="default" />
          </div>
        )}
        {breaking && (
          <div className="absolute top-2 left-3">
            <div className=" mt-[7px] fade-in-out flex items-center gap-2">
              <div className="h-[17px] w-[17px] rounded-2xl bg-red-600" />
              <p className="text-red-600 font-semibold text-[16px]">Breaking</p>
            </div>
          </div>
        )}
        {sponsored && (
          <div className="absolute top-2 right-3">
            <div className=" mt-[7px] flex items-center gap-2 h-[20px]  bg-white  bg-opacity-70 rounded-[20px] px-2">
              <p className="text-black-600 font-semibold text-[14px]">Sponsored</p>
            </div>
          </div>
        )}
      </div>
      {title && (
        <div className="flex items-start gap-4 mt-[30.2px] mb-[68px] w-[100%]">
          <div className={`${breaking ? "w-[97%]" : "w-[100%]"}`}>
            <p className={`text-[18px] font-regular text-grey break-words `}>
              {title?.length > 100 ? title.substring(0, 100) + "..." : title}
            </p>
          </div>
        </div>
      )}
      {date && (
        <p className="text-[15px] text-grey-dark opacity-[0.4] absolute bottom-[41.5px]">
          {renderDate(date)}
        </p>
      )}
    </div>
  );
}
