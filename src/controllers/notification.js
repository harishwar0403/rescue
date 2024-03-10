import Cookies from "js-cookie";
import { notificationUrl } from "../utils/api";
import toast from "react-hot-toast";

export const addNotification = async (data) => {
  try {
    const response = await fetch(`${notificationUrl}/add`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (response.status === "ok") {
      toast.success("Request Send");
    } else {
      toast.error("Failed");
    }
  } catch (error) {
    console.log(error);
  }
};
export const getNotification = async (id) => {
  try {
    const response = await fetch(`${notificationUrl}/get?volunteerID=${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
    if (response.status === "ok") {
      return response.data;
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};
export const updateNotification = async (id, data) => {
  try {
    const response = await fetch(`${notificationUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (response.status === "ok") {
      toast.error(response.data);
      return response.status;
    } else {
      toast.error(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};
export const deleteNotification = async (id) => {
  try {
    const response = await fetch(`${notificationUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    }).then((res) => res.json());
    if (response.status === "ok") {
      toast.error(response.data);
      return response.status;
    } else {
      toast.error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};
