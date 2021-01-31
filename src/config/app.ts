import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import breadsRoutes from "../routes/breads-routes";
import testRoutes from "../routes/test-routes";
import commonRoutes from "../routes/common-routes";

import dotenv from "dotenv";
dotenv.config();

class App {
  app = express();
  mongoDB = process.env.MONGODB_URI as string;

  constructor() {
    mongoose
      .connect(this.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("---Connected to MongoDB---"))
      .catch((err: Error) => console.log(err));
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      next();
    });
  }

  private routes(): void {
    this.app.use("/breads", breadsRoutes);
    this.app.use("/test", testRoutes);
    this.app.use("", commonRoutes);
  }
}

export default new App().app;
