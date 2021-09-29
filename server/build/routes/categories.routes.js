"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const categories_controller_1 = __importDefault(require("../controllers/categories.controller"));
const { checkDuplicateCategory, createCategoryDBCall, performCategoryValidation, deleteCategory, getAllCategories, updateCategoryDBCall, getPrimaryCategories, } = categories_controller_1.default;
const router = (0, express_promise_router_1.default)();
router.get("/primary", getPrimaryCategories);
router.post("/add", performCategoryValidation, checkDuplicateCategory, createCategoryDBCall);
router.put("/:id", checkDuplicateCategory, performCategoryValidation, updateCategoryDBCall);
router.delete("/:id", deleteCategory);
router.get("/", getAllCategories);
exports.default = router;
