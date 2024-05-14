"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cyberToolSchema = new mongoose_1.default.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    logo: { type: String },
    image: { type: String },
});
const CyberTool = mongoose_1.default.model("CyberTool", cyberToolSchema);
exports.default = CyberTool;
