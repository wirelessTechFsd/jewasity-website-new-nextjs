// import React, { useEffect } from "react";
// import Image from "../image/Image";
// import blogData from "../../blog.json";

// const ShareModal = ({ isOpen, onClose, isFeatured }) => {
//   const url = encodeURIComponent(window.location.href);
//   const text = encodeURIComponent(isFeatured?.title);
//   return (
//     <>
//       {isOpen && (
//         <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
//           <div
//             className="fixed inset-0 bg-black opacity-50"
//             onClick={onClose}
//           ></div>
//           <div className="relative w-[400px] max-w-[90%] max-h-screen overflow-y-auto mx-auto my-6 bg-white py-6 px-8 rounded-lg">
//             {/* Modal content */}
//             <div className="modal-content">
//               <div className="flex items-start justify-between">
//                 <h3 className="xl:text-[24px] lg:text-[24px] md:text-[24px] text-[20px] font-bold">
//                   Share
//                 </h3>
//                 <button
//                   onClick={onClose}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <Image src={"/images/cross.png"} />
//                 </button>
//               </div>
//               <div className="modal-body">
//                 <div className="flex item-center justify-center gap-[40px] md:gap-[30px] sm:gap-[30px] xs:gap-[20px] mt-8 mb-8">
//                   <a
//                     href={`https://www.facebook.com/sharer.php?u=${url}/${text}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Image
//                       src={blogData?.shareLinks?.facebook?.icon}
//                       className={"cursor-pointer"}
//                     />
//                   </a>

//                   <a
//                     href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Image
//                       src={blogData?.shareLinks?.twitter?.icon}
//                       className={"cursor-pointer"}
//                     />
//                   </a>

//                   <a
//                     href={`https://t.me/share/url?url=${url}&text=${text}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <Image
//                       src={blogData?.shareLinks?.t?.icon}
//                       className={"cursor-pointer"}
//                     />
//                   </a>
//                   <a
//                     href={`https://wa.me/?text=${text}%20${url}`}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="mt-[-3px]"
//                   >
//                     <Image
//                       src={blogData?.shareLinks?.whatsapp?.icon}
//                       alt="WhatsApp"
//                     />
//                   </a>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default ShareModal;

import React, { useEffect, useState } from "react";
import Image from "../image/Image";
import blogData from "../../blog.json";

const ShareModal = ({ isOpen, onClose, isFeatured }) => {
  const text = encodeURIComponent(isFeatured?.title || '');
  const url = encodeURIComponent(`${window.location.href}?title=${text}&watch=true`);
  const [copy, setCopy] = useState(false);
  useEffect(() => {
    if (copy) {
      setTimeout(() => {
        setCopy(false);
      }, 7000);
    }
  }, [copy]);
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={onClose}
          ></div>
          <div className="relative w-[400px] max-w-[90%] max-h-screen overflow-y-auto mx-auto my-6 bg-white py-6 px-8 rounded-lg">
            {/* Modal content */}
            <div className="modal-content">
              <div className="flex items-start justify-between">
                <h3 className="xl:text-[24px] lg:text-[24px] md:text-[24px] text-[20px] font-bold">
                  Share
                </h3>
                <button
                  onClick={onClose}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <Image src={"/images/cross.png"} />
                </button>
              </div>
              <div className="modal-body">
                <div className="flex item-center justify-center gap-[40px] md:gap-[30px] sm:gap-[30px] xs:gap-[20px] mt-8 mb-8">
                  <a
                    href={`https://www.facebook.com/sharer.php?u=${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={blogData?.shareLinks?.facebook?.icon}
                      className={"cursor-pointer"}
                      alt="Share on Facebook"
                    />
                  </a>

                  <a
                    href={`https://twitter.com/intent/tweet?url=${url}&text=${text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={blogData?.shareLinks?.twitter?.icon}
                      className={"cursor-pointer"}
                      alt="Share on Twitter"
                    />
                  </a>

                  <a
                    href={`https://t.me/share/url?url=${url}&text=${text}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                       src={blogData?.shareLinks?.t?.icon}
                      className={"cursor-pointer"}
                      alt="Share on Telegram"
                    />
                  </a>

                  <a
                    href={`https://wa.me/?text=${text}%20${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={blogData?.shareLinks?.whatsapp?.icon}
                      className={"cursor-pointer"}
                      alt="Share on WhatsApp"
                    />
                  </a>
                  <div
                className="cursor-pointer mt-[-3px]"
                onClick={() => {
                  const link = `${window.location.href}?title=${text}&watch=true`;
                  navigator.clipboard.writeText(link);
                  setCopy(true);
                }}
              >
                <Image
                  src={copy ? "/icons/copy-done.svg" : "/icons/copy.svg"}
                  className={copy ? "" : "opacity-[0.3]"}
                />
              </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ShareModal;
