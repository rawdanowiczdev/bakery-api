import { Router } from "express";
import { body } from "express-validator";

import breadsController from "../controllers/breads-controller";

class BreadsRoutes {
  router = Router();

  constructor() {
    this.get();
    this.post();
  }

  get(): void {
    this.router.get("/", breadsController.getHandler);
    this.router.get("/:breadID", breadsController.getHandler);
  }

  post(): void {
    this.router.post(
      "/",
      body("name").trim().isLength({ min: 3, max: 30 }),
      body("description").trim().isLength({ min: 5, max: 500 }),
      body("grains").isArray({ min: 1, max: 10 }),
      body("imageURL").isURL({ protocols: ["https"] }),
      breadsController.postHandler
    );
  }
}

export default new BreadsRoutes().router;
