import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";

import { Bread, BreadModel } from "../models/bread-model";

class BreadsController {
  getHandler: RequestHandler = (req, res, next) => {
    const breadID = req.params.breadID;

    if (breadID) {
      BreadModel.findById(breadID)
        .then((bread: Bread) => {
          if (bread) {
            res.status(200).json(bread);
          } else {
            res.status(404).json({ error: "Object doesn't exist.", breadID });
          }
        })
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

  patchHandler: RequestHandler = (req, res, next) => {
    const breadID = { _id: req.params.breadID };
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      BreadModel.findOneAndUpdate(breadID, req.body, {
        useFindAndModify: false,
      })
        .then(() => res.status(201).json({ ...breadID, ...req.body }))
        .catch((err: CallbackError) => {
          res.status(500).json({ error: `${err}` });
        });
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
  };

  deleteHandler: RequestHandler = (req, res, next) => {
    const breadID = { _id: req.params.breadID };

    BreadModel.findByIdAndDelete(breadID)
      .then((bread: Bread) => {
        if (bread) {
          res
            .status(200)
            .json({ message: "Deleted successfully.", ...breadID });
        } else {
          res.status(404).json({ error: "Object doesn't exist.", ...breadID });
        }
      })
      .catch((err: CallbackError) => {
        res.status(500).json({ error: `${err}` });
      });
  };
}

export default new BreadsController();
