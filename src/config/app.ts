import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

import breadsRoutes from "../routes/breads-routes";
import rollsRoutes from "../routes/rolls-routes";
import commonRoutes from "../routes/common-routes";

class App {
  app = express();
  dotenv = config();
  mongoDB = process.env.MONGODB_URI as string;

  constructor() {
    this.database();
    this.config();
    this.routes();
  }

  private database(): void {
    mongoose
      .connect(this.mongoDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("> Connected to MongoDB"))
      .catch((err: Error) => console.log(err));
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization"
      );
      res.setHeader(
        "Access-Control-Allow-Methods",
        "OPTIONS, GET, POST, PATCH"
      );

      next();
    });
  }

  private routes(): void {
    this.app.use("/breads", breadsRoutes);
    this.app.use("/rolls", rollsRoutes);
    this.app.use("", commonRoutes);
  }
}

export default new App().app;
