"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const categories_controler_1 = __importDefault(require("../controlers/categories.controler"));
const { checkDuplicateCategory, createCategoryDBCall, performCategoryValidation, deleteCategory, getSingleCategory, getAllCategories, updateCategoryDBCall, } = categories_controler_1.default;
const router = (0, express_promise_router_1.default)();
router.get("/primary", categories_controler_1.default.getPrimaryCategories);
router.post("/add", performCategoryValidation, checkDuplicateCategory, createCategoryDBCall);
router.put("/:id", performCategoryValidation, updateCategoryDBCall);
router.delete("/:id", deleteCategory);
router.get("/:id", getSingleCategory);
router.get("/", getAllCategories);
exports.default = router;
