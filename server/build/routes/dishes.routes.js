"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const dishes_controller_1 = __importDefault(require("../controllers/dishes.controller"));
const router = (0, express_promise_router_1.default)();
const { getAllDishes, getAllVisibleDishes, getSingleDish, deleteDish, getAllDishesFromCategory, performDishValidation, checkDuplicateDish, createDishDBCall, updateDishDBCall, uploadImage, } = dishes_controller_1.default;
router.post("/add", uploadImage, performDishValidation, checkDuplicateDish, createDishDBCall);
router.get("/select/visible", getAllVisibleDishes);
router.get("/select/:id", getAllDishesFromCategory);
router.get("/:id", getSingleDish);
router.put("/:id", uploadImage, performDishValidation, updateDishDBCall);
router.delete("/:id", deleteDish);
router.get("/", getAllDishes);
exports.default = router;
