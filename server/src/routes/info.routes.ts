import promiseRouter from "express-promise-router";
import controler from "../controlers/info.controler";

const router = promiseRouter();

router.get("/title", controler.getTitle);
router.get("/rest", controler.getRestInfo);
router.get("/", controler.getAllInfo);
router.put("/", controler.updateInfo);

export default router;
