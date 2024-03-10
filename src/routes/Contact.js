import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import AboutImg from "../assets/2.png";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import NotificationContainer from "../components/notificationContainer";

function Contact() {
  const [userData, setuserData] = useState({});

  const cookie = Cookies.get("userData");
  useEffect(() => {
    const scahedata = cookie ? JSON.parse(cookie) : false;
    if (scahedata) {
      setuserData(scahedata);
    }
  }, [cookie]);
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        HeroImg={AboutImg}
        title="Contact Us"
        btnclass="Hide"
      />

      {userData && userData.role == "VOLUNTEER" ? (
        <NotificationContainer userData={userData} />
      ) : (
        <ContactForm userData={userData} />
      )}
      <Footer />
    </>
  );
}

export default Contact;
