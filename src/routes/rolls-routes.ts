import { Router } from "express";
import { body, param } from "express-validator";

import { isAuth } from "../config/auth";
import { CollectionController } from "../controllers/collection-controller";

class RollsRoutes {
  router = Router();
  collection = new CollectionController("rolls");

  constructor() {
    this.get();
    this.post();
    this.patch();
    this.delete();
  }

  get(): void {
    this.router.get("/", this.collection.getHandler);
    this.router.get(
      "/:itemID",
      param("itemID").isLength({ min: 24, max: 24 }),
      this.collection.getHandler
    );
  }

  post(): void {
    this.router.post(
      "/",
      isAuth,
      body("name").trim().isLength({ min: 3, max: 30 }),
      body("description").trim().isLength({ min: 5, max: 500 }),
      body("imageURL").isURL({ protocols: ["https"] }),
      this.collection.postHandler
    );
  }

  patch(): void {
    this.router.patch(
      "/:itemID",
      isAuth,
      param("itemID").isLength({ min: 24, max: 24 }),
      body("name").trim().isLength({ min: 3, max: 30 }).optional(),
      body("description").trim().isLength({ min: 5, max: 500 }).optional(),
      body("imageURL")
        .isURL({ protocols: ["https"] })
        .optional(),
      this.collection.patchHandler
    );
  }

  delete(): void {
    this.router.delete(
      "/:itemID",
      isAuth,
      param("itemID").isLength({ min: 24, max: 24 }),
      this.collection.deleteHandler
    );
  }
}

export default new RollsRoutes().router;
