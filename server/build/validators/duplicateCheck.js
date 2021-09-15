"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../config/database");
const responseCodes_1 = require("../constants/responseCodes");
const transformRows_1 = __importDefault(require("../utils/transformRows"));
const duplicateCheck = (name, query) => __awaiter(void 0, void 0, void 0, function* () {
    let responseCode;
    try {
        const { rows } = yield (0, database_1.databaseQuery)(query);
        if ((0, transformRows_1.default)(rows).includes(name))
            return responseCodes_1.RESPONSE_CODES.DUPLICATE_ENTITY;
        responseCode = responseCodes_1.RESPONSE_CODES.ADD_SUCCESS;
    }
    catch (error) {
        responseCode = responseCodes_1.RESPONSE_CODES.ADD_ERROR;
    }
    return responseCode;
});
exports.default = duplicateCheck;
