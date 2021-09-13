"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const info_controler_1 = __importDefault(require("../controlers/info.controler"));
const router = (0, express_promise_router_1.default)();
router.get("/title", info_controler_1.default.getTitle);
router.get("/rest", info_controler_1.default.getRestInfo);
router.get("/", info_controler_1.default.getAllInfo);
router.put("/", info_controler_1.default.updateInfo);
exports.default = router;
