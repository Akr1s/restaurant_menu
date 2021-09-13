"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../helpers/index");
const getAll = (req, res) => {
    const options = {
        query: "SELECT * FROM INFO LIMIT 1",
        errorMessage: "Info getAll error",
        single: true,
    };
    (0, index_1.getHelper)(options, res);
};
const getTitle = (req, res) => {
    const options = {
        query: "SELECT TITLE FROM INFO",
        errorMessage: "Info getTitle error",
        single: true,
    };
    (0, index_1.getHelper)(options, res);
};
const getRestInfo = (req, res) => {
    const options = {
        query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
        errorMessage: "Info getRestInfo error",
        single: true,
    };
    (0, index_1.getHelper)(options, res);
};
const updateInfo = (req, res) => {
    const { title, address, tel, wifi } = req.body;
    const options = {
        query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
        successMessage: "Information was succesfully updated!",
        errorMessage: "Info updateInfo error",
    };
    (0, index_1.updateHelper)(options, res);
};
exports.default = {
    getAll,
    getTitle,
    getRestInfo,
    updateInfo,
};
