import express from "express";
import bodyParser from "body-parser";

import testRoutes from "../routes/test-routes";
import commonRoutes from "../routes/common-routes";

class App {
  app = express();

  constructor() {
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/test", testRoutes);
    this.app.use("", commonRoutes);
  }
}

export default new App().app;
