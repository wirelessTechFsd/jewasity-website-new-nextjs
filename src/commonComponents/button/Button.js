// import React from "react";
// import Loader from "../loader/Loader";

// export default function Button({
//   title,
//   buttonStyle,
//   textStyle,
//   subTextStyle,
//   onClick,
//   icon,
//   subText,
//   loading,
// }) {
//   return (
//     <button className={buttonStyle} onClick={onClick}>
//       {icon && <span>{icon}</span>}
//       <div className="w-full">
//         {subText && (
//           <div className="flex items-center gap-[6.5px]">
//             <p className={subTextStyle}>{subText}</p>
//             <img
//               src={"/icons/dropDown.svg"}
//               height={10}
//               width={7}
//               className="mt-1"
//             />
//           </div>
//         )}
//         {/* {!loading ? ( */}
//           <p className={textStyle}>{title}</p>
//         {/* ) : ( */}
//           {/* <div className="flex justify-center items-center">
//             <Loader width={20} height={20} color="#fff" />
//           </div>
//         )} */}
//       </div>
//     </button>
//   );
// }
import React from "react";
import Loader from "../loader/Loader";
export default function Button({
  title,
  buttonStyle,
  textStyle,
  subTextStyle,
  onClick,
  icon,
  subText,
  loading,
  disable
}) {
  return (
    <button className={buttonStyle} onClick={onClick} disabled={disable}>
      {icon && <span>{icon}</span>}
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader width={20} height={20} color="#fff" />
        </div>
      ) : (
        <div>
          {subText && (
            <div className="flex items-center gap-[6.5px]">
              <p className={subTextStyle}>{subText}</p>
              <img
                src={"/icons/dropDown.svg"}
                height={10}
                width={7}
                className="mt-1"
              />
            </div>
          )}
          <p className={textStyle}>{title}</p>
        </div>
      )}
    </button>
  );
}
