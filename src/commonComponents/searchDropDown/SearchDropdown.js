// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { getSearchedBlog } from "../../redux/slices/blog.slice";

// const SearchDropdown = () => {
//   const [query, setQuery] = useState("");
//   const [showDropdown, setShowDropdown] = useState(false);
//   const items = ["Article 1", "Article 2", "Article 3"]; // Sample items, replace with your data
//   const dispatch = useDispatch();
//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setQuery(value);
//     setShowDropdown(value.length > 0);
//   };

//   const filteredItems = items.filter((item) =>
//     item.toLowerCase().includes(query.toLowerCase())
//   );
//   const ctaSearchHandler = () => {
//     dispatch(
//       getSearchedBlog({
//         payload: query,
//       })
//     );
//   };
//   return (
//     <div className="relative">
//       <div className="bg-white-1 px-[26px] py-[17px] rounded-[28px] flex items-center justify-between w-[273px]">
//         <input
//           type="text"
//           className="bg-white-1 font-dmSans text-[15px] w-full outline-none"
//           placeholder="Search Article name"
//           value={query}
//           onChange={handleInputChange}
//         />
//         <img src="/icons/search.svg" alt="search-icon" />
//       </div>
//       {showDropdown && (
//         <div className="absolute bg-white-1 w-full mt-2 rounded-[28px] shadow-lg">
//           {filteredItems.length > 0 ? (
//             filteredItems.map((item, index) => (
//               <div key={index} className="px-4 py-2 hover:bg-gray-200">
//                 {item}
//               </div>
//             ))
//           ) : (
//             <div className="px-4 py-2 text-gray-500">No results found</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchDropdown;

import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchedBlog } from "../../redux/slices/blog.slice";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

const SearchDropdown = ({ setSidebarOpen }) => {
  // const navigate = useNavigate();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const { searchResult } = useSelector((state) => state.blog);
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowDropdown(value.length > 0);
  };

  const debouncedSearch = useCallback(
    debounce((query) => {
      dispatch(getSearchedBlog({ payload: query }));
    }, 500), // Adjust the delay as needed
    [dispatch]
  );

  useEffect(() => {
    if (query) {
      debouncedSearch(query);
    }
  }, [query, debouncedSearch]);

  return (
    <div className="relative">
      <div className="bg-white-1 px-[26px] py-[17px] rounded-[28px] flex items-center justify-between w-full ">
        <input
          type="text"
          className="bg-white-1 font-dmSans text-[15px] w-full outline-none"
          placeholder="Search Article name, Tags"
          value={query}
          onChange={handleInputChange}
        />
        <img src="/icons/search.svg" alt="search-icon" />
      </div>
      {showDropdown && (
        <div className="absolute bg-white w-full z-[99] mt-2 rounded-[28px] shadow-lg overflow-hidden">
          {searchResult.length > 0 ? (
            searchResult?.slice(0, 6).map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer flex items-center gap-4 "
                onClick={() => {
                  setQuery("");
                  setShowDropdown(false);
                  router.push(`/blog/${item?.id}`);
                  // navigate(`/blog/${item?.id}`);
                  setSidebarOpen && setSidebarOpen(false);
                }}
              >
                <div className="w-[35%] h-[60px]">
                  <img
                    src={item?.image}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="w-[65%] text-[12px] text-gray text-opacity-[0.5]">
                  {item?.title}
                </p>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
