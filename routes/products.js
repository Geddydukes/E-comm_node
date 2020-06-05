const router = require("express").Router();
const ctrl = require("../controller");

router.get("/", ctrl.product.indexProduct);
router.post("/new", ctrl.product.createProduct);
router.get("/:id", ctrl.product.showProduct);
router.post("/:id/edit", ctrl.product.updateProduct);
router.delete("/:id", ctrl.product.destroyProduct);

module.exports = router;
