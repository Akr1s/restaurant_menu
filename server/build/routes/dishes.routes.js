"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const dishes_controler_1 = __importDefault(require("../controlers/dishes.controler"));
const router = (0, express_promise_router_1.default)();
const { getAllDishes, getAllVisibleDishes, getSingleDish, deleteDish, getAllDishesFromCategory, performDishValidation, checkDuplicateDish, createDishDBCall, updateDishDBCall, } = dishes_controler_1.default;
router.post("/add", performDishValidation, checkDuplicateDish, createDishDBCall);
router.get("/select/visible", getAllVisibleDishes);
router.get("/select/:id", getAllDishesFromCategory);
router.get("/:id", getSingleDish);
router.put("/:id", performDishValidation, checkDuplicateDish, updateDishDBCall);
router.delete("/:id", deleteDish);
router.get("/", getAllDishes);
exports.default = router;
