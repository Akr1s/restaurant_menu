"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const statusCodes_1 = require("../constants/statusCodes");
const uuid_1 = require("uuid");
const dishesValidator_1 = require("../validators/dishesValidator");
const responseCodes_1 = require("../constants/responseCodes");
const { DISHES_GET_ERROR, ADD_ERROR, ADD_SUCCESS, UPDATE_SUCCESS, UPDATE_ERROR, DELETE_ERROR, DELETE_SUCCESS, } = responseCodes_1.RESPONSE_CODES;
const getAllDishes = (req, res) => {
    const options = {
        query: "SELECT * FROM DISHES",
        errorCode: DISHES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getAllVisibleDishes = (req, res) => {
    const options = {
        query: "SELECT * FROM DISHES WHERE SHOW=TRUE",
        errorCode: DISHES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getSingleDish = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT *  FROM DISHES WHERE ID=${id}`,
        errorCode: DISHES_GET_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getAllDishesFromCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id}) AND SHOW=TRUE`,
        errorCode: DISHES_GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const addDish = (req, res) => {
    const validationResult = (0, dishesValidator_1.validateDish)(req.body);
    if (validationResult) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${validationResult}`);
    }
    const { name, description, img, show, category, weights } = req.body;
    const options = {
        query: `INSERT INTO DISHES(ID, NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS) VALUES ('${(0, uuid_1.v4)()}','${name}', '${description}', '${img}', ${show}, ${category}, '${JSON.stringify(weights)}')`,
        successCode: ADD_SUCCESS,
        errorCode: ADD_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.CREATED,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
const updateDish = (req, res) => {
    const validationResult = (0, dishesValidator_1.validateDish)(req.body);
    if (validationResult) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${validationResult}`);
    }
    const { id } = req.params;
    const { name, description, img, show, category, weights } = req.body;
    const options = {
        query: `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY=${category}, WEIGHTS='${JSON.stringify(weights)}' WHERE ID=${id}`,
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
        query: `DELETE FROM DISHES WHERE ID=${id}`,
        successCode: DELETE_SUCCESS,
        errorCode: DELETE_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.OK,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
exports.default = {
    getAllDishes,
    getAllVisibleDishes,
    getSingleDish,
    getAllDishesFromCategory,
    addDish,
    updateDish,
    deleteDish,
};
