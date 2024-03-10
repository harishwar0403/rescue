import "./Tripstyles.css";
import Tripdata from "./tripdata";
import Trip1 from "../assets/11.jpg";
import Trip2 from "../assets/14.jpg";
import Trip3 from "../assets/12.jpg";

function Trip() {
  return (
    <div className="Trip">
      <h1 className="h1">OUR SERVICES</h1>
      <p>Let's ready to rescue people from Flood</p>
      <div className="tripcard">
        <Tripdata
          image={Trip1}
          heading="Food Service"
          text="Food services are available for people those how are affected by flood, If you need request send the request"
        />
        <Tripdata
          image={Trip2}
          heading="Medicine Service"
          text="Medicine services are available for people those how are affected by flood, If you need any medicine  send the request"
        />
        <Tripdata
          image={Trip3}
          heading="Other Service"
          text="Other services are available for people those how are affected by flood, If you need request send the request"
        />
      </div>
    </div>
  );
}

export default Trip;
