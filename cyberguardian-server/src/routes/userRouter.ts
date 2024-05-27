import express, { Request, Response } from "express";
import { User } from "../models/user";
import { validateSignUp } from "../middlewares/validateSignUp";
import { validateSignIn } from "../middlewares/validateSignIn";
import { Password } from "../services/Password";
import jwt from "jsonwebtoken";

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
    // Verify if the email is already used for another account
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Email is already in use" }] });
    }

    // Hash the password
    const hashedPassword = await Password.toHash(password);

    // Create and save new user to db
    const user = new User({ username, email, password: hashedPassword });
    const newUser = await user.save();

    // Generate JWT
    const userJwt = generateToken({ id: newUser.id, email: newUser.email });

    // Send the token and the user information to the client
    res.status(201).send({ user: newUser, token: userJwt });
  } catch (err) {
    res.status(500).send({ errors: [{ msg: "Server error" }] });
  }
});

router.post("/signIn", validateSignIn, async (req: Request, res: Response) => {
  //extract user information
  const { email, password } = req.body;

  try {
    //Search for existing user with entered email
    const existingUser = await User.findOne({ email });

    //return error if
    if (!existingUser) {
      return res.status(400).send({ errors: [{ msg: "Invalid credentials" }] });
    }

    const isPasswordCorrect = await Password.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.status(400).send({
        errors: [{ msg: "Invalid credentials" }],
      });
    }

    // Generate JWT
    const userJwt = generateToken({
      id: existingUser.id,
      email: existingUser.email,
    });

    // Send the token to the client
    res.status(200).send({ token: userJwt });
  } catch (err) {
    res.status(500).send({ errors: [{ msg: "Server error" }] });
  }
});

export { router as usersRouter };
