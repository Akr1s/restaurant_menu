import promiseRouter from "express-promise-router";
import controller from "../controllers/dishes.controller";

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
} = controller;

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
