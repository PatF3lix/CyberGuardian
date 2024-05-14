"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
const port = 4000;
app.get("/", (req, res) => {
    res.send("Hello, World!");
});
mongoose_1.default
    .connect("mongodb://db/cyberGuardian")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("Could not connect to MongoDB:", err));
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
