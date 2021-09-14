"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const statusCodes_1 = require("../constants/statusCodes");
const uuid_1 = require("uuid");
const categoriesValidator_1 = require("../validators/categoriesValidator");
const responseCodes_1 = require("../constants/responseCodes");
const { CATEGORIES_GET_ERROR, ADD_ERROR, ADD_SUCCESS, UPDATE_SUCCESS, UPDATE_ERROR, DELETE_ERROR, DELETE_SUCCESS, } = responseCodes_1.RESPONSE_CODES;
const getAllCategories = (req, res) => {
    const options = {
        query: "SELECT NAME FROM CATEGORIES",
        errorCode: CATEGORIES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getPrimaryCategories = (req, res) => {
    const options = {
        query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
        errorCode: CATEGORIES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getSingleCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
        errorCode: CATEGORIES_GET_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const addCategory = (req, res) => {
    const validationResult = (0, categoriesValidator_1.validateCategory)(req.body);
    if (validationResult) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${validationResult}`);
    }
    const { name, show, parent } = req.body;
    const options = {
        query: `INSERT INTO CATEGORIES(ID,NAME, SHOW, PARENT) VALUES ('${(0, uuid_1.v4)()}','${name}',${show},${parent})`,
        successCode: ADD_SUCCESS,
        errorCode: ADD_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.CREATED,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
const updateCategory = (req, res) => {
    const validationResult = (0, categoriesValidator_1.validateCategory)(req.body);
    if (validationResult) {
        return res.status(statusCodes_1.STATUS_CODES.UPDATE_ERROR).send(`${validationResult}`);
    }
    const { id } = req.params;
    const { name, show, parent } = req.body;
    const options = {
        query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${parent} WHERE ID=${id}`,
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
        query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
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
    addCategory,
    updateCategory,
    deleteCategory,
};
