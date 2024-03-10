const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const { default: mongoose } = require("mongoose");
app.use(cors());
require("dotenv").config();
const User = require("./router/user");
const Notification = require("./router/notification");
const PORT = process.env.PORT;
const MONGO = process.env.MONGODB;
app.listen(PORT, () => {
  console.log("SERVER CONNECTED");
});
mongoose.connect(MONGO).then(() => {
  console.log("DB CONNECTED");
});
app.use("/auth", User);
app.use("/notification", Notification);
