// import React from "react";

// export default function AnimatedLoader() {
//   return (
//     <div class="spinner">
//       <div></div>
//       <div></div>
//       <div></div>
//       <div></div>
//       <div></div>
//       <div></div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

export default function AnimatedLoader({ setLoading }) {
  const [isVideoLoad, setIsVideoLoad] = useState(false);
  useEffect(()=>{
    setIsVideoLoad(true)
  },[])
  return (
    <ReactPlayer
      url="/videos/loader.mp4"
      playing={isVideoLoad}
      loop={false}
      controls={false}
      width="100%"
      height="100%"
      onEnded={() => {
        setLoading(false);
      }}
      onReady={() => {
        setIsVideoLoad(true);
      }}
      style={{
        width:"100%",
        height:"100%"
      }}
      onStart={()=>{      }}
      className={"outline-none border-none"}
      muted
    />
  );
}
