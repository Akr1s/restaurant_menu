"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notUndefined = exports.stringLengthDoesNotEsceed = exports.isntEmptyString = exports.isOfType = exports.objectPropertiesExist = exports.propertyExists = void 0;
const propertyExists = (property) => {
    return property != undefined;
};
exports.propertyExists = propertyExists;
const objectPropertiesExist = (obj) => {
    return Object.keys(obj).length > 0;
};
exports.objectPropertiesExist = objectPropertiesExist;
const isOfType = (property, type) => {
    return typeof property === type;
};
exports.isOfType = isOfType;
const isntEmptyString = (param) => {
    return param.trim().length !== 0;
};
exports.isntEmptyString = isntEmptyString;
const stringLengthDoesNotEsceed = (param, maxLength) => {
    return param.length <= maxLength;
};
exports.stringLengthDoesNotEsceed = stringLengthDoesNotEsceed;
const notUndefined = (param) => {
    return param !== undefined;
};
exports.notUndefined = notUndefined;
