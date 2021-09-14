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

export const stringLengthEsceeds = (
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
