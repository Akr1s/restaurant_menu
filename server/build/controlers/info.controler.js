"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const getAllInfo = (req, res) => {
    const options = {
        query: "SELECT * FROM INFO LIMIT 1",
        errorMessage: "Info getAll error",
        single: true,
    };
    (0, common_1.getHelper)(options, res);
};
const getTitle = (req, res) => {
    const options = {
        query: "SELECT TITLE FROM INFO",
        errorMessage: "Info getTitle error",
        single: true,
    };
    (0, common_1.getHelper)(options, res);
};
const getRestInfo = (req, res) => {
    const options = {
        query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
        errorMessage: "Info getRestInfo error",
        single: true,
    };
    (0, common_1.getHelper)(options, res);
};
const updateInfo = (req, res) => {
    const { title, address, tel, wifi } = req.body;
    const options = {
        query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
        successMessage: "Information was succesfully updated!",
        errorMessage: "Info updateInfo error",
    };
    (0, common_1.updateHelper)(options, res);
};
exports.default = {
    getAllInfo,
    getTitle,
    getRestInfo,
    updateInfo,
};
