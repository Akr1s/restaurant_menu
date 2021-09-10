const router = require("express-promise-router")();
const controler = require("../controlers/dishes.controler");

router.post("/add", controler.add);
router.get("/:id", controler.getSingle);
router.put("/:id", controler.update);
router.delete("/:id", controler.delete);
router.get("/", controler.getAll);
router.delete("/", controler.deleteAll);

module.exports = router;
