import React from "react";
import Image from "../image/Image";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBlogsByLocations } from "../../redux/slices/blog.slice";
import { useRouter } from "next/navigation";

export default function Footer() {
  // const url = encodeURIComponent(window.location.href);
  // const url = encodeURIComponent(window.location.href);
  const router = useRouter();

  const { locations } = useSelector((state) => state.blog);
  console.log("footer", locations);
  const newLocations = locations?.map((item) => item.name);
  // const text = encodeURIComponent(isFeatured?.title);
  const FooterSection = ({ title, links, type }) => {
    return (
      <div className="w-[300px]">
        {title && (
          <p className="text-[25px] font-regular text-grey-dark">{title}</p>
        )}
        <div className={title ? `mt-[56px]` : "mt-[0px]"}>
          {links?.map((link) => {
            switch (type) {
              case "tags":
                return (
                  // <Link to={`/location-blogs-list/${link}`}>
                  <p
                    onClick={() => {
                      router.push("/location-blogs-list/${link}");
                    }}
                    className="text-[22px] text-grey-dark opacity-[0.6]"
                  >
                    {link}
                  </p>
                  // </Link>
                );
              case "social":
                return (
                  <a href={link.href ? link.href : ""} target="blank">
                    <p className="text-[22px] text-grey-dark opacity-[0.6]">
                      {link.name}
                    </p>
                  </a>
                );
              case "about":
                return (
                  // <Link to={`/${link.href}`}>
                  <p
                    onClick={() => {
                      router.push(`/${link.href}`);
                    }}
                    className="text-[22px] text-grey-dark opacity-[0.6] flex items-center gap-2"
                  >
                    {link.name}{" "}
                    {link?.name == "Advertise With Us" ? (
                      <div className="h-[14px] w-[14px] rounded-2xl  bg-gradient-to-r from-[#ff916f] via-[#fd6738] to-[#ff3c00] fade-in-out" />
                    ) : (
                      ""
                    )}
                  </p>
                  // </Link>
                );

              case "apps":
                return (
                  <>
                    {link?.startsWith("/") && (
                      <div className="w-[200px]  mt-2">
                        <img
                          src={link}
                          alt={link}
                          className="w-full h-[60px] "
                        />
                        <p className="text-[12px] text-grey-dark opacity-[0.6] text-right">
                          (Coming Soon)
                        </p>
                      </div>
                    )}
                  </>
                );
              default:
                break;
            }
          })}
        </div>
      </div>
    );
  };
  return (
    <div>
      <div className="mt-[115px] pt-[76px] pl-[51px] pb-[117px] pr-[65px] bg-white-1 flex items-start md:flex-wrap sm:flex-wrap xs:flex-wrap gap-[143px] md:gap-[90px] sm:gap-[60px] xs:gap-[60px]">
        <div>
          {/* <Link to={"/"}> */}
          <Image
            onClick={() => {
              router.push("/");
            }}
            src={"/icons/logo.svg"}
          />
          {/* </Link> */}
          <p className="text-[20px] font-regular w-[348px] md:w-full sm:w-full xs:w-full text-grey-dark opacity-[0.8] mt-[46.8px] flex flex-col gap-3">
            <p>You were born to be curious.</p>
            <p>
              And we were born to quench that curiosity by sharing with you the
              living, breathing, and thriving happenings within the jewish
              community.
            </p>
            <p>
              From heartwarming stories and recent music releases to current
              events and breaking news, we’re here to bring you closer to the
              heart of our community. Join us in discovering the people, places,
              and moments that make our little world so wonderfully dynamic.
            </p>
          </p>
          <div className="mt-[49.5px] flex gap-[41.1px] items-center flex-wrap">
            {/* <a
              href={`https://www.facebook.com/sharer.php?u=${url}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image src={"/icons/fb.svg"} />
            </a> */}
            {/* <Image src={"/icons/ig.svg"} /> */}
            <a href={`https://x.com/jewasity`} target="_blank">
              <Image src={"/icons/x.svg"} />
            </a>
            <a href={`https://www.youtube.com/@jewasity`} target="_blank">
              <Image src={"/icons/youtube.svg"} />
            </a>
            <a href={`https://www.t.me/Jewasity`} target="_blank">
              <Image src={"/icons/telegrm.svg"} />
            </a>
            <a href={`https://www.instagram.com/jewasity/`} target="_blank">
              <Image src={"/icons/ig.svg"} />
            </a>
            <a href={`https://www.tiktok.com/jewasity`} target="_blank">
              <Image src={"/icons/tiktok.svg"} height={28} width={28} />
            </a>
          </div>
        </div>
        <div className="flex items-start  flex-wrap justify-between gap-[30px] w-[100%]">
          {/* <FooterSection
            title={"Contact"}
            links={["Office@Jewasity.Com", "+1 123 456 789 000"]}
          /> */}
          <FooterSection
            title={"Search By Location"}
            type="tags"
            links={newLocations || []}
          />
          <FooterSection
            title={"Connect with Jewasity"}
            type="social"
            links={[
              {
                name: "Twitter",
                href: "https://x.com/jewasity",
              },
              {
                name: "Youtube",
                href: "https://www.youtube.com/@jewasity",
              },
              {
                name: "Instagram",
                href: "https://www.instagram.com/jewasity/",
              },
              {
                name: "Telegram",
                href: "https://www.t.me/Jewasity",
              },
              {
                name: "WhatsApp",
                href: "https://api.whatsapp.com/send?phone=19294651512&text=Sign%20up%20",
              },
              {
                name: "SMS (Coming Soon)",
                href: "#",
              },
            ]}
          />
          <FooterSection
            title={"About Jewasity"}
            type="about"
            links={[
              // {
              //   href: "community-info",
              //   name: "Community Info",
              // },
              // {
              //   href: "sitemap.xml",
              //   name: "Sitemap",
              // },
              {
                href: "terms-and-conditions",
                name: "Terms & Conditions",
              },
              {
                href: "privacy",
                name: "Privacy",
              },
              {
                href: "permissions",
                name: "Permissions",
              },
              // {
              //   href: "mission-statement",
              //   name: "Mission Statement",
              // },
              // {
              //   href: "advertise",
              //   name: "Advertise",
              // },
              {
                href: "write-for-us",
                name: "Write for us",
              },
              {
                href: "advertise-with-us",
                name: "Advertise With Us",
              },
            ]}
          />
          <FooterSection
            type="apps"
            links={["/images/playstore.png", "/images/appstore.png"]}
          />
          {/* <FooterSection
            title={"Accessibility"}
            links={[
              "Facebook",
              "Twitter",
              "Youtube",
              "Instagram",
              "Linkedin",
              "Telegram",
              
            ]}
          /> */}
        </div>
      </div>
      <div className="flex items-center justify-center h-[70px] w-full">
        <p className="font-[700] font-dmSans text-[18px] sm:text-[14px] xs:text-[14px]">
          © All Rights Reserved by Jewasity 2024
        </p>
      </div>
    </div>
  );
}
