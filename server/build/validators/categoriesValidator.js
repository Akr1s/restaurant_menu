"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = void 0;
const validationCodes_1 = require("../constants/validationCodes");
const validatorHelpers_1 = require("../helpers/validatorHelpers");
const validateCategory = (body) => {
  const { name, show, parent } = body;
  if ((0, validatorHelpers_1.objectIsEmpty)(body))
    return validationCodes_1.RESPONSE_CODES.BODY_IS_EMPTY;
  if (
    (0, validatorHelpers_1.propertiesAreMissing)(name, show) ||
    (0, validatorHelpers_1.isUndefined)(parent)
  )
    return validationCodes_1.RESPONSE_CODES.PROPERTY_IS_MISSING;
  if ((0, validatorHelpers_1.objectHasAdditionalProperties)(body, 3))
    return validationCodes_1.RESPONSE_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
  if (
    (0, validatorHelpers_1.wrongType)(name, "string") ||
    (0, validatorHelpers_1.stringIsEmpty)(name) ||
    (0, validatorHelpers_1.stringLengthExeeds)(name, 30)
  )
    return validationCodes_1.RESPONSE_CODES.CATEGORIES_NAME_ERROR;
  if ((0, validatorHelpers_1.wrongType)(show, "boolean"))
    validationCodes_1.RESPONSE_CODES.CATEGORIES_SHOW_ERROR;
  return validationCodes_1.RESPONSE_CODES.VALIDATION_SUCCESFUL;
};
exports.validateCategory = validateCategory;
