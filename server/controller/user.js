const jwt = require("jsonwebtoken");
const { FloodWebUser } = require("../model/user");
const JWT_SECRET = process.env.JWT_SECRET;
exports.register = async (req, res, next) => {
  const { phone, name, role, password, location, address, pincode } = req.body;
  try {
    const oldUser = await FloodWebUser.findOne({
      phone,
    });
    if (oldUser) {
      return res.json({ error: "user exists!" });
    } else if (
      name !== "" &&
      phone !== "" &&
      password !== "" &&
      role !== "" &&
      location !== "" &&
      address !== "" &&
      pincode !== ""
    ) {
      await FloodWebUser.create(req.body);
      res.status(200).json({ status: "ok", data: req.body });
    } else {
      res.status(200).json({ status: "ok", data: "All fields are mandatory" });
    }
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  const { phone, password } = req.body;
  try {
    const user = await FloodWebUser.findOne({
      phone,
    });
    if (!user) {
      return res.json({ error: "User not Exists" });
    } else {
      if (user.password === password) {
        const token = jwt.sign({ phone: user.phone }, JWT_SECRET, {
          expiresIn: "24h",
        });

        res.status(200).send({ status: "ok", data: token });
      } else {
        res.json({ status: "error", error: "Invalid Password" });
      }
    }
  } catch (error) {
    next(error);
  }
};
exports.userData = async (req, res, next) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    if (user === "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }
    console.log(user);

    await FloodWebUser.findOne({ phone: user.phone }).then((data) => {
      res.status(200).json({ status: "ok", data: data });
    });
  } catch (error) {
    next(error);
  }
};
exports.getallUsers = async (req, res, next) => {
  try {
    const user = await FloodWebUser.find({ role: "VOLUNTEER" });
    if (user) {
      return res.status(200).send({ status: "ok", data: user });
    }
    res.status(200).send({ status: "error", data: [] });
  } catch (error) {
    next(error);
  }
};
