const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    userID: String,
    volunteerID: String,
    userData: { type: Object, required: true },
    request: String,
  },
  {
    timestamps: true,
  }
);
const FloodWebNotification = mongoose.model(
  "FloodWebNotification",
  notificationSchema
);
exports.FloodWebNotification = FloodWebNotification;
