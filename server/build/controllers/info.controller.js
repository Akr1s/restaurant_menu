"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("../helpers/common");
const statusCodes_1 = require("../constants/statusCodes");
const infoValidator_1 = require("../validators/infoValidator");
const responseCodes_1 = require("../constants/responseCodes");
const { INFO_GET_ERROR, UPDATE_ERROR, UPDATE_SUCCESS } = responseCodes_1.RESPONSE_CODES;
const getAllInfo = (req, res) => {
    const options = {
        query: "SELECT * FROM INFO LIMIT 1",
        errorCode: INFO_GET_ERROR,
        single: true,
    };
    (0, common_1.getDataFromDatabase)(options, res);
};
const performInfoValidation = (req, res, next) => {
    const validationResult = (0, infoValidator_1.validateInfo)(req.body);
    if (validationResult) {
        return res
            .status(statusCodes_1.STATUS_CODES.VALIDATION_ERROR)
            .send(`${validationResult}`);
    }
    next();
};
const updateInfoDBCall = (req, res) => {
    const { title, address, tel, wifi } = req.body;
    const options = {
        query: `UPDATE INFO SET TITLE='${title}', ADDRESS='${address}', TEL='${tel}', WIFI='${wifi}'`,
        successCode: UPDATE_SUCCESS,
        errorCode: UPDATE_ERROR,
        successStatusCode: statusCodes_1.STATUS_CODES.OK,
        errorStatusCode: statusCodes_1.STATUS_CODES.ERROR,
    };
    (0, common_1.handleDatabaseQuery)(options, res);
};
exports.default = {
    getAllInfo,
    updateInfoDBCall,
    performInfoValidation,
};
