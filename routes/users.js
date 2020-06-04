const router = require("express").Router();
const ctrl = require("../controller");

router.get("/:id", ctrl.users.show);

module.exports = router;
