import { Box, Button } from "@mui/material";
import "./Tripstyles.css";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import ReqModal from "./ReqModal";
import toast from "react-hot-toast";

function Tripdata(props) {
  const [open, setopen] = useState(false);
  const [userData, setuserData] = useState({});

  const cookie = Cookies.get("userData");
  useEffect(() => {
    const scahedata = cookie ? JSON.parse(cookie) : false;
    if (scahedata) {
      setuserData(scahedata);
    }
  }, [cookie]);
  const handleClose = () => {
    setopen(false);
  };
  return (
    <div className="t-card">
      <div className="t-image">
        <img src={props.image} alt="loading" />
      </div>
      <h4 style={{ flexWrap: "wrap" }}>{props.heading}</h4>
      <p style={{ flexWrap: "wrap" }}>{props.text}</p>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          marginTop: 3,
        }}
      >
        <Button
          sx={{
            color: "green",
            border: "1px solid green",
            "&:hover": {
              color: "darkgreen",
              border: "1px solid darkgreen",
            },
          }}
          onClick={() => {
            if (Object.keys(userData).length !== 0) {
              if (userData.role == "USER") {
                setopen(true);
              } else {
                toast.error("Only Users can send Requests");
              }
            } else {
              toast.error("Login to send Requests");
            }
          }}
        >
          Request
        </Button>
      </Box>
      <ReqModal open={open} handleClose={handleClose} request={props.heading} />
    </div>
  );
}

export default Tripdata;
