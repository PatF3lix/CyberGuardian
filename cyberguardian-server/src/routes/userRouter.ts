import express, { Request, Response } from "express";
import { User } from "../models/user";
import { validateSignUp } from "../middlewares/validateSignUp";
import { validateSignIn } from "../middlewares/validateSignIn";
import { Password } from "../services/Password";
import jwt from "jsonwebtoken";
import { DatabaseConnectionError } from "../errors/databaseConnectionError";
import mongoose from "mongoose";
import { AuthenticationError } from "../errors/authenticationError";

const router = express.Router();

const generateToken = (user: { id: string; email: string }) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_KEY!,
    {
      expiresIn: "1h",
    }
  );
};

router.post("/signUp", validateSignUp, async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new AuthenticationError("Email is already in use");
    }

    const hashedPassword = await Password.toHash(password);

    const user = new User({ username, email, password: hashedPassword });
    const newUser = await user.save();

    const userJwt = generateToken({ id: newUser.id, email: newUser.email });

    res.status(201).send({ user: newUser, token: userJwt });
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw new DatabaseConnectionError();
    }
    throw err;
  }
});

router.post("/signIn", validateSignIn, async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new AuthenticationError("Invalid credentials");
    }

    const isPasswordCorrect = await Password.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      throw new AuthenticationError("Invalid credentials");
    }

    const userJwt = generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });

    res.status(200).send({ token: userJwt });
  } catch (err) {
    if (err instanceof mongoose.Error) {
      throw new DatabaseConnectionError();
    }
    throw err;
  }
});

export { router as usersRouter };
