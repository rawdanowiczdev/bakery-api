import express from "express";

import testController from "../controllers/test-controller";

class TestRoutes {
  router = express.Router();

  constructor() {
    this.get();
    this.post();
  }

  get(): void {
    this.router.get("/", testController.getHandler);
  }

  post(): void {
    this.router.post("/", testController.postHandler);
  }
}

export default new TestRoutes().router;
