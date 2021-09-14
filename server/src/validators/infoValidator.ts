import { VALIDATION_CODES } from "../constants/validationCodes";
import {
  objectHasAdditionalProperties,
  objectIsEmpty,
  propertiesAreMissing,
  stringIsEmpty,
  stringLengthExeeds,
  wrongType,
} from "../helpers/validatorHelpers";
import { InfoInterface } from "../interfaces/info";

export const validateInfo = (body: InfoInterface): number => {
  const { title, tel, address, wifi } = body;
  if (objectIsEmpty(body)) return VALIDATION_CODES.BODY_IS_EMPTY;
  if (propertiesAreMissing(title, tel, address, wifi))
    return VALIDATION_CODES.PROPERTY_IS_MISSING;
  if (objectHasAdditionalProperties(body, 4))
    return VALIDATION_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
  if (
    wrongType(title, "string") ||
    stringIsEmpty(title) ||
    stringLengthExeeds(title, 25)
  )
    return VALIDATION_CODES.INFO_TITLE_ERROR;
  if (
    wrongType(address, "string") ||
    stringIsEmpty(address) ||
    stringLengthExeeds(address, 50)
  )
    return VALIDATION_CODES.INFO_ADDRESS_ERROR;
  if (
    wrongType(tel, "string") ||
    stringIsEmpty(tel) ||
    stringLengthExeeds(tel, 15)
  )
    return VALIDATION_CODES.INFO_TEL_ERROR;
  if (
    wrongType(wifi, "string") ||
    stringIsEmpty(wifi) ||
    stringLengthExeeds(wifi, 15)
  )
    return VALIDATION_CODES.INFO_WIFI_ERROR;
  return VALIDATION_CODES.VALIDATION_SUCCESFUL;
};
