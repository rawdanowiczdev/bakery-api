import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";
import jwt from "jsonwebtoken";

import { UserModel } from "../models/user-model";

class AuthController {
  signupHandler: RequestHandler = (req, res, next) => {
    const user = new UserModel(req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      user
        .save()
        .then((user) => {
          const token = jwt.sign({ user }, process.env.JWT_SECRET as string);

          res.status(201).json({
            message: "Signed up successfully.",
            user: user,
            token: token,
          });
        })
        .catch((err: CallbackError) => {
          res.status(500).json({ error: err });
        });
    } else {
      return res.status(422).json({ errors: errors });
    }
  };
}

export default new AuthController();
