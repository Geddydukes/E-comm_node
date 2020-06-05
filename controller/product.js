const db = require("../models");

const indexProduct = (req, res) => {
  db.Product.find({}, (err, foundProducts) => {
    if (err) return console.log(`Error in product.index:`, err);

    if (!foundProducts)
      return res.json({
        message: "No products found in the database. Please try again later.",
      });

    res.status(200).json({ products: foundProducts });
  });
};

const showProduct = (req, res) => {
  db.Product.findById(req.params.id, (err, foundProduct) => {
    if (err) return console.log("Error in product.oneProduct:", err);

    if (!foundProducts)
      return res.json({
        message: "No product found in database. Please try again later.",
      });

    res.status(200).json({ product: foundProduct });
  });
};

const createProduct = (req, res) => {
  db.Product.create(req.body, (err, freshProduct) => {
    if (err) return console.log("Error in product.newProduct:", err);

    // TODO ----- put in error handling

    res.status(200).json({ product: freshProduct });
  });
};

const updateProduct = (req, res) => {
  db.User.findById(req.session.currentUser.id, (err, foundUser) => {
    if (err) return console.log("Error in product.update:", err);

    if (!foundUser)
      return res.json({
        message: "No User found please log in",
      });
    if (foundUser.code === "admin") {
      const options = { new: true };
      db.Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        options,
        (err, updatedProduct) => {
          if (err) return console.log("Error in product.update:", err);
          if (!updatedProduct)
            return res.json({
              message: "No product found",
            });

          res.status(200).json({ product: updatedProduct });
        }
      );
    } else {
      return res.json({
        message: "Sorry only admins can edit products, please sign in.",
      });
    }
  });
};

const destroyProduct = (req, res) => {
  db.Product.findByIdAndDelete(req.params.id, (err, deletedProduct) => {
    if (err) return console.log("Error in product.destroyProduct:", err);
    if (!deletedProduct)
      return res.json({
        message: "No product found",
      });

    res
      .status(200)
      .json({ product: deletedProduct, message: "Delete successful!" });
  });
};

module.exports = {
  indexProduct,
  showProduct,
  createProduct,
  updateProduct,
  destroyProduct,
};
