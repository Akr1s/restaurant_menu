"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInfo = void 0;
const validationCodes_1 = require("../constants/validationCodes");
const validatorHelpers_1 = require("../helpers/validatorHelpers");
const validateInfo = (body) => {
    const { title, tel, address, wifi } = body;
    if ((0, validatorHelpers_1.objectIsEmpty)(body))
        return validationCodes_1.VALIDATION_CODES.BODY_IS_EMPTY;
    if ((0, validatorHelpers_1.propertiesAreMissing)(title, tel, address, wifi))
        return validationCodes_1.VALIDATION_CODES.PROPERTY_IS_MISSING;
    if ((0, validatorHelpers_1.objectHasAdditionalProperties)(body, 4))
        return validationCodes_1.VALIDATION_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
    if ((0, validatorHelpers_1.wrongType)(title, "string") ||
        (0, validatorHelpers_1.stringIsEmpty)(title) ||
        (0, validatorHelpers_1.stringLengthExeeds)(title, 25))
        return validationCodes_1.VALIDATION_CODES.INFO_TITLE_ERROR;
    if ((0, validatorHelpers_1.wrongType)(address, "string") ||
        (0, validatorHelpers_1.stringIsEmpty)(address) ||
        (0, validatorHelpers_1.stringLengthExeeds)(address, 50))
        return validationCodes_1.VALIDATION_CODES.INFO_ADDRESS_ERROR;
    if ((0, validatorHelpers_1.wrongType)(tel, "string") ||
        (0, validatorHelpers_1.stringIsEmpty)(tel) ||
        (0, validatorHelpers_1.stringLengthExeeds)(tel, 15))
        return validationCodes_1.VALIDATION_CODES.INFO_TEL_ERROR;
    if ((0, validatorHelpers_1.wrongType)(wifi, "string") ||
        (0, validatorHelpers_1.stringIsEmpty)(wifi) ||
        (0, validatorHelpers_1.stringLengthExeeds)(wifi, 15))
        return validationCodes_1.VALIDATION_CODES.INFO_WIFI_ERROR;
    return validationCodes_1.VALIDATION_CODES.VALIDATION_SUCCESFUL;
};
exports.validateInfo = validateInfo;
