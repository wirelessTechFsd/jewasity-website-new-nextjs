import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getBlogsByLocations,
  getBlogsListByCategory,
  getBlogsListByTags,
} from "../redux/slices/blog.slice";
import Loader from "../commonComponents/loader/Loader";
import { Card } from "../commonComponents";
import Image from "../commonComponents/image/Image";
import SEO from "../commonComponents/SEO";
import { useRouter } from "next/router";

export default function BlogByCategory() {
  let { category, tags, location } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const router = useRouter();
  const { blogsList, loading } = useSelector((state) => state.blog);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location) {
      dispatch(
        getBlogsByLocations({
          payload: {
            name: location,
          },
          callback: (data) => {
            console.log("location blogs", data);
          },
        })
      );
    } else if (category) {
      dispatch(
        getBlogsListByCategory({
          payload: category,
          callback: (data) => {
            if (data?.status === 200) {
              // console.log(data);
            }
          },
        })
      );
    } else {
      dispatch(
        getBlogsListByTags({
          payload: tags,
          callback: (data) => {
            if (data?.status === 200) {
              // console.log(data);
            }
          },
        })
      );
    }
  }, [category, tags, location]);

  const navigateToDetails = (redirectLink) => {
    // navigate(`/blog/${redirectLink}`);
    router.push(`/blog/${redirectLink}`);
  };
  if (loading) {
    return (
      <div className="w-full flex justify-center mt-12">
        <Loader color="#FF3C00" height={40} width={40} />
      </div>
    );
  }
  return (
    <div>
      <SEO title={category || tags || location} />
      <div className=" mt-12">
        <div className="flex items-center gap-[14px] mb-[33px]">
          <Image
            src="/icons/orangeCircle.svg"
            height={20}
            width={20}
            alt="icon"
          />
          <p className="text-[35px] font-regular">
            {category || tags || location}
          </p>
        </div>

        {blogsList?.length ? (
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-cols-5 gap-x-[24px]">
            {blogsList?.map((item, i) => (
              <Card
                title={item?.title}
                date={item?.createdAt}
                breaking={item?.breaking}
                imgSrc={item?.image}
                key={i}
                cardWidth={"w-[100%] min-h-[350px] relative cursor-pointer"}
                imgStyle={"h-[235px]"}
                onClick={() => navigateToDetails(item?.redirectLink)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-[18px] w-full ">No Blogs Found</p>
        )}
      </div>
    </div>
  );
}
