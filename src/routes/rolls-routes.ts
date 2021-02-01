import { Router } from "express";
import { body } from "express-validator";

import rollsController from "../controllers/rolls-controller";

class RollsRoutes {
  router = Router();

  constructor() {
    this.get();
    this.post();
    this.patch();
    this.delete();
  }

  get(): void {
    this.router.get("/", rollsController.getHandler);
    this.router.get("/:rollID", rollsController.getHandler);
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

  patch(): void {
    this.router.patch(
      "/:rollID",
      body("name").trim().isLength({ min: 3, max: 30 }).optional(),
      body("description").trim().isLength({ min: 5, max: 500 }).optional(),
      body("imageURL")
        .isURL({ protocols: ["https"] })
        .optional(),
      rollsController.patchHandler
    );
  }

  delete(): void {
    this.router.delete("/:rollID", rollsController.deleteHandler);
  }
}

export default new RollsRoutes().router;
