import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SEO from "../commonComponents/SEO";

export default function Lock() {
  const navigate = useNavigate();
  const code = "5511";
  const [password, setPassword] = useState("");
  const handlePassword = (e) => {
    e.preventDefault();
    if (password == code) {
      navigate("/home");
    } else {
      alert("Wrong Password");
    }
  };
  return (
    <div>
      <SEO title={'Jewasity-Coming Soon'} />
      <div className="w-full h-[100vh] relative ">
        <img src="/images/lock-bg.webp" className="w-[100%] h-[100%]" />
        <div className="absolute flex items-center justify-center inset-0 flex-col gap-[30px]">
          <p className="text-[80px] sm:text-[60px] xs:text-[50px] font-bold font-dmSans text-white">
            Coming Soon
          </p>
          <form onSubmit={handlePassword}>
            <div className="flex gap-[10px] items-center flex-wrap justify-center px-5">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="h-[40px] w-[300px] sm:w-full xs:w-full rounded-[60px] px-4 py-3 outline-none"
                placeholder="Enter Password"
              />
              <button
                className="h-[40px] rounded-[60px] w-[90px] sm:w-full xs:w-full bg-black text-white"
                // onClick={handlePassword}
              >
                Enter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
