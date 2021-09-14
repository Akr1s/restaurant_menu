"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectHasAdditionalProperties = exports.isUndefined = exports.stringLengthEsceeds = exports.stringIsEmpty = exports.wrongType = exports.objectIsEmpty = exports.propertiesAreMissing = void 0;
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
const stringLengthEsceeds = (param, maxLength) => {
    return param.length > maxLength;
};
exports.stringLengthEsceeds = stringLengthEsceeds;
const isUndefined = (param) => {
    return param === undefined;
};
exports.isUndefined = isUndefined;
const objectHasAdditionalProperties = (obj, propertiesAmount) => {
    return Object.keys(obj).length > propertiesAmount;
};
exports.objectHasAdditionalProperties = objectHasAdditionalProperties;
