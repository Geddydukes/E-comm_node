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

const showProduct = async (req, res) => {
  try {
    const foundProduct = await db.Product.findById(req.params.id).populate(
      "reviews"
    );
    if (!foundProduct)
      return res.json({
        message: "No product found in database. Please try again later.",
      });
    res.status(200).json({ product: foundProduct });
  } catch (err) {
    return console.log(err);
  }
};

const createProduct = async (req, res) => {
  try {
    const freshProduct = await db.Product.create(req.body);
    res.status(200).json({ product: freshProduct });
  } catch (err) {
    return console.log(err);
  }
};

const updateProduct = async (req, res) => {
  console.log(req.body);
  try {
    const foundUser = await db.User.findById(req.session.currentUser.Id);
    if (!foundUser) return res.json({ message: "No User Found Please Log In" });
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
  } catch (err) {
    return console.log("Error in product.update:", err);
  }
};

const destroyProduct = async (req, res) => {
  try {
    const deletedProduct = await db.Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.json({
        message: "No product found",
      });
    res
      .status(200)
      .json({ product: deletedProduct, message: "Delete successful!" });
  } catch (err) {
    return console.log("error destroying product");
  }
};

module.exports = {
  indexProduct,
  showProduct,
  createProduct,
  updateProduct,
  destroyProduct,
};
