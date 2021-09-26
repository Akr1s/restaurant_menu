"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_promise_router_1 = __importDefault(require("express-promise-router"));
const info_controller_1 = __importDefault(require("../controllers/info.controller"));
const router = (0, express_promise_router_1.default)();
const { performInfoValidation, getAllInfo, updateInfoDBCall } = info_controller_1.default;
router.get("/", getAllInfo);
router.put("/", performInfoValidation, updateInfoDBCall);
exports.default = router;
