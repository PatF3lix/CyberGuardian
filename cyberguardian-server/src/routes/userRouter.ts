import express, { Request, Response } from "express";
import { User } from "../models/user";

const router = express.Router();

router.post("/signUp", async function (req: Request, res: Response) {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

export { router as usersRouter };
