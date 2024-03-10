const express = require("express");
const {
  getnotificationByID,
  addnotification,
  deletenotification,
  updateNotification,
} = require("../controller/notification");
const router = express.Router();

router.get("/get", getnotificationByID);
router.post("/add", addnotification);
router.delete("/:id", deletenotification);
router.put("/:id", updateNotification);
module.exports = router;
