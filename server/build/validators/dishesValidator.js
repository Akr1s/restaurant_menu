"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDish = void 0;
const validationCodes_1 = require("../constants/validationCodes");
const validatorHelpers_1 = require("../helpers/validatorHelpers");
const validateDish = (body) => {
    const { name, desc, img, show, category, weights } = body;
    if ((0, validatorHelpers_1.objectIsEmpty)(body))
        return validationCodes_1.VALIDATION_CODES.BODY_IS_EMPTY;
    if ((0, validatorHelpers_1.propertiesAreMissing)(name, desc, img, show, category, weights))
        return validationCodes_1.VALIDATION_CODES.PROPERTY_IS_MISSING;
    if ((0, validatorHelpers_1.objectHasAdditionalProperties)(body, 3))
        return validationCodes_1.VALIDATION_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
    if ((0, validatorHelpers_1.wrongType)(name, "string") ||
        (0, validatorHelpers_1.stringIsEmpty)(name) ||
        (0, validatorHelpers_1.stringLengthEsceeds)(name, 30))
        return validationCodes_1.VALIDATION_CODES.DISHES_NAME_ERROR;
    if ((0, validatorHelpers_1.wrongType)(desc, "string") || (0, validatorHelpers_1.stringLengthEsceeds)(desc, 255))
        return validationCodes_1.VALIDATION_CODES.DISHES_DESCRIPTION_ERROR;
    if ((0, validatorHelpers_1.wrongType)(img, "string") ||
        (0, validatorHelpers_1.stringIsEmpty)(img) ||
        (0, validatorHelpers_1.stringLengthEsceeds)(img, 255))
        return validationCodes_1.VALIDATION_CODES.DISHES_IMG_ERROR;
    if ((0, validatorHelpers_1.wrongType)(show, "boolean"))
        validationCodes_1.VALIDATION_CODES.DISHES_SHOW_ERROR;
    if ((0, validatorHelpers_1.objectIsEmpty)(weights))
        return validationCodes_1.VALIDATION_CODES.DISHES_WEIGHTS_ERROR;
    return validationCodes_1.VALIDATION_CODES.VALIDATION_SUCCESFUL;
};
exports.validateDish = validateDish;
