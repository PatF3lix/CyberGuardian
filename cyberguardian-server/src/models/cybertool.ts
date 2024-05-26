import mongoose from "mongoose";

type CybertoolAttrs = {
  category: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
};

interface CybertoolDoc extends mongoose.Document {
  category: string;
  name: string;
  description: string;
  url: string;
  logo: string;
  image: string;
}

interface CybertoolModel extends mongoose.Model<CybertoolDoc> {
  build(attrs: CybertoolAttrs): CybertoolDoc;
}

const cyberToolSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    logo: { type: String },
    image: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

cyberToolSchema.statics.build = (attrs: CybertoolAttrs) => {
  return new CyberTool(attrs);
};

const CyberTool = mongoose.model("CyberTool", cyberToolSchema);

export default CyberTool;
