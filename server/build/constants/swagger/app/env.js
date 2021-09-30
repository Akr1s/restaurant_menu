"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const { NODE_ENV, APP_SERVER_PORT } = process.env;
exports.ENV = {
    APP: {
        NODE_ENV: NODE_ENV,
        SERVER_PORT: APP_SERVER_PORT !== null && APP_SERVER_PORT !== void 0 ? APP_SERVER_PORT : 3001,
    },
};
