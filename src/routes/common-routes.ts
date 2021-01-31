import { Router } from "express";

import commonController from "../controllers/common-controller";

class CommonRoutes {
  router = Router();

  constructor() {
    this.notFound();
  }

  notFound(): void {
    this.router.all("*", commonController.notFoundHandler);
  }
}

export default new CommonRoutes().router;
