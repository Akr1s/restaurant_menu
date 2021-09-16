import promiseRouter from "express-promise-router";
import controler from "../controlers/dishes.controler";

const router = promiseRouter();

const {
  getAllDishes,
  getAllVisibleDishes,
  getSingleDish,
  deleteDish,
  getAllDishesFromCategory,
  performDishValidation,
  checkDuplicateDish,
  createDishDBCall,
  updateDishDBCall,
} = controler;

router.post(
  "/add",
  performDishValidation,
  checkDuplicateDish,
  createDishDBCall
);
router.get("/select/visible", getAllVisibleDishes);
router.get("/select/:id", getAllDishesFromCategory);
router.get("/:id", getSingleDish);
router.put("/:id", performDishValidation, checkDuplicateDish, updateDishDBCall);
router.delete("/:id", deleteDish);
router.get("/", getAllDishes);

export default router;
