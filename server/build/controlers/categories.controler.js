"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const getAllCategories = (req, res) => {
    const options = {
        query: "SELECT NAME FROM CATEGORIES",
        errorMessage: "Categories getAll error",
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getPrimaryCategories = (req, res) => {
    const options = {
        query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
        errorMessage: "Categories getPrimary error",
        single: false,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getSingleCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
        errorMessage: "Categories getSingle error",
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const addCategory = (req, res) => {
    const { name, show, parent } = req.body;
    const options = {
        query: `INSERT INTO CATEGORIES(NAME, SHOW, PARENT) VALUES ('${name}',${show},${parent})`,
        successMessage: `Category ${name} created!`,
        errorMessage: "Categories add error",
    };
    (0, common_1.addDataToDatabase)(options, res);
};
const updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, show, parent } = req.body;
    const options = {
        query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${parent} WHERE ID=${id}`,
        successMessage: `Category ${name} updated!`,
        errorMessage: "Categories update error",
    };
    (0, common_1.updateDataInDatabase)(options, res);
};
const deleteCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
        successMessage: `Category was deleted!`,
        errorMessage: "Categories delete error",
    };
    (0, common_1.deleteDataFromDatabase)(options, res);
};
exports.default = {
    getAllCategories,
    getPrimaryCategories,
    getSingleCategory,
    addCategory,
    updateCategory,
    deleteCategory,
};
