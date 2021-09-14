import { VALIDATION_CODES } from "../constants/validationCodes";
import {
  isUndefined,
  objectHasAdditionalProperties,
  objectIsEmpty,
  propertiesAreMissing,
  stringIsEmpty,
  stringLengthExeeds,
  wrongType,
} from "../helpers/validatorHelpers";
import { CategoryInterface } from "../interfaces/category";

export const validateCategory = (body: CategoryInterface): number => {
  const { name, show, parent } = body;
  if (objectIsEmpty(body)) return VALIDATION_CODES.BODY_IS_EMPTY;
  if (propertiesAreMissing(name, show) || isUndefined(parent))
    return VALIDATION_CODES.PROPERTY_IS_MISSING;
  if (objectHasAdditionalProperties(body, 3))
    return VALIDATION_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
  if (
    wrongType(name, "string") ||
    stringIsEmpty(name) ||
    stringLengthExeeds(name, 30)
  )
    return VALIDATION_CODES.CATEGORIES_NAME_ERROR;
  if (wrongType(show, "boolean")) VALIDATION_CODES.CATEGORIES_SHOW_ERROR;
  return VALIDATION_CODES.VALIDATION_SUCCESFUL;
};
