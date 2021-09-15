import { RESPONSE_CODES } from "../constants/responseCodes";

const propertyIsMissing = (property: unknown): boolean => {
  return property == undefined;
};

export const propertiesAreMissing = (...properties: unknown[]): boolean => {
  return properties.some((prop) => propertyIsMissing(prop));
};

export const objectIsEmpty = (obj: object): boolean => {
  return Object.keys(obj).length === 0;
};

export const wrongType = (property: unknown, type: string): boolean => {
  return typeof property !== type;
};

export const stringIsEmpty = (param: string): boolean => {
  return param.trim().length === 0;
};

export const stringLengthExeeds = (
  param: string,
  maxLength: number
): boolean => {
  return param.length > maxLength;
};

export const isUndefined = (param: unknown): boolean => {
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
  return RESPONSE_CODES.VALIDATION_SUCCESFUL;
};

export const stringIsIncorrect = (property: string, maxLength: number) => {
  return (
    wrongType(property, "string") ||
    stringIsEmpty(property) ||
    stringLengthExeeds(property, maxLength)
  );
};
