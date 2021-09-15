"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transformRows = (rows) => {
    return rows.map((row) => row.name);
};
exports.default = transformRows;
