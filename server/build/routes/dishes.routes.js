"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const dishes_controler_1 = __importDefault(require("../controlers/dishes.controler"));
const router = (0, express_promise_router_1.default)();
router.post("/add", dishes_controler_1.default.add);
router.get("/select/visible", dishes_controler_1.default.getAllVisible);
router.get("/select/:id", dishes_controler_1.default.getAllFromCategory);
router.get("/:id", dishes_controler_1.default.getSingle);
router.put("/:id", dishes_controler_1.default.update);
router.delete("/:id", dishes_controler_1.default.deleteDish);
router.get("/", dishes_controler_1.default.getAll);
exports.default = router;
