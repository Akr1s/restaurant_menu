"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = void 0;
const responseCodes_1 = require("../constants/responseCodes");
const validatorHelpers_1 = require("../helpers/validatorHelpers");
const validateCategory = (body) => {
    const { name, show, parent } = body;
    const objectConfigurationTestResult = (0, validatorHelpers_1.objectConfigurationTest)(body, 3, name, show);
    if (objectConfigurationTestResult)
        return objectConfigurationTestResult;
    if ((0, validatorHelpers_1.isUndefined)(parent))
        return responseCodes_1.RESPONSE_CODES.PROPERTY_IS_MISSING;
    if ((0, validatorHelpers_1.stringIsIncorrect)(name, 30))
        return responseCodes_1.RESPONSE_CODES.CATEGORIES_NAME_ERROR;
    if ((0, validatorHelpers_1.wrongType)(show, "boolean"))
        responseCodes_1.RESPONSE_CODES.CATEGORIES_SHOW_ERROR;
    return responseCodes_1.RESPONSE_CODES.VALIDATION_SUCCESFUL;
};
exports.validateCategory = validateCategory;
