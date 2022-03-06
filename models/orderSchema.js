const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    address: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
        name: { type: String },
        address: { type: String },
        phonenumber: { type: String },
        city: { type: String },
        state: { type: String },
        pincode: { type: String },
      },
    ],
    data: [
      {
        title: { type: String },
        description: { type: String },
        image: { type: String },
        size: { type: String },
        price: { type: String },
        quantity: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("order", OrderSchema);
