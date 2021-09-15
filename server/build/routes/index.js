"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dishes_routes_1 = __importDefault(require("./dishes.routes"));
const categories_routes_1 = __importDefault(require("./categories.routes"));
const info_routes_1 = __importDefault(require("./info.routes"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use("/dishes/", dishes_routes_1.default);
router.use("/categories/", categories_routes_1.default);
router.use("/info/", info_routes_1.default);
exports.default = router;
