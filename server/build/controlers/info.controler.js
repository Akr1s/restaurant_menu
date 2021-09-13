"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const infoMessages_1 = require("../constants/infoMessages");
const getAllInfo = (req, res) => {
    const options = {
        query: "SELECT * FROM INFO LIMIT 1",
        errorMessage: infoMessages_1.INFO_MESSAGES.GET_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getTitle = (req, res) => {
    const options = {
        query: "SELECT TITLE FROM INFO",
        errorMessage: infoMessages_1.INFO_MESSAGES.GET_TITLE_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getRestInfo = (req, res) => {
    const options = {
        query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
        errorMessage: infoMessages_1.INFO_MESSAGES.GET_REST_INFO_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const updateInfo = (req, res) => {
    const { title, address, tel, wifi } = req.body;
    const options = {
        query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
        successMessage: infoMessages_1.INFO_MESSAGES.UPDATE_SUCCESS,
        errorMessage: infoMessages_1.INFO_MESSAGES.UPDATE_ERROR,
    };
    (0, common_1.updateDataInDatabase)(options, res);
};
exports.default = {
    getAllInfo,
    getTitle,
    getRestInfo,
    updateInfo,
};
