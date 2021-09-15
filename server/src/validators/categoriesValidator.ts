import { RESPONSE_CODES } from "../constants/responseCodes";
import {
  isUndefined,
  objectConfigurationTest,
  stringIsIncorrect,
  wrongType,
} from "../helpers/validatorHelpers";
import { CategoryInterface } from "../interfaces/category";

export const validateCategory = (body: CategoryInterface): number => {
  const { name, show, parent } = body;
  const objectConfigurationTestResult =
    objectConfigurationTest<CategoryInterface>(body, 3, name, show);
  if (objectConfigurationTestResult) return objectConfigurationTestResult;
  if (isUndefined(parent)) return RESPONSE_CODES.PROPERTY_IS_MISSING;
  if (stringIsIncorrect(name, 30)) return RESPONSE_CODES.CATEGORIES_NAME_ERROR;
  if (wrongType(show, "boolean")) RESPONSE_CODES.CATEGORIES_SHOW_ERROR;
  return RESPONSE_CODES.VALIDATION_SUCCESFUL;
};
