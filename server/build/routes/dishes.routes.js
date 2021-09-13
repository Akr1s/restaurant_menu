"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const dishes_controler_1 = __importDefault(require("../controlers/dishes.controler"));
const router = (0, express_promise_router_1.default)();
router.post("/add", dishes_controler_1.default.addDish);
router.get("/select/visible", dishes_controler_1.default.getAllVisibleDishes);
router.get("/select/:id", dishes_controler_1.default.getAllDishesFromCategory);
router.get("/:id", dishes_controler_1.default.getSingleDish);
router.put("/:id", dishes_controler_1.default.updateDish);
router.delete("/:id", dishes_controler_1.default.deleteDish);
router.get("/", dishes_controler_1.default.getAllDishes);
exports.default = router;
