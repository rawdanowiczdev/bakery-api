import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";
import jwt from "jsonwebtoken";
import bcryt from "bcrypt";

import { User, UserModel } from "../models/user-model";

class AuthController {
  signupHandler: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    const password = req.body.password;

    if (errors.isEmpty()) {
      bcryt
        .hash(password, 10)
        .then((hashedPass) => {
          const user = new UserModel({
            email: req.body.email,
            password: hashedPass,
          });
          return user.save();
        })
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
      return res.status(422).json({ errors: errors.array() });
    }
  };

  resendHandler: RequestHandler = (req, res, next) => {
    const errors = validationResult(req);
    let requestedUser: User;

    if (errors.isEmpty()) {
      UserModel.findOne({ email: req.body.email })
        .then((user: User) => {
          if (!user) {
            res.status(404).json({ error: "User not found." });
          } else {
            requestedUser = {
              _id: user._id,
              email: user.email,
              password: user.password,
            };
            return bcryt.compare(req.body.password, user.password);
          }
        })
        .then((isAuth: boolean) => {
          if (isAuth) {
            const token = jwt.sign(
              { user: requestedUser },
              process.env.JWT_SECRET as string
            );

            res.status(201).json({
              message: "Signed up successfully.",
              user: requestedUser,
              token: token,
            });
          } else {
            res.status(401).json({ error: "Wrong password." });
          }
        })
        .catch((err: CallbackError) => {
          res.status(500).json({ error: err });
        });
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
  };
}

export default new AuthController();
