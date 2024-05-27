import mongoose from "mongoose";
import { Password } from "../services/Password";

// Defines the shape of the attributes required to create a new User
interface UserAttrs {
  username: string;
  email: string;
  password: string;
}

// This is what a User document will look like in the database
interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      //^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$ is a regular expression (regex) pattern used to validate email addresses.
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save middleware to hash the password before saving the document
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// Static method to provide type safety and ensure only valid attributes are used to create a new User
userSchema.statics.build = function (attrs: UserAttrs) {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
