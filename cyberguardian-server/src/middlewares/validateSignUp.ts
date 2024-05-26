import { Request, Response, NextFunction } from "express";
import { validationResult, body } from "express-validator";

export const validateSignUp = [
  body("username").isString().notEmpty().withMessage("Username is required"),
  body("email").isEmail().notEmpty().withMessage("Email is required"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  async function (req: Request, res: Response, next: NextFunction) {
    //Check for validation erros
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }
    next();
  },
];
