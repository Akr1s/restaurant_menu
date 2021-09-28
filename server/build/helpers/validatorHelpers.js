"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringIsIncorrect = exports.objectConfigurationTest = exports.objectHasAdditionalProperties = exports.isUndefined = exports.stringLengthExceeds = exports.stringIsEmpty = exports.wrongType = exports.objectIsEmpty = exports.propertiesAreMissing = void 0;
const responseCodes_1 = require("../constants/responseCodes");
const propertyIsMissing = (property) => {
    return property == undefined;
};
const propertiesAreMissing = (...properties) => {
    return properties.some((prop) => propertyIsMissing(prop));
};
exports.propertiesAreMissing = propertiesAreMissing;
const objectIsEmpty = (obj) => {
    return Object.keys(obj).length === 0;
};
exports.objectIsEmpty = objectIsEmpty;
const wrongType = (property, type) => {
    return typeof property !== type;
};
exports.wrongType = wrongType;
const stringIsEmpty = (param) => {
    return param.trim().length === 0;
};
exports.stringIsEmpty = stringIsEmpty;
const stringLengthExceeds = (param, maxLength) => {
    return param.length > maxLength;
};
exports.stringLengthExceeds = stringLengthExceeds;
const isUndefined = (param) => {
    return param === undefined;
};
exports.isUndefined = isUndefined;
const objectHasAdditionalProperties = (obj, propertiesAmount) => {
    return Object.keys(obj).length > propertiesAmount;
};
exports.objectHasAdditionalProperties = objectHasAdditionalProperties;
const objectConfigurationTest = (body, amountOfProperties, ...propertiesList) => {
    if ((0, exports.objectIsEmpty)(body))
        return responseCodes_1.RESPONSE_CODES.BODY_IS_EMPTY;
    if ((0, exports.propertiesAreMissing)(...propertiesList))
        return responseCodes_1.RESPONSE_CODES.PROPERTY_IS_MISSING;
    if ((0, exports.objectHasAdditionalProperties)(body, amountOfProperties))
        return responseCodes_1.RESPONSE_CODES.BODY_HAS_ADDITIONAL_PROPERTIES;
    return responseCodes_1.RESPONSE_CODES.VALIDATION_SUCCESS;
};
exports.objectConfigurationTest = objectConfigurationTest;
const stringIsIncorrect = (property, maxLength) => {
    return ((0, exports.wrongType)(property, "string") ||
        (0, exports.stringIsEmpty)(property) ||
        (0, exports.stringLengthExceeds)(property, maxLength));
};
exports.stringIsIncorrect = stringIsIncorrect;
