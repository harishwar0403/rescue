import flood1 from "../assets/5.jpg";
import flood2 from "../assets/7.jpg";
import flood3 from "../assets/9.jpg";
import flood4 from "../assets/10.jpg";
import "./Destinationstyles.css";
import Destinationdata from "./destinationdata";

const Destination = () =>{
    return(
        <div className="destination">
            <h1>Our Plans</h1>
            <p>To help the people who are affected during flood</p>

            <Destinationdata 
            className="first-des"
            heading=" What Are Floods?"
            text="Floods are natural disasters characterized by the overflow of water onto land that is normally dry. They can result from various factors, including heavy rainfall, snowmelt, storms, hurricanes, or the sudden release of water from reservoirs or dams. Floods can occur gradually or suddenly, posing significant risks to lives, property, and infrastructure."
            img1={flood1}
            img2={flood2}
            />    

            <Destinationdata 
            className="first-des-reverse"
            heading="Causes of Floods"
            text="Heavy Rainfall: Intense and prolonged rainfall can overwhelm drainage systems and cause rivers, streams, and other water bodies to overflow their banks.
            
            Snowmelt: Rapid melting of snow, particularly in mountainous regions, can lead to an influx of water into rivers and lakes, contributing to flooding.
            
            Storm Surges: Tropical storms and hurricanes can bring powerful storm surges, causing coastal flooding and inundating low-lying areas.
            
            Flash Floods: Sudden and intense rainfall, often associated with thunderstorms or torrential downpours, can trigger flash floods, which occur with little warning and can be extremely dangerous."
            img1={flood3}
            img2={flood4}
            />           


        </div>
    );
};

export default Destination;