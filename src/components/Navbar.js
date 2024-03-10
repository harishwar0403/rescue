import { useEffect, useState } from "react";
import "./Navbarstyles.css";
import { MenuItems } from "./MenuItems";
import { Link, useLocation } from "react-router-dom";

import React from "react";
import Cookies from "js-cookie";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Popover,
  SnackbarContent,
  Stack,
  Typography,
} from "@mui/material";
import {
  Delete,
  KeyboardArrowDown,
  Logout,
  Notifications,
} from "@mui/icons-material";
import { getUserNotification } from "../controllers/notification";
import { getallUser } from "../controllers/user";

export default function Navbar() {
  const location = useLocation();
  const [users, setusers] = useState([]);
  const [notifications, setnotifications] = useState([]);
  const [clicked, setclicked] = useState(false);
  const [isLogged, setisLogged] = useState(false);
  const [userData, setuserData] = useState({});
  const [anchorEl, setanchorEl] = useState(null);
  const [snackbarAnchorEl, setSnackbarAnchorEl] = useState(null);
  const [notificationID, setnotificationID] = useState("");
  const [openNotificationDltModel, setopenNotificationDltModel] =
    useState(false);
  const open = Boolean(anchorEl);
  const openSnackbar = Boolean(snackbarAnchorEl);
  const handleOpenSnackbar = (event) => {
    fetchNotifications();
    setSnackbarAnchorEl(event.currentTarget);
  };
  const handleCloseSnackbar = () => {
    setSnackbarAnchorEl(null);
  };
  const handleOpen = (event) => {
    setanchorEl(event.currentTarget);
  };
  const deleteNotification = (id) => {
    if (id) {
      deleteNotification(id);
    }
  };
  const handleOpenDeleteModel = (id) => {
    handleCloseSnackbar();
    setnotificationID(id);
    setopenNotificationDltModel(true);
  };
  const handleCloseDeleteModel = () => {
    setopenNotificationDltModel(false);
  };
  const handleClose = () => {
    setanchorEl(null);
  };
  const handleClick = () => {
    setclicked(!clicked);
  };
  const cookie = Cookies.get("userData");
  useEffect(() => {
    const scahedata = cookie ? JSON.parse(cookie) : false;
    if (scahedata) {
      setisLogged(true);
      setuserData(scahedata);
      fetchNotifications();
      getallUser().then((user) => {
        setusers(user);
      });
    } else {
      setuserData(false);
    }
  }, [cookie]);
  const getUserName = (id) => {
    const userName = users.find((i) => i._id == id);
    return userName;
  };
  const fetchNotifications = () => {
    getUserNotification(userData._id, true).then((data) => {
      if (data) {
        setnotifications(data);
      }
    });
  };
  const DeleteModel = () => {
    return (
      <Modal
        onClose={handleCloseDeleteModel}
        open={openNotificationDltModel}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Stack sx={{ borderRadius: "10px", padding: "10px" }}>
          <Typography sx={{ color: "slategray", fontWeight: "bold" }}>
            NOTE:Deleting this notification will also delete the associated
            request.
          </Typography>
        </Stack>
      </Modal>
    );
  };
  return (
    <nav className="NavbarItems" style={{ zIndex: 1 }}>
      <h1 className="Navbar-logo">Flood Rescue Service Provider</h1>

      <div className="menu-icons" onClick={handleClick}>
        <i className={clicked ? "fas fa-times" : "fas fa-bars"}> </i>
      </div>

      <ul className={clicked ? "Nav-menu.active" : "Nav-menu"}>
        {MenuItems.map((item, index) => {
          if (item.title == "Contact" && userData.role == "VOLUNTEER") {
            return (
              <li key={index}>
                <Link
                  style={{
                    background:
                      location.pathname == item.url ? "slategray" : "",
                    borderRadius: 10,
                    color: location.pathname == item.url ? "white" : "",
                  }}
                  className={item.cName}
                  to={item.url}
                >
                  <i className={item.icon}></i>
                  Notification
                </Link>
              </li>
            );
          } else if (item.title == "Services" && userData.role == "VOLUNTEER") {
            return null;
          } else {
            return (
              <li key={index}>
                <Link
                  style={{
                    background:
                      location.pathname == item.url ? "slategray" : "",
                    borderRadius: 10,
                    color: location.pathname == item.url ? "white" : "",
                  }}
                  className={item.cName}
                  to={item.url}
                >
                  <i className={item.icon}></i>
                  {item.title}
                </Link>
              </li>
            );
          }
        })}
        <Button
          aria-controls={open ? "authId" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? true : undefined}
          endIcon={isLogged && <KeyboardArrowDown />}
          variant="outlined"
          onClick={(e) => {
            isLogged ? handleOpen(e) : (window.location.href = "/login");
          }}
          sx={{
            cursor: "pointer",
            "&:hover": { color: "black" },
          }}
          id="basic-button"
          {...(isLogged && {
            sx: {
              padding: "2px 10px",
              minWidth: "100px",
              border: "1px solid green",
              color: "green",
              "&:hover": {
                color: "darkgreen",
                border: "1px solid darkgreen",
              },
            },
          })}
        >
          {isLogged ? userData.name : "Sign Up"}
        </Button>
        {(userData.role !== "VOLUNTEER" || !userData) && (
          <IconButton
            disabled={!userData}
            aria-describedby={open ? "notification" : undefined}
            sx={{
              color: "orange",
              "&:hover": {
                color: "darkorange",
              },
            }}
            onClick={handleOpenSnackbar}
          >
            <Notifications />
          </IconButton>
        )}
      </ul>
      <Popover
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={openSnackbar}
        anchorEl={snackbarAnchorEl}
        onClose={handleCloseSnackbar}
        id="notification"
        sx={{
          "& .MuiPopover-paper": {
            backgroundColor: "unset",
          },
          marginTop: 5,
        }}
      >
        <Stack gap={2} sx={{ top: 10 }}>
          {notifications?.map((item, index) => {
            return (
              <SnackbarContent
                key={index}
                sx={{ background: "#c97f23e0", border: "1px solid black" }}
                message={`${getUserName(item.volunteerID)?.name}(${getUserName(item.volunteerID)?.phone}) accepted your ${
                  item.request
                } request`}
                // action={
                //   <IconButton
                //     onClick={() => {
                //       handleOpenDeleteModel(item._id);
                //     }}
                //     sx={{
                //       color: "darkred",
                //       "&:hover": {
                //         color: "white",
                //       },
                //     }}
                //   >
                //     <Delete />
                //   </IconButton>
                // }
              />
            );
          })}
        </Stack>
      </Popover>

      <Menu
        sx={{ zIndex: 2, padding: "0 10px" }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        id="authId"
      >
        <MenuItem>
          <Typography sx={{ color: "slategray", textTransform: "lowercase" }}>
            {userData.role}
          </Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            Cookies.remove("userData");
            window.location.href = "/login";
          }}
        >
          <Logout />
          Logout
        </MenuItem>
      </Menu>
    </nav>
  );
}
