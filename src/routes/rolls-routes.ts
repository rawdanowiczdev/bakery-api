import { Router } from "express";
import { body } from "express-validator";

import rollsController from "../controllers/rolls-controller";

class RollsRoutes {
  router = Router();

  constructor() {
    this.get();
    this.post();
  }

  get(): void {
    this.router.get("/", rollsController.getHandler);
  }

  post(): void {
    this.router.post(
      "/",
      body("name").trim().isLength({ min: 3, max: 30 }),
      body("description").trim().isLength({ min: 5, max: 500 }),
      body("imageURL").isURL({ protocols: ["https"] }),
      rollsController.postHandler
    );
  }
}

export default new RollsRoutes().router;
