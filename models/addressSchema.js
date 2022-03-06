const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  name: { type: String, require: true },
  address: { type: String, require: true },
  phonenumber: { type: String, require: true },
  city: { type: String, require: true },
  state: { type: String, require: true },
  pincode: { type: String, require: true },
},{timestamps:true});

module.exports = mongoose.model("address", addressSchema);
