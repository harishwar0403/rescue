
import Hero from "../components/Hero";
import Navbar from "../components/Navbar"
import AboutImg from "../assets/6.avif"
import Footer from "../components/Footer";
import Trip from "../components/trip";

function Pro (){
    return(
        <>
         <Navbar />
             <Hero 
             cName="hero-mid"
             HeroImg={AboutImg}
             title="Services"
             btnclass="Hide"
             />
             <Trip/>
             <Footer/>
        </>
    )

}

export default Pro;