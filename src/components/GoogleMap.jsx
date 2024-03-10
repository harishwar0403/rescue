// pages/map.js

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { Box, Button } from "@mui/material";

const MapPage = ({ userData, handleSendReq }) => {
  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/7376/7376166.png",
    // shadowUrl: PersonIcon,
    iconSize: [50, 50],
    // iconAnchor: [12, 41],
  });
  return (
    <div style={{ height: "100vh" }}>
      <MapContainer
        center={[11.0168, 76.9558]}
        zoom={13}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Map through user data and render markers */}
        {userData.map((user, index) => (
          <Marker
            title={user.name}
            key={index}
            position={[user.latitude, user.longitude]}
            icon={customIcon}
          >
            <Popup>
              {/* Customize popup content */}
              <Box>
                <h2>{user.name}</h2>
                <p>{user.address}</p>
                <p>{user.pincode}</p>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  {[
                    // { name: "Save", onclick: undefined },
                    {
                      name: "Request",
                      onclick: () => {
                        handleSendReq(user.id);
                      },
                    },
                  ].map((btn) => (
                    <Button
                      sx={{ "&:hover": { color: "slategray" } }}
                      key={btn.name}
                      variant="outlined"
                      onClick={btn.onclick}
                    >
                      {btn.name}
                    </Button>
                  ))}
                </Box>
              </Box>
            </Popup>
            {/* <Tooltip permanent direction="top" offset={[0, -30]}>
              <PersonIcon /> {user.name}
            </Tooltip> */}
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
