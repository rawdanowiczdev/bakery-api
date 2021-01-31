import { Router } from "express";

import breadsController from "../controllers/breads-controller";

class BreadsRoutes {
  router = Router();

  constructor() {
    this.get();
    this.post();
  }

  get(): void {
    this.router.get("/", breadsController.getHandler);
  }

  post(): void {
    this.router.post("/", breadsController.postHandler);
  }
}

export default new BreadsRoutes().router;
