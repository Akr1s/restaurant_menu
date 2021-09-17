import promiseRouter from "express-promise-router";
import controller from "../controllers/categories.controller";

const {
  checkDuplicateCategory,
  createCategoryDBCall,
  performCategoryValidation,
  deleteCategory,
  getSingleCategory,
  getAllCategories,
  updateCategoryDBCall,
} = controller;

const router = promiseRouter();

router.get("/primary", controller.getPrimaryCategories);
router.post(
  "/add",
  performCategoryValidation,
  checkDuplicateCategory,
  createCategoryDBCall
);
router.put(
  "/:id",
  performCategoryValidation,
  checkDuplicateCategory,
  updateCategoryDBCall
);
router.delete("/:id", deleteCategory);
router.get("/:id", getSingleCategory);
router.get("/", getAllCategories);

export default router;
