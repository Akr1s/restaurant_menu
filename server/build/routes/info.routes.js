"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const info_controler_1 = __importDefault(require("../controlers/info.controler"));
const router = (0, express_promise_router_1.default)();
const { performInfoValidation, getAllInfo, getTitle, getRestInfo, updateInfoDBCall, } = info_controler_1.default;
router.get("/title", getTitle);
router.get("/rest", getRestInfo);
router.get("/", getAllInfo);
router.put("/", performInfoValidation, updateInfoDBCall);
exports.default = router;
