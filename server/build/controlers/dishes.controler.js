"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const getAllDishes = (req, res) => {
    const options = {
        query: "SELECT * FROM DISHES",
        errorMessage: "Dishes getAll error",
        single: false,
    };
    (0, common_1.getHelper)(options, res);
};
const getAllVisibleDishes = (req, res) => {
    const options = {
        query: "SELECT * FROM DISHES WHERE SHOW=TRUE",
        errorMessage: "Dishes getAllVisible error",
        single: false,
    };
    (0, common_1.getHelper)(options, res);
};
const getSingleDish = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT *  FROM DISHES WHERE ID=${id}`,
        errorMessage: "Dishes getSingle error",
        single: true,
    };
    (0, common_1.getHelper)(options, res);
};
const getAllDishesFromCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT * FROM DISHES WHERE CATEGORY IN (SELECT ID FROM CATEGORIES WHERE PARENT=${id}) AND SHOW=TRUE`,
        errorMessage: "Dishes getAllFromCategory error",
        single: false,
    };
    (0, common_1.getHelper)(options, res);
};
const addDish = (req, res) => {
    const { name, description, img, show, category, weights } = req.body;
    const options = {
        query: `INSERT INTO DISHES(NAME, DESCRIPTION, IMG, SHOW, CATEGORY, WEIGHTS) VALUES ('${name}', '${description}', '${img}', ${show}, ${category}, '${JSON.stringify(weights)}')`,
        successMessage: `Dish ${name} created!`,
        errorMessage: "Dishes add error",
    };
    (0, common_1.addHelper)(options, res);
};
const updateDish = (req, res) => {
    const { id } = req.params;
    const { name, description, img, show, category, weights } = req.body;
    const options = {
        query: `UPDATE DISHES SET NAME='${name}' ,DESCRIPTION='${description}', IMG='${img}', SHOW=${show}, CATEGORY=${category}, WEIGHTS='${JSON.stringify(weights)}' WHERE ID=${id}`,
        successMessage: `Dish ${name} updated!`,
        errorMessage: "Dishes update error",
    };
    (0, common_1.updateHelper)(options, res);
};
const deleteDish = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `DELETE FROM DISHES WHERE ID=${id}`,
        successMessage: `Dish was deleted!`,
        errorMessage: "Dishes delete error",
    };
    (0, common_1.deleteHelper)(options, res);
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
