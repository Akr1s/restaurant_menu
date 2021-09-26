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
  getPrimaryCategories,
  getNonPrimaryCategories,
  checkDuplicateCategoryUpdate,
} = controller;

const router = promiseRouter();

router.get("/primary", getPrimaryCategories);
router.get("/nonprimary", getNonPrimaryCategories);
router.post(
  "/add",
  performCategoryValidation,
  checkDuplicateCategory,
  createCategoryDBCall
);
router.put(
  "/:id",
  checkDuplicateCategoryUpdate,
  performCategoryValidation,
  updateCategoryDBCall
);
router.delete("/:id", deleteCategory);
router.get("/:id", getSingleCategory);
router.get("/", getAllCategories);

export default router;
