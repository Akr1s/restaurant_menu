"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInfo = void 0;
const validationCodes_1 = require("../constants/validationCodes");
const validatorHelpers_1 = require("../helpers/validatorHelpers");
const validateInfo = (body) => {
  const { title, tel, address, wifi } = body;
  if ((0, validatorHelpers_1.objectIsEmpty)(body))
    return validationCodes_1.RESPONSE_CODES.BODY_IS_EMPTY;
  if ((0, validatorHelpers_1.propertiesAreMissing)(title, tel, address, wifi))
    return validationCodes_1.RESPONSE_CODES.PROPERTY_IS_MISSING;
  if ((0, validatorHelpers_1.objectHasAdditionalProperties)(body, 4))
    return validationCodes_1.RESPONSE_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
  if (
    (0, validatorHelpers_1.wrongType)(title, "string") ||
    (0, validatorHelpers_1.stringIsEmpty)(title) ||
    (0, validatorHelpers_1.stringLengthExeeds)(title, 25)
  )
    return validationCodes_1.RESPONSE_CODES.CATEGORIES_NAME_ERROR;
  return validationCodes_1.RESPONSE_CODES.VALIDATION_SUCCESFUL;
};
exports.validateInfo = validateInfo;
