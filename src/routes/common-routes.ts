import { Router } from "express";

import commonController from "../controllers/common-controller";

class CommonRoutes {
  router = Router();

  constructor() {
    this.notFound();
    this.baseRoute();
  }

  notFound(): void {
    this.router.all("*", commonController.notFoundHandler);
  }

  baseRoute(): void {
    this.router.get("", commonController.baseRouteHandler);
  }
}

export default new CommonRoutes().router;
