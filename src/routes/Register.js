import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../controllers/user";
import Geolocation from "@react-native-community/geolocation";
import toast from "react-hot-toast";
import { Autorenew } from "@mui/icons-material";
import "../App.css";

export default function Register() {
  const [formDatas, setformDatas] = useState({
    role: "USER",
    name: "",
    phone: "",
    password: "",
    address: "",
    pincode: "",
    location: {},
  });
  const [ErrMsg, setErrMsg] = useState({
    location: "Click on Get location",
  });
  const [isLoading, setisLoading] = useState(false);
  const [locationErr, setlocationErr] = useState(true);
  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // resolve({ latitude, longitude });
          setformDatas((prev) => ({
            ...prev,
            location: { latitude, longitude },
          }));
          setlocationErr(false);
        },
        (error) => {
          reject(error.message || "Error fetching location");
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    });
  };
  // const getAddressFromCoordinates = async (latitude, longitude) => {
  //   const apiKey = "90480833d693444aa2dadf0186d48abf";
  //   const apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

  //   try {
  //     const response = await fetch(apiUrl);
  //     const data = await response.json();

  //     if (data.results && data.results.length > 0) {
  //       const firstResult = data.results[0];
  //       const address = firstResult.formatted;
  //       const pinCode = firstResult.components.postcode;
  //       return { address, pinCode };
  //     } else {
  //       throw new Error("No results found");
  //     }
  //   } catch (error) {
  //     throw new Error("Error fetching address");
  //   }
  // };
  // const getLocationAndAddress = async () => {
  //   try {
  //     const location = await getCurrentLocation();
  //     const { latitude, longitude } = location;
  //     const { address, pinCode } = await getAddressFromCoordinates(
  //       latitude,
  //       longitude
  //     );
  //     setformDatas((prev) => ({
  //       ...prev,
  //       location: location,
  //     }));
  //   } catch (error) {
  //     console.error(error.message);
  //   }
  // };

  const handleOnchange = (event) => {
    const { name, value } = event.target;
    setformDatas({ ...formDatas, [name]: value });
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const inputField = [
    {
      name: "role",
      value: formDatas.role ? formDatas.role : "USER",
      lable: "Role",
      onchange: handleOnchange,
      required: !formDatas.role ? "Role is Required" : false,
      requiredmsg: errors.role?.message,
      type: "radio",
      radio: [
        {
          name: "User",
          value: "USER",
        },
        {
          name: "Volunteer",
          value: "VOLUNTEER",
        },
      ],
    },
    {
      name: "name",
      value: formDatas.name ? formDatas.name : "",
      lable: "Name",
      onchange: handleOnchange,
      required: !formDatas.name ? "Name is Required" : false,
      requiredmsg: errors.name?.message,
      type: "text",
    },
    {
      name: "phone",
      value: formDatas.phone ? formDatas.phone : "",
      lable: "Phone Number",
      onchange: handleOnchange,
      required: !formDatas.phone ? "Phone Number is Required" : false,
      requiredmsg: errors.phone?.message,
      type: "number",
    },
    {
      name: "password",
      value: formDatas.password ? formDatas.password : "",
      lable: "Password",
      onchange: handleOnchange,
      required: !formDatas.password ? "Password is Required" : false,
      requiredmsg: errors.password?.message,
      type: "text",
    },
    {
      name: "address",
      value: formDatas.address ? formDatas.address : "",
      lable: "Address",
      onchange: handleOnchange,
      required: !formDatas.address ? "Address is Required" : false,
      requiredmsg: errors.address?.message,
      type: "text",
    },
    {
      name: "pincode",
      value: formDatas.pincode ? formDatas.pincode : "",
      lable: "Pin Code",
      onchange: handleOnchange,
      required: !formDatas.pincode ? "Pin Code is Required" : false,
      requiredmsg: errors.pincode?.message,
      type: "number",
    },
  ];

  const onSubmit = (data) => {
    setisLoading(true);
    if (
      !locationErr &&
      formDatas.role !== "" &&
      formDatas.role !== null &&
      formDatas.role !== undefined
    ) {
      registerUser(formDatas);
      // console.log(formDatas);
      setisLoading(false);
    } else {
      if (locationErr) {
        setlocationErr(true);
        setErrMsg((prev) => ({ ...prev, location: "Click on get location" }));
      } else {
        toast.error("User Role not been selected");
      }
      setisLoading(false);
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <FormControl
        sx={{
          padding: 3,
          background: "lavender",
          borderRadius: "10px",
          width: "500px",
          display: "flex",
          gap: 3,
          alignItems: "center",
          height: "550px",
          overflowY: "auto", // Show overflow when hovering over the side menu

          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f5f5f5",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#bdbdbd",
            borderRadius: "4px",
            "&:hover": {
              background: "#a5a5a5",
            },
          },
          //   flexDirection: "column",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "5px" }}
        >
          Sign Up
        </Typography>
        {inputField.map((elem, index) => {
          if (elem.type === "radio") {
            return (
              <RadioGroup
                {...register(elem.name, { required: elem.required })}
                name={elem.name}
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: 10,
                }}
                value={elem.value}
                onChange={elem.onchange}
                key={index}
              >
                {elem.radio.map((radio, radioIndex) => (
                  <FormControlLabel
                    label={radio.name}
                    value={radio.value}
                    key={radioIndex}
                    control={<Radio />}
                  />
                ))}
                {/* {elem.required && (
                  <FormHelperText error>{elem.requiredmsg}</FormHelperText>
                )} */}
              </RadioGroup>
            );
          } else {
            return (
              <div style={{ width: "100%" }} key={index}>
                <TextField
                  {...register(elem.name, { required: elem.required })}
                  fullWidth
                  variant="outlined"
                  label={elem.lable}
                  name={elem.name}
                  value={elem.value}
                  onChange={elem.onchange}
                  type={elem.type}
                />
                {elem.required && (
                  <FormHelperText error>{elem.requiredmsg}</FormHelperText>
                )}
              </div>
            );
          }
        })}

        <Button
          sx={{
            color: locationErr ? "" : "green",
            "&:hover": { color: locationErr ? "black" : "green" },
          }}
          variant="outlined"
          onClick={getCurrentLocation}
        >
          Get Location
        </Button>
        {locationErr && (
          <FormHelperText error>{ErrMsg.location}</FormHelperText>
        )}
        <Button disabled={isLoading} variant="contained" type="submit">
          {!isLoading ? (
            "Sign Up"
          ) : (
            <>
              <Autorenew className="loadingBtn" />
              Processing...
            </>
          )}
        </Button>
        <Typography variant="p">
          Already have an account?
          <span
            onClick={() => {
              window.location.href = "/login";
            }}
            style={{
              color: "skyblue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            login
          </span>
        </Typography>
      </FormControl>
    </Container>
  );
}
