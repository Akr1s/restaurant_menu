"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const categories_controler_1 = __importDefault(require("../controlers/categories.controler"));
const router = (0, express_promise_router_1.default)();
router.get("/primary", categories_controler_1.default.getPrimary);
router.post("/add", categories_controler_1.default.add);
router.put("/:id", categories_controler_1.default.update);
router.delete("/:id", categories_controler_1.default.deleteCategory);
router.get("/:id", categories_controler_1.default.getSingle);
router.get("/", categories_controler_1.default.getAll);
exports.default = router;
