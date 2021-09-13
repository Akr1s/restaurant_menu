const router = require("express-promise-router")();
const controler = require("../controlers/categories.controler");

router.get("/primary", controler.getPrimary);
router.post("/add", controler.add);
router.put("/:id", controler.update);
router.delete("/:id", controler.delete);
router.get("/:id", controler.getSingle);
router.get("/", controler.getAll);

module.exports = router;
