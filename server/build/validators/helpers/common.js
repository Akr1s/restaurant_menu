"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isntEmptyString = exports.isOfType = exports.exists = void 0;
const exists = (property) => {
    return property !== undefined;
};
exports.exists = exists;
const isOfType = (property, type) => {
    return typeof property === type;
};
exports.isOfType = isOfType;
const isntEmptyString = (property) => {
    return property.trim().length !== 0;
};
exports.isntEmptyString = isntEmptyString;
