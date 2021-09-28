import { RESPONSE_CODES } from "../constants/responseCodes";
import {
  objectConfigurationTest,
  objectIsEmpty,
  stringIsIncorrect,
  stringLengthExceeds,
  wrongType,
} from "../helpers/validatorHelpers";
import { DishInterface } from "../interfaces/dish";

export const validateDish = (body: DishInterface): number => {
  const { name, description, img, show, category, weights, id } = body;
  const objectConfigurationTestResult = objectConfigurationTest<DishInterface>(
    body,
    7,
    name,
    description,
    img,
    show,
    category,
    weights,
    id
  );
  if (objectConfigurationTestResult) return objectConfigurationTestResult;
  if (stringIsIncorrect(name, 30)) return RESPONSE_CODES.DISHES_NAME_ERROR;
  if (wrongType(description, "string") || stringLengthExceeds(description, 255))
    return RESPONSE_CODES.DISHES_DESCRIPTION_ERROR;
  if (stringIsIncorrect(img, 255)) return RESPONSE_CODES.DISHES_IMG_ERROR;
  if (wrongType(show, "boolean")) RESPONSE_CODES.DISHES_SHOW_ERROR;
  if (objectIsEmpty(weights)) return RESPONSE_CODES.DISHES_WEIGHTS_ERROR;
  return RESPONSE_CODES.VALIDATION_SUCCESS;
};
