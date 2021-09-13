import promiseRouter from "express-promise-router";
import controler from "../controlers/dishes.controler";

const router = promiseRouter();

router.post("/add", controler.add);
router.get("/select/visible", controler.getAllVisible);
router.get("/select/:id", controler.getAllFromCategory);
router.get("/:id", controler.getSingle);
router.put("/:id", controler.update);
router.delete("/:id", controler.deleteDish);
router.get("/", controler.getAll);

export default router;
