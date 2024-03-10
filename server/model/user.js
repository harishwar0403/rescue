const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  phone: { type: Number, unique: true },
  password: String,
  role: String,
  address: String,
  pincode: { type: String, required: true },
  location: { type: Object, required: true },
});
const FloodWebUser = mongoose.model("FloodWebUser", userSchema);
exports.FloodWebUser = FloodWebUser;
