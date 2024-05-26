import express, { Request, Response } from "express";
import { User } from "../models/user";
import { validateSignUp } from "../middlewares/validateSignUp";
import { Password } from "../services/Password";

const router = express.Router();

router.post(
  "/signUp",
  validateSignUp,
  async function (req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
      //verify if the email is already used for another account
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .send({ errors: [{ msg: "Email is already in use" }] });
      }

      //hash the password
      const hashedPassword = await Password.toHash(password);

      //create and save new user to db
      const user = new User({ username, email, password: hashedPassword });
      const newUser = await user.save();

      res.status(201).send(newUser);
    } catch (err) {
      res.status(500).send({ errors: [{ msg: "Server error" }] });
    }
  }
);

export { router as usersRouter };
