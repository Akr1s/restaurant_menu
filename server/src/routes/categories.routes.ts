import promiseRouter from "express-promise-router";
import controler from "../controlers/categories.controler";

const {
  checkDuplicateCategory,
  createCategoryDBCall,
  performCategoryValidation,
  deleteCategory,
  getSingleCategory,
  getAllCategories,
  updateCategoryDBCall,
} = controler;

const router = promiseRouter();

router.get("/primary", controler.getPrimaryCategories);
router.post(
  "/add",
  performCategoryValidation,
  checkDuplicateCategory,
  createCategoryDBCall
);
router.put("/:id", performCategoryValidation, updateCategoryDBCall);
router.delete("/:id", deleteCategory);
router.get("/:id", getSingleCategory);
router.get("/", getAllCategories);

export default router;
