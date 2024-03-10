import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { KeyboardArrowRight, Refresh } from "@mui/icons-material";
import {
  deleteNotification,
  getNotification,
} from "../controllers/notification";
import toast from "react-hot-toast";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function NotificationContainer({ userData }) {
  const [data, setdata] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
    id: "",
    request: "",
  });
  const [rows, setrows] = useState([]);
  const getTime = (timestamp) => {
    const date = new Date(timestamp);
    date.setHours(date.getHours());
    date.setMinutes(date.getMinutes());
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    const formatedMin = minutes < 10 ? "0" + minutes : minutes;
    const time = `${hours12}:${formatedMin} ${period}`;
    return time;
  };
  const getDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${
      date.getFullYear() % 100
    }`;
    return formattedDate;
  };
  const fetchData = () => {
    setdata({
      name: "",
      phone: "",
      address: "",
      pincode: "",
      id: "",
      request: "",
    });
    if (userData) {
      getNotification(userData._id).then((data) => {
        if (data) {
          const rowsArr = data.map((item) => ({
            id: item._id,
            userId: item.userID,
            name: item?.userData?.name,
            phone: item?.userData.phone,
            time: getTime(item.createdAt),
            date: getDate(item.createdAt),
            userData: item.userData,
            request: item.request,
          }));
          if (rowsArr.length !== "") {
            setrows(rowsArr);
          }
        }
      });
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleDelete = () => {
    if (data.id) {
      deleteNotification(data.id).then((res) => {
        if (res == "ok") {
          fetchData();
        }
      });
    } else {
      toast.error("Select notification from the table");
    }
  };
  const handleOpenData = (row) => {
    setdata({
      name: row.userData.name,
      id: row.id,
      address: row.userData.address,
      phone: row.userData.phone,
      pincode: row.userData.pincode,
      request: row.request,
    });
  };
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        minHeight: "400px",
        padding: 5,
        gap: 5,
        flexDirection: {
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column",
        },
      }}
    >
      <Stack alignItems="flex-end">
        <IconButton
          onClick={() => {
            fetchData();
          }}
          sx={{
            "&:hover": {
              color: "black",
            },
          }}
        >
          <Refresh />
        </IconButton>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Requested</StyledTableCell>
                <StyledTableCell>Time</StyledTableCell>
                <StyledTableCell>Date</StyledTableCell>
                <StyledTableCell>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.length == 0 ? (
                <StyledTableRow>
                  <StyledTableCell colSpan={5}>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "215px",
                      }}
                    >
                      <Typography>Notification Empty</Typography>
                    </Box>
                  </StyledTableCell>
                </StyledTableRow>
              ) : (
                <>
                  {rows.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row?.name}
                      </StyledTableCell>
                      <StyledTableCell>{row?.request}</StyledTableCell>
                      <StyledTableCell>{row?.time}</StyledTableCell>
                      <StyledTableCell>{row?.date}</StyledTableCell>
                      <StyledTableCell>
                        <IconButton
                          sx={{
                            "&:hover": {
                              color: "green",
                            },
                          }}
                          onClick={() => {
                            handleOpenData(row);
                          }}
                        >
                          <KeyboardArrowRight />
                        </IconButton>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          border: "1px solid slategray",
          borderRadius: "10px",
          minHeight: "300px",
          justifyContent: "flex-end",
          alignItems: "center",
          padding: 3,
          gap: 5,
        }}
      >
        {[
          { name: "Name", value: data.name ? data.name : "-" },
          { name: "Phone Number", value: data.phone ? data.phone : "-" },
          { name: "Address", value: data.address ? data.address : "-" },
          { name: "Pin Code", value: data.pincode ? data.pincode : "-" },
          { name: "Requested", value: data.request ? data.request : "-" },
        ].map((user, index) => (
          <Box
            key={index}
            sx={{
              width: {
                lg: "50%",
                md: "50%",
                sm: "100%",
                xs: "100%",
              },
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography align="left" sx={{ width: "60%" }}>
              {user?.name}
            </Typography>
            <Typography align="left" sx={{ width: "40%" }}>
              {user?.value}
            </Typography>
          </Box>
        ))}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {[
            { name: "Accept", onclick: undefined, disabled: true },
            {
              name: "Delete",
              onclick: handleDelete,
              disabled: false,
            },
          ].map((item, index) => (
            <Button
              disabled={item.disabled}
              onClick={item.onclick}
              variant="outlined"
              sx={{
                color: item.name == "Accept" ? "green" : "red",
                border:
                  item.name == "Accept" ? "1px solid green" : "1px solid red",
                "&:hover": {
                  color: item.name == "Accept" ? "darkgreen" : "darkred",
                  border:
                    item.name == "Accept"
                      ? "1px solid darkgreen"
                      : "1px solid darkred",
                },
              }}
              key={index}
            >
              {item?.name}
            </Button>
          ))}
        </Box>
      </Stack>
    </Box>
  );
}
