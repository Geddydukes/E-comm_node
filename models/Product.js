const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please include a Product name"],
  },
  price: {
    type: Number,
    required: [true, "Please include a Price"],
  },
  image: {
    type: String,
  },
  description: {
    type: String,
    required: [true, "Please include a description"],
  },
  tags: [
    {
      type: String,
      required: [true, "Please include at least one tag"],
    },
  ],
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
