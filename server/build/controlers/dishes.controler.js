"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const dishesMessages_1 = require("../constants/dishesMessages");
const getAllDishes = (req, res) => {
    const options = {
        query: "SELECT * FROM DISHES",
        errorMessage: dishesMessages_1.DISHES_MESSAGES.GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getAllVisibleDishes = (req, res) => {
    const options = {
        query: "SELECT * FROM DISHES WHERE SHOW=TRUE",
        errorMessage: dishesMessages_1.DISHES_MESSAGES.GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getSingleDish = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT *  FROM DISHES WHERE ID=${id}`,
        errorMessage: dishesMessages_1.DISHES_MESSAGES.GET_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getAllDishesFromCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id}) AND SHOW=TRUE`,
        errorMessage: dishesMessages_1.DISHES_MESSAGES.GET_ERROR,
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const addDish = (req, res) => {
    const { name, description, img, show, category, weights } = req.body;
    const options = {
        query: `INSERT INTO DISHES(NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS) VALUES ('${name}', '${description}', '${img}', ${show}, ${category}, '${JSON.stringify(weights)}')`,
        successMessage: dishesMessages_1.DISHES_MESSAGES.ADD_SUCCESS,
        errorMessage: dishesMessages_1.DISHES_MESSAGES.ADD_ERROR,
    };
    (0, common_1.addDataToDatabase)(options, res);
};
const updateDish = (req, res) => {
    const { id } = req.params;
    const { name, description, img, show, category, weights } = req.body;
    const options = {
        query: `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY=${category}, WEIGHTS='${JSON.stringify(weights)}' WHERE ID=${id}`,
        successMessage: dishesMessages_1.DISHES_MESSAGES.UPDATE_SUCCESS,
        errorMessage: dishesMessages_1.DISHES_MESSAGES.UPDATE_ERROR,
    };
    (0, common_1.updateDataInDatabase)(options, res);
};
const deleteDish = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `DELETE FROM DISHES WHERE ID=${id}`,
        successMessage: dishesMessages_1.DISHES_MESSAGES.DELETE_SUCCESS,
        errorMessage: dishesMessages_1.DISHES_MESSAGES.DELETE_ERROR,
    };
    (0, common_1.deleteDataFromDatabase)(options, res);
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
