import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import HeroImg from "../assets/4.jpg";
import Destination from "../components/Destination";
import Trip from "../components/trip";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        HeroImg={HeroImg}
        title="Flood Rescue Service"
        text="Let'help our socity"
        buttonText="Service Plan"
        url="/pro"
        btnclass="show"
      />
      <Destination />
      {/* <Trip/> */}
      <Footer />
    </>
  );
}

export default Home;
