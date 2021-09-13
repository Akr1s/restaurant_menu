"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDataFromDatabase = exports.updateDataInDatabase = exports.addDataToDatabase = exports.getDataFromDatabase = void 0;
const database_1 = require("../config/database");
const statusCodes_1 = require("../constants/statusCodes");
const getDataFromDatabase = (options, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, errorMessage, single } = options;
    try {
        const { rows } = yield (0, database_1.databaseQuery)(query);
        const data = single ? rows[0] : rows;
        res.status(statusCodes_1.STATUS_CODES.OK).send(data);
    }
    catch (error) {
        res
            .status(statusCodes_1.STATUS_CODES.ERROR)
            .send({ message: errorMessage, info: error.message });
    }
});
exports.getDataFromDatabase = getDataFromDatabase;
const addDataToDatabase = (options, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, successMessage, errorMessage } = options;
    try {
        const { rows } = yield (0, database_1.databaseQuery)(query);
        res.status(statusCodes_1.STATUS_CODES.CREATED).send({ message: successMessage });
    }
    catch (error) {
        res
            .status(statusCodes_1.STATUS_CODES.ERROR)
            .send({ message: errorMessage, info: error.message, stack: error.stack });
    }
});
exports.addDataToDatabase = addDataToDatabase;
const updateDataInDatabase = (options, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, successMessage, errorMessage } = options;
    try {
        const { rows } = yield (0, database_1.databaseQuery)(query);
        res.status(statusCodes_1.STATUS_CODES.OK).send({ message: successMessage });
    }
    catch (error) {
        res
            .status(statusCodes_1.STATUS_CODES.ERROR)
            .send({ message: errorMessage, info: error.message });
    }
});
exports.updateDataInDatabase = updateDataInDatabase;
const deleteDataFromDatabase = (options, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, successMessage, errorMessage } = options;
    try {
        const { rows } = yield (0, database_1.databaseQuery)(query);
        res.status(statusCodes_1.STATUS_CODES.OK).send({ message: successMessage });
    }
    catch (error) {
        res
            .status(statusCodes_1.STATUS_CODES.ERROR)
            .send({ message: errorMessage, info: error.message });
    }
});
exports.deleteDataFromDatabase = deleteDataFromDatabase;
