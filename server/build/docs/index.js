"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yaml = require("js-yaml");
const fs = require("fs");
const util = require("util");
const path = require("path");
const DEBUG = false;
const OPENAPI_VER = "3.0.3";
const FILES_ENCODING = "utf8";
function compileFinal() {
    const meta = loadSpecs("meta");
    const servers = Object.entries(meta.servers).map(([, v]) => v);
    const tags = Object.entries(meta.tags).map(([, v]) => v);
    const pathsRaw = loadSpecs("routes");
    const schemas = loadSpecs("components/schemas");
    const responses = loadSpecs("components/responses");
    const parameters = loadSpecs("components/parameters");
    let paths = {};
    for (const key in pathsRaw) {
        if (pathsRaw.hasOwnProperty(key)) {
            paths = Object.assign(Object.assign({}, paths), pathsRaw[key]);
        }
    }
    return {
        openapi: OPENAPI_VER,
        info: Object.assign({}, meta.info),
        servers: servers,
        tags: tags,
        paths: paths,
        components: {
            schemas,
            responses,
            parameters,
        },
    };
}
function loadSpecs(folder) {
    const targetPath = path.join(__dirname, folder);
    const filenames = fs.readdirSync(targetPath);
    let container = {};
    filenames.forEach((fn) => {
        try {
            const filename = path.join(__dirname, folder, fn);
            const content = fs.readFileSync(filename, FILES_ENCODING);
            const doc = yaml.load(content, { schema: yaml.JSON_SCHEMA, json: true }) || {};
            container = Object.assign(Object.assign({}, container), doc);
            if (DEBUG) {
                console.log(fn, ": ", util.inspect(doc, false, 5, true));
            }
        }
        catch (e) {
            console.log(e);
        }
    });
    return container;
}
// main
const finalDefinition = compileFinal();
const apis = [];
const options = {
    explorer: true,
};
if (DEBUG) {
    console.log(util.inspect(finalDefinition, false, 5, true));
}
exports.default = { definition: finalDefinition, apis: apis, options };
