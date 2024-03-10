const express = require("express");
const {
  getnotificationByID,
  addnotification,
  deletenotification,
  updateNotification,
  getUsernotificationByID,
} = require("../controller/notification");
const router = express.Router();

router.get("/get", getnotificationByID);
router.get("/getUser", getUsernotificationByID);
router.post("/add", addnotification);
router.delete("/:id", deletenotification);
router.put("/:id", updateNotification);
module.exports = router;
