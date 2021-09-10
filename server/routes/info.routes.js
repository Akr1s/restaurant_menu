const router = require("express-promise-router")();

const controler = require("../controlers/info.controler");

router.get("/", controler.getAll);

router.get("/title", controler.getTitle);

router.get("/rest", controler.getRestInfo);

router.put("/", controler.updateInfo);

module.exports = router;
