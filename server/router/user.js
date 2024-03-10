const express = require("express");
const {
  login,
  register,
  userData,
  getallUsers,
} = require("../controller/user");
const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/userData", userData);
router.get("/get", getallUsers);
module.exports = router;
