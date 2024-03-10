import Cookies from "js-cookie";
import { authUrl } from "../utils/api";
import toast from "react-hot-toast";
export const loginUser = async (data) => {
  try {
    const response = await fetch(`${authUrl}/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (response.status === "ok") {
      const tokenRes = await fetch(`${authUrl}/userData`, {
        headers: {
          "Content-type": "application/json",
          Accept: "*",
        },
        method: "POST",
        body: JSON.stringify({ token: response.data }),
      }).then((res) => res.json());
      if (tokenRes.status === "ok") {
        window.location.href = "/home";
        Cookies.set("userData", JSON.stringify(tokenRes.data));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
export const getallUser = async () => {
  try {
    const response = await fetch(`${authUrl}/get`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
    if (response.status === "ok") {
      return response.data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const registerUser = async (data) => {
  try {
    const response = await fetch(`${authUrl}/register`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (response.status === "ok") {
      window.location.href = "/login";
    } else {
      toast.error(response.error);
    }
  } catch (error) {
    console.log(error);
  }
};
