import React from "react";

export default function DropDown({ onClick, name, icon, options }) {
  return (
    <div>
      <li className="group relative flex cursor-pointer flex-wrap items-center text-[14px] sm:hidden md:hidden xs:hidden">
        <div className="flex items-center gap-[6.9px] md:hidden sm:hidden xs:hidden cursor-pointer">
          {icon && <img src={icon} />}
          <p className="font-dmSans text-grey-dark opacity-[0.39] font-medium text-[18px]">
            {name}
          </p>
        </div>
        <div className="invisible absolute left-0 top-full z-50 w-max transform opacity-0 transition duration-500 ease-in-out group-hover:visible group-hover:opacity-100">
          <div className="relative w-[170px] rounded-xl bg-white p-6 shadow-xl">
            <div className="absolute left-1/2 top-0 z-0 h-10 w-10 -translate-x-1/2 rotate-45 transform rounded-sm bg-white"></div>
            <div className="relative z-10">
              <div className="grid gap-2">
                <div className="border-gray-300">
                  <ul className="text-[15px]">
                    {options?.map((option, index) => (
                      <li
                        key={index}
                        onClick={() => onClick(option)}
                        className="group relative -mx-2 w-[140px] block rounded-lg p-2 font-normal text-gray-800 transition duration-300 ease-in-out hover:bg-gradient-to-br hover:from-indigo-50 hover:via-blue-50 hover:to-pink-50 hover:text-primary"
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}
