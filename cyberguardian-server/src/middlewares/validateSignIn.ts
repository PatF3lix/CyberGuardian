import { Request, Response, NextFunction } from "express";
import { validationResult, body } from "express-validator";

export const validateSignIn = [
  body("email").isEmail().withMessage("Email must be valid"),
  body("password").isString().notEmpty().withMessage("Password is required"),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
];
