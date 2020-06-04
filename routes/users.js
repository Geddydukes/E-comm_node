const router = require("express").Router();
const ctrl = require("../controller");

router.get("/profile", ctrl.users.show);
router.post("/profile/edit", ctrl.users.update);
router.delete("/profile/delete", ctrl.users.destroy);

module.exports = router;
