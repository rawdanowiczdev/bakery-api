import { RequestHandler } from "express";
import { CallbackError } from "mongoose";
import { Bread } from "../models/bread-model";

class BreadsController {
  getHandler: RequestHandler = (req, res, next) => {
    Bread.find((err: CallbackError, breads: string[]) => {
      if (err) {
        res.status(500).json({ error: `${err}` });
      }
      res.status(200).json(breads);
    });
  };

  postHandler: RequestHandler = (req, res, next) => {
    const bread = new Bread(req.body);

    bread.save((err: CallbackError) => {
      if (err) {
        res.status(500).json({ error: `${err}` });
      }
      res.status(201).json(bread);
    });
  };
}

export default new BreadsController();
