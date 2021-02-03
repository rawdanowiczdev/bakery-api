import { Router } from "express";
import { body } from "express-validator";

import authController from "../controllers/auth-controller";
import { User, UserModel } from "../models/user-model";

class AuthRoutes {
  router = Router();

  constructor() {
    this.signup();
  }

  signup(): void {
    this.router.post(
      "/signup",
      body("email")
        .isEmail()
        .custom((value) => {
          return UserModel.findOne({ email: value }).then((user: User) => {
            if (user) {
              throw new Error("This email already exists.");
            }
          });
        }),
      authController.signupHandler
    );
  }
}

export default new AuthRoutes().router;
