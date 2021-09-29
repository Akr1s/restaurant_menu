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
const dishesValidator_1 = require("../validators/dishesValidator");
const responseCodes_1 = require("../constants/responseCodes");
const convertDate_1 = __importDefault(require("../utils/convertDate"));
const duplicateCheck_1 = __importDefault(require("../validators/duplicateCheck"));
const cloudinary_config_1 = __importDefault(require("../config/cloudinary.config"));
const { DISHES_GET_ERROR, ADD_ERROR, ADD_SUCCESS, UPDATE_SUCCESS, UPDATE_ERROR, DELETE_ERROR, DELETE_SUCCESS, } = responseCodes_1.RESPONSE_CODES;
const getAllDishes = (req, res) => {
    const options = {
        query: "SELECT * FROM DISHES ORDER BY CREATED_DATE ASC",
        errorCode: DISHES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getAllDishesFromCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT='${id}') AND SHOW=TRUE ORDER BY CREATED_DATE ASC`,
        errorCode: DISHES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const performDishValidation = (req, res, next) => {
    const validationResult = (0, dishesValidator_1.validateDish)(req.body);
    if (validationResult) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${validationResult}`);
    }
    next();
};
const checkDuplicateDish = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id } = req.body;
    const duplicateCheckResult = yield (0, duplicateCheck_1.default)(name, `SELECT NAME FROM DISHES WHERE ID<>'${id}'`);
    if (duplicateCheckResult !== responseCodes_1.RESPONSE_CODES.ADD_SUCCESS) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${duplicateCheckResult}`);
    }
    next();
});
const createDishDBCall = (req, res) => {
    const { name, description, img, show, category, weights, id } = req.body;
    const options = {
        query: `INSERT INTO DISHES(ID, NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS, CREATED_DATE, UPDATED_DATE) VALUES ('${id}','${name}', '${description}', '${img}', ${show}, '${category}', '${JSON.stringify(weights)}', '${(0, convertDate_1.default)(new Date())}','${(0, convertDate_1.default)(new Date())}')`,
        successCode: ADD_SUCCESS,
        errorCode: ADD_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.CREATED,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
const updateDishDBCall = (req, res) => {
    const { id } = req.params;
    const { name, description, img, show, category, weights } = req.body;
    const options = {
        query: `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY='${category}', WEIGHTS='${JSON.stringify(weights)}', UPDATED_DATE='${(0, convertDate_1.default)(new Date())}' WHERE ID='${id}'`,
        successCode: UPDATE_SUCCESS,
        errorCode: UPDATE_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.OK,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
const deleteDish = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `DELETE FROM DISHES WHERE ID='${id}'`,
        successCode: DELETE_SUCCESS,
        errorCode: DELETE_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.OK,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
const uploadImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { img } = req.body;
    if (!img.startsWith("http")) {
        const response = yield cloudinary_config_1.default.uploader.upload(img);
        req.body.img = response.secure_url;
    }
    next();
});
exports.default = {
    getAllDishes,
    getAllDishesFromCategory,
    performDishValidation,
    checkDuplicateDish,
    createDishDBCall,
    updateDishDBCall,
    deleteDish,
    uploadImage,
};
