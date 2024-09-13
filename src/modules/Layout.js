import React, { useState, useEffect } from "react";
import { Navbar } from "../commonComponents";
import Sidebar from "../commonComponents/sidebar/Sidebar";
import Footer from "../commonComponents/footer/Footer";
import FormModal from "../commonComponents/formModal/FormModal";
import SubscribeModal from "../commonComponents/subscribeModal/SubscribeModal";
import { Toaster } from "react-hot-toast";
import ContactModal from "../commonComponents/contactModal/ContactModal";
import { useNavigate } from "react-router-dom";
import {
  getBlogBycategory,
  getBlogsLocations,
  setBlog,
} from "../redux/slices/blog.slice";
import { useDispatch } from "react-redux";
import SEO from "../commonComponents/SEO";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const [isContactModal, setIsContactModalOpen] = useState(false);
  const navigate = useNavigate();
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
    navigate("/music");
  };
  const navigateToInfluasity = () => {
    setSidebarOpen(false);
    navigate("/Influensity");
  };
  const navigateToPeeks = () => {
    setSidebarOpen(false);
    navigate("/peeks");
  };
  const navigateToHome = () => {
    setSidebarOpen(false);
    navigate("/");
  };
  const navigateToNews = (id) => {
    setSidebarOpen(false);
    navigate(`/blogs-list/${id}`, { replace: true });
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
    getLocations()
    getBlogsByCategory();
  }, []);
  return (
    <div className="relative">
      {/* <SEO /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <FormModal isOpen={isModalOpen} onClose={closeModal} />
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
}
