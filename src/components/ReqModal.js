import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { addNotification } from "../controllers/notification";
import MapPage from "./GoogleMap";
import { getallUser } from "../controllers/user";
import { Close } from "@mui/icons-material";

export default function ReqModal({ open, handleClose, request }) {
  const [userData, setuserData] = useState({});

  const cookie = Cookies.get("userData");
  useEffect(() => {
    const scahedata = cookie ? JSON.parse(cookie) : false;
    if (scahedata) {
      setuserData(scahedata);
    }
  }, [cookie]);
  const [users, setusers] = useState([]);
  useEffect(() => {
    getallUser().then((res) => {
      if (res) {
        const mapArr = res.map((data) => ({
          address: data.address,
          longitude: data.location.longitude,
          latitude: data.location.latitude,
          name: data.name,
          pincode: data.pincode,
          id: data._id,
        }));
        setusers(mapArr);
      }
    });
  }, []);
  const handleSendReq = (id) => {
    const obj = {
      userData,
      userID: userData._id,
      volunteerID: id,
      request,
    };
    if (users.volunteerID !== "" && userData && request && id) {
      addNotification(obj);
      handleClose();
    }
  };
  // const userData = [
  //   {
  //     id: 1,
  //     name: "User 1",
  //     latitude: 11.0183,
  //     longitude: 76.9747,
  //     address: "2/147,pudupeerkadavu",
  //     pincode: 638451,
  //   },
  //   {
  //     id: 2,
  //     name: "User 2",
  //     latitude: 11.0122,
  //     longitude: 76.9821,
  //     address: "Description of User 1",
  //     pincode: 638451,
  //   },
  //   {
  //     id: 3,
  //     name: "User 3",
  //     latitude: 10.9982,
  //     longitude: 76.9797,
  //     address: "Description of User 1",
  //     pincode: 638451,
  //   },
  //   {
  //     id: 4,
  //     name: "User 4",
  //     latitude: 11.0016,
  //     longitude: 76.9628,
  //     address: "Description of User 1",
  //     pincode: 638451,
  //   },
  // ];
  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack
        sx={{
          background: "white",
          padding: 5,
          borderRadius: "10px",
          width: "70%",
          height: "70%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <IconButton
            sx={{ position: "absolute", right: 2 }}
            onClick={handleClose}
          >
            <Close />
          </IconButton>
          <Typography variant="h4">{`${request} Request`}</Typography>
        </Box>
        <MapPage handleSendReq={handleSendReq} userData={users} />
      </Stack>
    </Modal>
  );
}
