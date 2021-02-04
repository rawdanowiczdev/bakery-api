import { Router } from "express";
import { body } from "express-validator";

import authController from "../controllers/auth-controller";
import { User, UserModel } from "../models/user-model";

class AuthRoutes {
  router = Router();

  constructor() {
    this.signup();
    this.resend();
  }

  signup(): void {
    this.router.post(
      "/signup",
      body("email")
        .isEmail()
        .custom((value) => {
          return UserModel.findOne({ email: value }).then((user: User) => {
            if (user) {
              throw new Error("User already exists.");
            }
          });
        }),
      body("password").isLength({ min: 6, max: 20 }),
      authController.signupHandler
    );
  }

  resend(): void {
    this.router.post(
      "/resend",
      body("email")
        .isEmail()
        .custom((value) => {
          return UserModel.findOne({ email: value }).then((user: User) => {
            if (!user) {
              throw new Error("User doesn't exists.");
            }
          });
        }),
      body("password").isLength({ min: 6, max: 20 }),
      authController.resendHandler
    );
  }
}

export default new AuthRoutes().router;
