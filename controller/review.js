const db = require("../models");

const indexReviews = (req, res) => {
  db.Review.findById();
};

const createReview = async (req, res) => {
  if (req.session.currentUser) {
    const product = await db.Product.findById(
      req.params.id,
      (err, foundProduct) => {
        if (err) return res.json({ message: "Error please try again" });
        if (!foundProduct) {
          return res.json({
            message: "No product found by that id",
          });
        }
      }
    );
    const reviewData = {
      author: req.session.currentUser.id,
      body: req.body.body,
      image: req.body.image,
      product: product._id,
    };
    const newReview = await db.Review.create(reviewData);
    product.reviews.push(newReview);
    await product.save();
    res.status(200).json({
      review: newReview,
    });
  } else {
    return res.json({
      message: "Please log in to leave a review",
    });
  }
};

const deleteReview = async (req, res) => {
  if (req.session.currentUser) {
    const review = await db.Review.findById(
      req.params._id,
      (err, foundReview) => {
        if (err) return console.log("Error in review.delete1:", err);

        if (!foundReview)
          return res.json({
            message: "No review found",
          });
      }
    );
    if (req.session.currentUser.id == review.author) {
      await db.Product.findById(review.product, (err, foundProduct) => {
        foundProduct.reviews.splice(review._id, 1);
        foundProduct.save();
      });
      await db.Review.findByIdAndDelete(
        req.params._id,
        (err, deletedReview) => {
          if (err) return console.log("Error in review.delete2:", err);

          res.status(200).json({
            message: "Review successfully deleted",
          });
        }
      );
    } else {
      res.json({
        message: "Only the original poster may delete a review",
      });
    }
  } else {
    res.json({
      message: "Please log in to delete a review",
    });
  }
};

const updateReview = async (req, res) => {
  console.log("this is the req body: ", req.body);
  if (req.session.currentUser) {
    const user = await db.User.findById(
      req.session.currentUser.id,
      (err, foundUser) => {
        if (err) return res.json({ message: "err in update review: ", err });

        if (!foundUser) {
          return res.json({
            message: "No user found please log in!",
          });
        }
      }
    );
    console.log("this is the found user", user);
    const review = await db.Review.findById(
      req.params._id,
      (err, foundReview) => {
        if (err) return res.json({ message: "err in update review: ", err });

        if (!foundReview) {
          return res.json({
            message: "No review found",
          });
        }
      }
    );
    console.log("this is the review:", review);
    if (req.session.currentUser.id == review.author) {
      const options = { new: true };
      await db.Review.findByIdAndUpdate(
        req.params._id,
        req.body,
        options,
        (err, updatedReview) => {
          if (err) return res.json("err in update: ", err);

          if (!updatedReview)
            return res.json({
              message: "Error no review found",
            });

          res.status(200).json({ review: updatedReview });
        }
      );
    } else {
      res.json({
        message: "Youre not the author please log in to edit",
      });
    }
  } else {
    res.json({
      message: "Please log in to update a review",
    });
  }
};

const showReview = async (req, res) => {
  try {
    const foundReview = db.Review.findById(req.params._id).populate("comments");
    if (!foundReview) return res.json({ message: "That review doesnt exist" });
    res.status(200).json({ review: foundReview });
  } catch (err) {
    return console.log(err);
  }
};

module.exports = {
  createReview,
  deleteReview,
  indexReviews,
  updateReview,
  showReview,
};
