import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";

import { Bread, BreadModel } from "../models/bread-model";

class BreadsController {
  getHandler: RequestHandler = (req, res, next) => {
    const breadID = req.params.breadID;

    if (breadID) {
      BreadModel.findById(breadID)
        .then((bread: Bread) => res.status(200).json(bread))
        .catch((err: CallbackError) =>
          res.status(500).json({ error: `${err}` })
        );
    } else {
      BreadModel.find()
        .then((breads: Bread[]) => res.status(200).json(breads))
        .catch((err: CallbackError) =>
          res.status(500).json({ error: `${err}` })
        );
    }
  };

  postHandler: RequestHandler = (req, res, next) => {
    const bread = new BreadModel(req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      bread
        .save()
        .then((bread) => res.status(201).json(bread))
        .catch((err: CallbackError) => {
          res.status(500).json({ error: `${err}` });
        });
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
  };
}

export default new BreadsController();
