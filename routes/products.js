const router = require("express").Router();
const ctrl = require("../controller");

router.get("/", ctrl.product.indexProduct);
router.post("/new", ctrl.product.createProduct);
router.get("/:id", ctrl.product.showProduct);
router.post("/:id/edit", ctrl.product.updateProduct);
router.delete("/:id", ctrl.product.destroyProduct);
router.post("/:id/review", ctrl.review.createReview);
router.delete("/:id/review/:_id", ctrl.review.deleteReview);
router.post("/:id/review/:_id", ctrl.review.updateReview);
router.get("/:id/review/:_id", ctrl.review.showReview);

module.exports = router;
