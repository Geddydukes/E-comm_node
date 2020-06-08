const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: [true, "Please log in to leave a review."],
  },
  body: {
    type: String,
    required: [true, "Please include a body to your review."],
  },
  image: {
    type: String,
    required: false,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: [true, "A review must be left on a Product."],
  },
});

const Review = mongoose.model("Review", ReviewSchema);

module.exports = Review;
