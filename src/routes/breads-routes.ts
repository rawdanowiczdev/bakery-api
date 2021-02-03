import { Router } from "express";
import { body, param } from "express-validator";

import { isAuth } from "../config/auth";
import breadsController from "../controllers/breads-controller";

class BreadsRoutes {
  router = Router();

  constructor() {
    this.get();
    this.post();
    this.patch();
    this.delete();
  }

  get(): void {
    this.router.get("/", breadsController.getHandler);
    this.router.get(
      "/:breadID",
      param("breadID").isLength({ min: 24, max: 24 }),
      breadsController.getHandler
    );
  }

  post(): void {
    this.router.post(
      "/",
      isAuth,
      body("name").trim().isLength({ min: 3, max: 30 }),
      body("description").trim().isLength({ min: 5, max: 500 }),
      body("grains").isArray({ min: 1, max: 10 }),
      body("imageURL").isURL({ protocols: ["https"] }),
      breadsController.postHandler
    );
  }

  patch(): void {
    this.router.patch(
      "/:breadID",
      isAuth,
      param("breadID").isLength({ min: 24, max: 24 }),
      body("name").trim().isLength({ min: 3, max: 30 }).optional(),
      body("description").trim().isLength({ min: 5, max: 500 }).optional(),
      body("grains").isArray({ min: 1, max: 10 }).optional(),
      body("imageURL")
        .isURL({ protocols: ["https"] })
        .optional(),
      breadsController.patchHandler
    );
  }

  delete(): void {
    this.router.delete(
      "/:breadID",
      isAuth,
      param("breadID").isLength({ min: 24, max: 24 }),
      breadsController.deleteHandler
    );
  }
}

export default new BreadsRoutes().router;
