const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },

    details: [
      {
        title: { type: String, require: true },
        description: { type: String, require: true },
        image: { type: String, require: true },
        size: { type: String, require: true },
        price: { type: String, require: true },
        quantity: { type: Number, require: true },
        date: { type: Date, default: Date.now() },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
