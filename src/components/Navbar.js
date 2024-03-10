import { useEffect, useState } from "react";
import "./Navbarstyles.css";
import { MenuItems } from "./MenuItems";
import { Link, useLocation } from "react-router-dom";

import React from "react";
import Cookies from "js-cookie";
import { Button, Menu, MenuItem, Typography } from "@mui/material";
import { KeyboardArrowDown, Logout } from "@mui/icons-material";

export default function Navbar() {
  const location = useLocation();

  const [clicked, setclicked] = useState(false);
  const [isLogged, setisLogged] = useState(false);
  const [userData, setuserData] = useState({});
  const [anchorEl, setanchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (event) => {
    setanchorEl(event.currentTarget);
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
    }
  }, [cookie]);

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
          } else if (item.title == "Pro" && userData.role == "VOLUNTEER") {
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
      </ul>
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
