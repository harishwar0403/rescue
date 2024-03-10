import { useEffect, useState } from "react";
import "./Herostyles.css";
import Cookies from "js-cookie";

function Hero(props) {
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
      <div className={props.cName}>
        <img alt="HeroImg" src={props.HeroImg} />

        <div className="hero-text">
          <h1>{props.title}</h1>

          <p>{props.text}</p>

          {(userData.role == "USER" ||
            userData == null ||
            userData == undefined ||
            !userData) && (
            <a href={props.url} className={props.btnclass}>
              {props.buttonText}
            </a>
          )}
        </div>
      </div>
    </>
  );
}

export default Hero;
