import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

import breadsRoutes from "../routes/breads-routes";
import testRoutes from "../routes/test-routes";
import commonRoutes from "../routes/common-routes";

class App {
  app = express();
  mongoDB = process.env.MONGODB_URI as string;

  constructor() {
    mongoose
      .connect(this.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Connected to MongoDB"))
      .catch((err: Error) => console.log(err));
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use("/breads", breadsRoutes);
    this.app.use("/test", testRoutes);
    this.app.use("", commonRoutes);
  }
}

export default new App().app;
