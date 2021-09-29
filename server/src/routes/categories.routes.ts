import promiseRouter from "express-promise-router";
import controller from "../controllers/categories.controller";

const {
  checkDuplicateCategory,
  createCategoryDBCall,
  performCategoryValidation,
  deleteCategory,
  getAllCategories,
  updateCategoryDBCall,
  getPrimaryCategories,
} = controller;

const router = promiseRouter();

router.get("/primary", getPrimaryCategories);
router.post(
  "/add",
  performCategoryValidation,
  checkDuplicateCategory,
  createCategoryDBCall
);
router.put(
  "/:id",
  checkDuplicateCategory,
  performCategoryValidation,
  updateCategoryDBCall
);
router.delete("/:id", deleteCategory);
router.get("/", getAllCategories);

export default router;
