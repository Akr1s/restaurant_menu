import promiseRouter from "express-promise-router";
import controler from "../controlers/categories.controler";

const router = promiseRouter();

router.get("/primary", controler.getPrimaryCategories);
router.post("/add", controler.addCategory);
router.put("/:id", controler.updateCategory);
router.delete("/:id", controler.deleteCategory);
router.get("/:id", controler.getSingleCategory);
router.get("/", controler.getAllCategories);

export default router;
