"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const infoMessages_1 = require("../constants/infoMessages");
const statusCodes_1 = require("../constants/statusCodes");
const infoValidator_1 = require("../validators/infoValidator");
const { UPDATE_ERROR, UPDATE_SUCCESS, GET_ERROR, GET_REST_INFO_ERROR, GET_TITLE_ERROR, } = infoMessages_1.INFO_MESSAGES;
const getAllInfo = (req, res) => {
    const options = {
        query: "SELECT * FROM INFO LIMIT 1",
        errorMessage: GET_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getTitle = (req, res) => {
    const options = {
        query: "SELECT TITLE FROM INFO",
        errorMessage: GET_TITLE_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const getRestInfo = (req, res) => {
    const options = {
        query: "SELECT ADDRESS, TEL, WIFI FROM INFO",
        errorMessage: GET_REST_INFO_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const updateInfo = (req, res) => {
    const validationResult = (0, infoValidator_1.validateInfo)(req.body);
    if (validationResult) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${validationResult}`);
    }
    const { title, address, tel, wifi } = req.body;
    const options = {
        query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
        successMessage: UPDATE_SUCCESS,
        errorMessage: UPDATE_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.OK,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
exports.default = {
    getAllInfo,
    getTitle,
    getRestInfo,
    updateInfo,
};
