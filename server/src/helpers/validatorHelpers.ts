import { RESPONSE_CODES } from "../constants/responseCodes";

const propertyIsMissing = (property: any): boolean => {
  return property == undefined;
};

export const propertiesAreMissing = (...properties: any[]): boolean => {
  return properties.some((prop) => propertyIsMissing(prop));
};

export const objectIsEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const wrongType = (property: any, type: string): boolean => {
  return typeof property !== type;
};

export const stringIsEmpty = (param: string): boolean => {
  return param.trim().length === 0;
};

export const stringLengthExceeds = (
  param: string,
  maxLength: number
): boolean => {
  return param.length > maxLength;
};

export const isUndefined = (param: any): boolean => {
  return param === undefined;
};

export const objectHasAdditionalProperties = (
  obj: object,
  propertiesAmount: number
): boolean => {
  return Object.keys(obj).length > propertiesAmount;
};

export const objectConfigurationTest = <T extends object>(
  body: T,
  amountOfProperties: number,
  ...propertiesList: unknown[]
): number => {
  if (objectIsEmpty(body)) return RESPONSE_CODES.BODY_IS_EMPTY;
  if (propertiesAreMissing(...propertiesList))
    return RESPONSE_CODES.PROPERTY_IS_MISSING;
  if (objectHasAdditionalProperties(body, amountOfProperties))
    return RESPONSE_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
  return RESPONSE_CODES.VALIDATION_SUCCESS;
};

export const stringIsIncorrect = (property: string, maxLength: number) => {
  return (
    wrongType(property, "string") ||
    stringIsEmpty(property) ||
    stringLengthExceeds(property, maxLength)
  );
};
