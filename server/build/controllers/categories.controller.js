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
const common_1 = require("../helpers/common");
const statusCodes_1 = require("../constants/statusCodes");
const uuid_1 = require("uuid");
const categoriesValidator_1 = require("../validators/categoriesValidator");
const responseCodes_1 = require("../constants/responseCodes");
const convertDate_1 = __importDefault(require("../utils/convertDate"));
const duplicateCheck_1 = __importDefault(require("../validators/duplicateCheck"));
const { CATEGORIES_GET_ERROR, ADD_ERROR, ADD_SUCCESS, UPDATE_SUCCESS, UPDATE_ERROR, DELETE_ERROR, DELETE_SUCCESS, } = responseCodes_1.RESPONSE_CODES;
const getAllCategories = (req, res) => {
    const options = {
        query: "SELECT * FROM CATEGORIES",
        errorCode: CATEGORIES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getPrimaryCategories = (req, res) => {
    const options = {
        query: "SELECT ID,NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
        errorCode: CATEGORIES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getSingleCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT * FROM CATEGORIES WHERE ID='${id}'`,
        errorCode: CATEGORIES_GET_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const performCategoryValidation = (req, res, next) => {
    const validationResult = (0, categoriesValidator_1.validateCategory)(req.body);
    if (validationResult) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${validationResult}`);
    }
    next();
};
const checkDuplicateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, show, parent } = req.body;
    const duplicateCheckResult = yield (0, duplicateCheck_1.default)(name, "SELECT NAME FROM CATEGORIES");
    if (duplicateCheckResult !== responseCodes_1.RESPONSE_CODES.ADD_SUCCESS) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${duplicateCheckResult}`);
    }
    next();
});
const createCategoryDBCall = (req, res, next) => {
    const { name, show, parent } = req.body;
    const options = {
        query: `INSERT INTO CATEGORIES(ID,NAME, SHOW, PARENT, CREATED_DATE, UPDATED_DATE) VALUES ('${(0, uuid_1.v4)()}','${name}',${show},'${parent}', '${(0, convertDate_1.default)(new Date())}',
    '${(0, convertDate_1.default)(new Date())}')`,
        successCode: ADD_SUCCESS,
        errorCode: ADD_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.CREATED,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
const updateCategoryDBCall = (req, res) => {
    const { id } = req.params;
    const { name, show, parent } = req.body;
    const options = {
        query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT='${parent}', UPDATED_DATE='${(0, convertDate_1.default)(new Date())}' WHERE ID='${id}'`,
        successCode: UPDATE_SUCCESS,
        errorCode: UPDATE_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.OK,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
const deleteCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `DELETE FROM CATEGORIES WHERE ID='${id}'`,
        successCode: DELETE_SUCCESS,
        errorCode: DELETE_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.OK,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
exports.default = {
    getAllCategories,
    getPrimaryCategories,
    getSingleCategory,
    updateCategoryDBCall,
    deleteCategory,
    performCategoryValidation,
    createCategoryDBCall,
    checkDuplicateCategory,
};
