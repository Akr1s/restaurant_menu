"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDish = void 0;
const responseCodes_1 = require("../constants/responseCodes");
const validatorHelpers_1 = require("../helpers/validatorHelpers");
const validateDish = (body) => {
    const { name, desc, img, show, category, weights } = body;
    const objectConfigurationTestResult = (0, validatorHelpers_1.objectConfigurationTest)(body, 6, name, desc, img, show, category, weights);
    if (objectConfigurationTestResult)
        return objectConfigurationTestResult;
    if ((0, validatorHelpers_1.stringIsIncorrect)(name, 30))
        return responseCodes_1.RESPONSE_CODES.DISHES_NAME_ERROR;
    if ((0, validatorHelpers_1.wrongType)(desc, "string") || (0, validatorHelpers_1.stringLengthExeeds)(desc, 255))
        return responseCodes_1.RESPONSE_CODES.DISHES_DESCRIPTION_ERROR;
    if ((0, validatorHelpers_1.stringIsIncorrect)(img, 255))
        return responseCodes_1.RESPONSE_CODES.DISHES_IMG_ERROR;
    if ((0, validatorHelpers_1.wrongType)(show, "boolean"))
        responseCodes_1.RESPONSE_CODES.DISHES_SHOW_ERROR;
    if ((0, validatorHelpers_1.objectIsEmpty)(weights))
        return responseCodes_1.RESPONSE_CODES.DISHES_WEIGHTS_ERROR;
    return responseCodes_1.RESPONSE_CODES.VALIDATION_SUCCESFUL;
};
exports.validateDish = validateDish;
