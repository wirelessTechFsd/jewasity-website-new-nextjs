import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideos, searchByArticle } from "../../redux/slices/video.slice";

export function useNavbar() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const { blogsByCategory } = useSelector((state) => state.blog);
  const dispatch = useDispatch();
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query === "") {
        dispatch(
          getVideos({
            payload: 1,
          })
        );
      } else {
        setDebouncedQuery(query);
      }
    }, 300);

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
  return {
    query,
    setQuery,
    debouncedQuery,
    setDebouncedQuery,
    blogsByCategory
  };
}
