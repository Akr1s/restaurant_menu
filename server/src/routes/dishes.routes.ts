import promiseRouter from "express-promise-router";
import controler from "../controlers/dishes.controler";

const router = promiseRouter();

router.post("/add", controler.addDish);
router.get("/select/visible", controler.getAllVisibleDishes);
router.get("/select/:id", controler.getAllDishesFromCategory);
router.get("/:id", controler.getSingleDish);
router.put("/:id", controler.updateDish);
router.delete("/:id", controler.deleteDish);
router.get("/", controler.getAllDishes);

export default router;
