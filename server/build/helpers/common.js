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
exports.handleDatabaseQuery = exports.getDataFromDatabase = void 0;
const database_1 = require("../config/database");
const statusCodes_1 = require("../constants/statusCodes");
const getDataFromDatabase = (options, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, errorCode, single } = options;
    try {
        const { rows } = yield (0, database_1.databaseQuery)(query);
        const data = single ? rows[0] : rows;
        res.status(statusCodes_1.STATUS_CODES.OK).send(data);
    }
    catch (error) {
        res.status(statusCodes_1.STATUS_CODES.ERROR).send(errorCode);
    }
});
exports.getDataFromDatabase = getDataFromDatabase;
const handleDatabaseQuery = (options, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { query, successCode, errorCode, successStatusCode, errorStatusCode } = options;
    try {
        yield (0, database_1.databaseQuery)(query);
        res.status(successStatusCode).send(successCode);
    }
    catch (error) {
        res.status(errorStatusCode).send(errorCode);
    }
});
exports.handleDatabaseQuery = handleDatabaseQuery;
