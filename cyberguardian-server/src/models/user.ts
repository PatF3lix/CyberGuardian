import mongoose from "mongoose";
import { Password } from "../services/Password";

// defines the shape of the attributes required to create a new User
type UserAttrs = {
  username: string;
  email: string;
  password: string;
  //   cybertools: [];
};

// This is what a User document will look like in the database.
interface UserDoc extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  // cybertools: [];
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
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
  }
);

//This is a pre-save middleware function that hashes the password before saving the document,
//if the password field has been modified.
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

//It provides type safety and ensures that only the attributes defined
// in UserAttrs are used to create a new User.
userSchema.statics.build = function (attrs: UserAttrs) {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
