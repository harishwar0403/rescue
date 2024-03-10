import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { loginUser } from "../controllers/user";
import { Autorenew } from "@mui/icons-material";
import "../App.css";
export default function Login() {
  const [isLoading, setisLoading] = useState(false);
  const [formDatas, setformDatas] = useState({});
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
      type: "password",
    },
  ];
  const onSubmit = (data) => {
    loginUser(data);
    setisLoading(false);
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
          //   flexDirection: "column",
        }}
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "5px" }}
        >
          {!isLoading ? (
            "Login"
          ) : (
            <>
              <Autorenew className="loadingBtn" />
              Processing...
            </>
          )}
        </Typography>
        {inputField.map((elem, index) => {
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
        })}

        <Button
          onClick={() => {
            setisLoading(true);
          }}
          variant="contained"
          type="submit"
        >
          Login
        </Button>
        <Typography variant="p">
          Don't have an account?
          <span
            onClick={() => {
              window.location.href = "/register";
            }}
            style={{
              color: "skyblue",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            sign up
          </span>
        </Typography>
      </FormControl>
    </Container>
  );
}
