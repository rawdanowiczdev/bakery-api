import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError, Model } from "mongoose";

import { Bread, BreadModel } from "../models/bread-model";
import { Roll, RollModel } from "../models/roll-model";

export class CollectionController {
  model!: Model<any>;

  constructor(requestedModel: "breads" | "rolls") {
    if (requestedModel === "breads") {
      this.model = BreadModel;
    }
    if (requestedModel === "rolls") {
      this.model = RollModel;
    }
  }

  getHandler: RequestHandler = (req, res, next) => {
    const itemID = req.params.itemID;

    if (itemID) {
      this.model
        .findById(itemID)
        .then((item: Bread | Roll) => {
          if (item) {
            res.status(200).json(item);
          } else {
            res.status(404).json({ error: "Object doesn't exist.", itemID });
          }
        })
        .catch((err: CallbackError) => res.status(500).json({ error: err }));
    } else {
      this.model
        .find()
        .then((items: Bread[] | Roll[]) => res.status(200).json(items))
        .catch((err: CallbackError) => res.status(500).json({ error: err }));
    }
  };

  postHandler: RequestHandler = (req, res, next) => {
    const item = new this.model({
      ...req.body,
      creator: req.params.userID,
    });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      item
        .save()
        .then((item: Bread | Roll) =>
          res.status(201).json({ message: "Created successfully.", item })
        )
        .catch((err: CallbackError) => {
          res.status(500).json({ error: err });
        });
    }
  };

  patchHandler: RequestHandler = (req, res, next) => {
    const itemID = { _id: req.params.itemID };
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      this.model.findOne(itemID).then((item: Bread | Roll) => {
        if (!item) {
          res.status(404).json({ error: "Object doesn't exist.", ...itemID });
        } else {
          if (item.creator !== req.params.userID) {
            res.status(403).json({
              error: "You are not allowed to modify objects of other creators.",
            });
          } else {
            this.model
              .findOneAndUpdate(itemID, req.body, {
                useFindAndModify: false,
              })
              .then(() => {
                res.status(201).json({
                  message: "Updated successfully.",
                  ...itemID,
                  ...req.body,
                });
              })
              .catch((err: CallbackError) => {
                res.status(500).json({ error: err });
              });
          }
        }
      });
    }
  };

  deleteHandler: RequestHandler = (req, res, next) => {
    const itemID = { _id: req.params.itemID };
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      this.model.findOne(itemID).then((item: Bread | Roll) => {
        if (!item) {
          res.status(404).json({ error: "Object doesn't exist.", ...itemID });
        } else {
          if (item.creator !== req.params.userID) {
            res.status(403).json({
              error: "You are not allowed to modify objects of other creators.",
            });
          } else {
            this.model
              .findByIdAndDelete(itemID)
              .then(() => {
                res
                  .status(200)
                  .json({ message: "Deleted successfully.", ...itemID });
              })
              .catch((err: CallbackError) => {
                res.status(500).json({ error: err });
              });
          }
        }
      });
    }
  };
}
