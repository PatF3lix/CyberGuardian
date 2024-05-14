import mongoose from "mongoose";

const cyberToolSchema = new mongoose.Schema({
  Category: { type: String, required: true },
  Name: { type: String, required: true },
  Description: { type: String, required: true },
  Url: { type: String, required: true },
  Logo: { type: String },
  Image: { type: String },
});

const CyberTool = mongoose.model("CyberTool", cyberToolSchema);

export default CyberTool;
