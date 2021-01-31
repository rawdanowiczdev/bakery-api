import { Router } from "express";

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
    this.router.post("/", rollsController.postHandler);
  }
}

export default new RollsRoutes().router;
