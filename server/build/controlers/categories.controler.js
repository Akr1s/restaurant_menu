"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../helpers/index");
const getAll = (req, res) => {
    const options = {
        query: "SELECT NAME FROM CATEGORIES",
        errorMessage: "Categories getAll error",
        single: false,
    };
    (0, index_1.getHelper)(options, res);
};
const getPrimary = (req, res) => {
    const options = {
        query: "SELECT NAME FROM CATEGORIES WHERE PARENT IS NULL AND SHOW=TRUE",
        errorMessage: "Categories getPrimary error",
        single: false,
    };
    (0, index_1.getHelper)(options, res);
};
const getSingle = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `SELECT *  FROM CATEGORIES WHERE ID=${id}`,
        errorMessage: "Categories getSingle error",
        single: true,
    };
    (0, index_1.getHelper)(options, res);
};
const add = (req, res) => {
    const { name, show, parent } = req.body;
    const options = {
        query: `INSERT INTO CATEGORIES(NAME, SHOW, PARENT) VALUES ('${name}',${show},${parent})`,
        successMessage: `Category ${name} created!`,
        errorMessage: "Categories add error",
    };
    (0, index_1.addHelper)(options, res);
};
const update = (req, res) => {
    const { id } = req.params;
    const { name, show, parent } = req.body;
    const options = {
        query: `UPDATE CATEGORIES SET NAME='${name}', SHOW=${show}, PARENT=${parent} WHERE ID=${id}`,
        successMessage: `Category ${name} updated!`,
        errorMessage: "Categories update error",
    };
    (0, index_1.updateHelper)(options, res);
};
const deleteCategory = (req, res) => {
    const { id } = req.params;
    const options = {
        query: `DELETE FROM CATEGORIES WHERE ID=${id}`,
        successMessage: `Category was deleted!`,
        errorMessage: "Categories delete error",
    };
    (0, index_1.deleteHelper)(options, res);
};
exports.default = {
    getAll,
    getPrimary,
    getSingle,
    add,
    update,
    deleteCategory,
};
