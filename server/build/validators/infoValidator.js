"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInfo = void 0;
const responseCodes_1 = require("../constants/responseCodes");
const validatorHelpers_1 = require("../helpers/validatorHelpers");
const validateInfo = (body) => {
    const { title, tel, address, wifi } = body;
    const objectConfigurationTestResult = (0, validatorHelpers_1.objectConfigurationTest)(body, 4, title, tel, address, wifi);
    if (objectConfigurationTestResult)
        return objectConfigurationTestResult;
    if ((0, validatorHelpers_1.stringIsIncorrect)(title, 25))
        return responseCodes_1.RESPONSE_CODES.INFO_TITLE_ERROR;
    if ((0, validatorHelpers_1.stringIsIncorrect)(address, 50))
        return responseCodes_1.RESPONSE_CODES.INFO_ADDRESS_ERROR;
    if ((0, validatorHelpers_1.stringIsIncorrect)(tel, 15))
        return responseCodes_1.RESPONSE_CODES.INFO_TEL_ERROR;
    if ((0, validatorHelpers_1.stringIsIncorrect)(wifi, 15))
        return responseCodes_1.RESPONSE_CODES.INFO_WIFI_ERROR;
    return responseCodes_1.RESPONSE_CODES.VALIDATION_SUCCESFUL;
};
exports.validateInfo = validateInfo;
