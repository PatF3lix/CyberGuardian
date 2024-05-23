import mongoose from "mongoose";

const cyberToolSchema = new mongoose.Schema({
  category: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  url: { type: String, required: true },
  logo: { type: String },
  image: { type: String },
});

const CyberTool = mongoose.model("CyberTool", cyberToolSchema);

export default CyberTool;
