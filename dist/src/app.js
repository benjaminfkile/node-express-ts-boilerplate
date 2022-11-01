"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const NODE_ENV = process.env.NODE_ENV;
const app = (0, express_1.default)();
const morganOption = (NODE_ENV === "production")
    ? "tiny"
    : "common";
app.use(morgan(morganOption));
app.use(cors());
app.use(helmet());
app.get("/", (req, res) => {
    res.send("Hello, ts!");
});
app.use(function errorHandler(error, req, res) {
    const response = { message: error.message, error };
    res.status(500).json(response);
});
module.exports = app;
