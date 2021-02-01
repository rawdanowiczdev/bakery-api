import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";

import { Bread, BreadModel } from "../models/bread-model";

class BreadsController {
  getHandler: RequestHandler = (req, res, next) => {
    const breadID = req.params.breadID;

    if (breadID) {
      BreadModel.findById(breadID, (err: CallbackError, bread: Bread) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        }

        res.status(200).json(bread);
      });
    } else {
      BreadModel.find((err: CallbackError, breads: Bread[]) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        }

        res.status(200).json(breads);
      });
    }
  };

  postHandler: RequestHandler = (req, res, next) => {
    const bread = new BreadModel(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    bread.save((err: CallbackError) => {
      if (err) {
        res.status(500).json({ error: `${err}` });
      }

      res.status(201).json(bread);
    });
  };
}

export default new BreadsController();
