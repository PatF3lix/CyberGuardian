"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const srcPath = path_1.default.resolve(__dirname, "../cybertools.csv"); // Adjust the path accordingly
const distPath = path_1.default.resolve(__dirname, "../dist/cybertools.csv"); // Adjust the path accordingly
fs_extra_1.default.copyFile(srcPath, distPath, (err) => {
    if (err) {
        console.error("Error copying CSV file:", err);
    }
    else {
        console.log("CSV file copied to dist directory");
    }
});
