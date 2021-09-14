"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const categoriesMessages_1 = require("../constants/categoriesMessages");
const statusCodes_1 = require("../constants/statusCodes");
const uuid_1 = require("uuid");
const categoriesValidator_1 = require("../validators/categoriesValidator");
const { GET_ERROR, ADD_SUCCESS, ADD_ERROR, UPDATE_ERROR, UPDATE_SUCCESS, DELETE_ERROR, DELETE_SUCCESS, } = categoriesMessages_1.CATEGORIES_MESSAGES;
const getAllCategories = (req, res) => {
    const options = {
        query: "SELECT NAME FROM CATEGORIES",
        errorMessage: GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getPrimaryCategories = (req, res) => {
    const options = {
        query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
        errorMessage: GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getSingleCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
        errorMessage: GET_ERROR,
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
        successMessage: ADD_SUCCESS,
        errorMessage: ADD_ERROR,
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
        successMessage: UPDATE_SUCCESS,
        errorMessage: UPDATE_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.OK,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
const deleteCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
        successMessage: DELETE_SUCCESS,
        errorMessage: DELETE_ERROR,
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
