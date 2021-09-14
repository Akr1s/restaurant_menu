import { VALIDATION_CODES } from "../constants/validationCodes";
import {
  isUndefined,
  objectHasAdditionalProperties,
  objectIsEmpty,
  propertiesAreMissing,
  stringIsEmpty,
  stringLengthEsceeds,
  wrongType,
} from "../helpers/validatorHelpers";
import { DishInterface } from "../interfaces/dish";

export const validateDish = (body: DishInterface): number => {
  const { name, desc, img, show, category, weights } = body;
  if (objectIsEmpty(body)) return VALIDATION_CODES.BODY_IS_EMPTY;
  if (propertiesAreMissing(name, desc, img, show, category, weights))
    return VALIDATION_CODES.PROPERTY_IS_MISSING;
  if (objectHasAdditionalProperties(body, 3))
    return VALIDATION_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
  if (
    wrongType(name, "string") ||
    stringIsEmpty(name) ||
    stringLengthEsceeds(name, 30)
  )
    return VALIDATION_CODES.DISHES_NAME_ERROR;
  if (wrongType(desc, "string") || stringLengthEsceeds(desc, 255))
    return VALIDATION_CODES.DISHES_DESCRIPTION_ERROR;
  if (
    wrongType(img, "string") ||
    stringIsEmpty(img) ||
    stringLengthEsceeds(img, 255)
  )
    return VALIDATION_CODES.DISHES_IMG_ERROR;
  if (wrongType(show, "boolean")) VALIDATION_CODES.DISHES_SHOW_ERROR;
  if (objectIsEmpty(weights)) return VALIDATION_CODES.DISHES_WEIGHTS_ERROR;
  return VALIDATION_CODES.VALIDATION_SUCCESFUL;
};
