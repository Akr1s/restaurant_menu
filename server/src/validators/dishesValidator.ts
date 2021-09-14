import { RESPONSE_CODES } from "../constants/responseCodes";
import {
  objectConfigurationTest,
  objectIsEmpty,
  stringIsIncorrect,
  stringLengthExeeds,
  wrongType,
} from "../helpers/validatorHelpers";
import { DishInterface } from "../interfaces/dish";

export const validateDish = (body: DishInterface): number => {
  const { name, desc, img, show, category, weights } = body;
  const objectConfigurationTestResult = objectConfigurationTest<DishInterface>(
    body,
    6,
    name,
    desc,
    img,
    show,
    category,
    weights
  );
  if (objectConfigurationTestResult) return objectConfigurationTestResult;
  if (stringIsIncorrect(name, 30)) return RESPONSE_CODES.DISHES_NAME_ERROR;
  if (wrongType(desc, "string") || stringLengthExeeds(desc, 255))
    return RESPONSE_CODES.DISHES_DESCRIPTION_ERROR;
  if (stringIsIncorrect(img, 255)) return RESPONSE_CODES.DISHES_IMG_ERROR;
  if (wrongType(show, "boolean")) RESPONSE_CODES.DISHES_SHOW_ERROR;
  if (objectIsEmpty(weights)) return RESPONSE_CODES.DISHES_WEIGHTS_ERROR;
  return RESPONSE_CODES.VALIDATION_SUCCESFUL;
};
