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
    required: [true, "Please include at least one image"],
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
});
