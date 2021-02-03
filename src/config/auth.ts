import { RequestHandler } from "express";
import jtw from "jsonwebtoken";
import { User } from "../models/user-model";

export const isAuth: RequestHandler = (req, res, next) => {
  const authHeader = req.get("Authorization");
  let token: { user: User; iat: number } | any;

  if (authHeader) {
    try {
      token = jtw.verify(
        authHeader.split(" ")[1],
        process.env.JWT_SECRET as string
      );
    } catch (err) {
      res.status(401).json({ error: err });
    }

    if (token) {
      req.params.userID = token.user._id;
      next();
    }
  } else {
    res
      .status(401)
      .json({ error: "Missing authorization token. Signup to create one." });
  }
};
