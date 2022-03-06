const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  address: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
      name: { type: String, require: true },
      address: { type: String, require: true },
      phonenumber: { type: String, require: true },
      city: { type: String, require: true },
      state: { type: String, require: true },
      pincode: { type: String, require: true },
    },
  ],
  title: { type: String, require: true },
  description: { type: String, require: true },
  image: { type: String, require: true },
  size: { type: String, require: true },
  price: { type: String, require: true },
  quantity: { type: Number, require: true },
  date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("notes", NotesSchema);
