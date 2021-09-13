const router = require("express-promise-router")();
const controler = require("../controlers/dishes.controler");

router.post("/add", controler.add);
router.get("/select/visible", controler.getAllVisible);
router.get("/select/:id", controler.getAllFromCategory);
router.get("/:id", controler.getSingle);
router.put("/:id", controler.update);
router.delete("/:id", controler.delete);
router.get("/", controler.getAll);

module.exports = router;
