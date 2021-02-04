import { RequestHandler } from "express";
import jtw from "jsonwebtoken";
import { CallbackError } from "mongoose";

import { User, UserModel } from "../models/user-model";

export const isAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.get("Authorization");
  let token: { user: User; iat: number } | any;

  if (authHeader) {
    try {
      token = jtw.verify(
        authHeader.split(" ")[1],
        process.env.JWT_SECRET as string
      );

      const { _id } = token.user;
      UserModel.findById(_id)
        .then((user: User) => {
          if (user) {
            req.params.userID = _id;
            next();
          } else {
            res.status(401).json({ error: "Invalid token." });
          }
        })
        .catch((err: CallbackError) => res.status(500).json({ error: err }));
    } catch (err) {
      res.status(401).json({ error: err });
    }
  } else {
    res.status(401).json({ error: "Missing authorization token." });
  }
};
