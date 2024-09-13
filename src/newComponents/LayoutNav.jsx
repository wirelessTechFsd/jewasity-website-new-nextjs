"use client";
import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import mixpanel from "mixpanel-browser";
import { useRouter } from "next/navigation";
import {
  getBlogBycategory,
  getBlogsLocations,
} from "@/redux/slices/blog.slice";
import { useEffect, useState } from "react";
import Footer from "@/commonComponents/footer/Footer";
import Sidebar from "@/commonComponents/sidebar/Sidebar";
import { Navbar } from "@/commonComponents";
import ContactModal from "@/commonComponents/contactModal/ContactModal";
import SubscribeModal from "@/commonComponents/subscribeModal/SubscribeModal";
import FormModal from "@/commonComponents/formModal/FormModal";
import { Toaster } from "react-hot-toast";
mixpanel.init("4fbbe7193eeaa9f4e91b347194243689");

const LayoutNav = ({ children }) => {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isContactModal, setIsContactModalOpen] = useState(false);
  const router = useRouter();
  const openModal = () => {
    setSidebarOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openSubscribeModal = () => {
    setSidebarOpen(false);
    setIsSubscribeModalOpen(true);
  };

  const closeSubscribeModal = () => {
    setIsSubscribeModalOpen(false);
  };
  const openContactModal = () => {
    setSidebarOpen(false);
    setIsContactModalOpen(true);
  };

  const closeContactModal = () => {
    setIsContactModalOpen(false);
  };
  const navigateToMusic = () => {
    setSidebarOpen(false);
    router.push("/music");
  };
  const navigateToInfluasity = () => {
    setSidebarOpen(false);
    router.push("/Influensity");
  };
  const navigateToPeeks = () => {
    setSidebarOpen(false);
    router.push("/peeks");
  };
  const navigateToHome = () => {
    setSidebarOpen(false);
    router.push("/");
  };
  const navigateToNews = (id) => {
    setSidebarOpen(false);
    router.push(`/blogs-list/${id}`, { replace: true });
  };
  const getBlogsByCategory = () => {
    dispatch(
      getBlogBycategory({
        payload: "",
        callback: (data) => {
          if (data?.status == 200) {
          }
        },
      })
    );
  };
  const getLocations = () => {
    dispatch(
      getBlogsLocations({
        payload: "",
        callback: (data) => {
          console.log("location", data);
        },
      })
    );
  };
  useEffect(() => {
    getLocations();
    getBlogsByCategory();
  }, []);

  return (
    <div className="relative">
      {/* <SEO /> */}
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
      {/* <FormModal isOpen={isModalOpen} onClose={closeModal} /> */}
      <SubscribeModal
        isOpen={isSubscribeModalOpen}
        onClose={closeSubscribeModal}
      />
      <ContactModal isOpen={isContactModal} onClose={closeContactModal} />
      <div className="px-[51px] sm:px-[30px] xs:px-[20px]">
        <Navbar
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
          openModal={openModal}
          openSubscribeModal={openSubscribeModal}
          openContactModal={openContactModal}
          navigateToMusic={navigateToMusic}
          navigateToInfluasity={navigateToInfluasity}
          navigateToHome={navigateToHome}
          navigateToPeeks={navigateToPeeks}
          navigateToNews={navigateToNews}
        />
      </div>
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        openModal={openModal}
        openSubscribeModal={openSubscribeModal}
        openContactModal={openContactModal}
        navigateToMusic={navigateToMusic}
        navigateToInfluasity={navigateToInfluasity}
        navigateToHome={navigateToHome}
        navigateToNews={navigateToNews}
        navigateToPeeks={navigateToPeeks}
      />

      <div className="px-[51px] sm:px-[30px] xs:px-[20px]">{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutNav;
