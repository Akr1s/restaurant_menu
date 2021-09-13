import promiseRouter from "express-promise-router";
import controler from "../controlers/categories.controler";

const router = promiseRouter();

router.get("/primary", controler.getPrimary);
router.post("/add", controler.add);
router.put("/:id", controler.update);
router.delete("/:id", controler.deleteCategory);
router.get("/:id", controler.getSingle);
router.get("/", controler.getAll);

export default router;
