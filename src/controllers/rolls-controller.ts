import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";

import { Roll, RollModel } from "../models/roll-model";

class RollsController {
  getHandler: RequestHandler = (req, res, next) => {
    const rollID = req.params.rollID;

    if (rollID) {
      RollModel.findById(rollID)
        .then((roll: Roll) => {
          if (roll) {
            res.status(200).json(roll);
          } else {
            res.status(404).json({ error: "Object doesn't exist.", rollID });
          }
        })
        .catch((err: CallbackError) => res.status(500).json({ error: err }));
    } else {
      RollModel.find()
        .then((rolls: Roll[]) => res.status(200).json(rolls))
        .catch((err: CallbackError) => res.status(500).json({ error: err }));
    }
  };

  postHandler: RequestHandler = (req, res, next) => {
    const roll = new RollModel({ ...req.body, creator: req.params.userID });
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      roll
        .save()
        .then((roll) =>
          res.status(201).json({ message: "Created successfully.", roll })
        )
        .catch((err: CallbackError) => {
          res.status(500).json({ error: err });
        });
    }
  };

  patchHandler: RequestHandler = (req, res, next) => {
    const rollID = { _id: req.params.rollID };
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      RollModel.findOne(rollID).then((roll: Roll) => {
        if (!roll) {
          res.status(404).json({ error: "Object doesn't exist.", ...rollID });
        } else {
          if (roll.creator !== req.params.userID) {
            res.status(403).json({
              error: "You are not allowed to modify objects of other creators.",
            });
          } else {
            RollModel.findOneAndUpdate(rollID, req.body, {
              useFindAndModify: false,
            })
              .then(() => {
                res.status(201).json({
                  message: "Updated successfully.",
                  ...rollID,
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
    const rollID = { _id: req.params.rollID };
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
    } else {
      RollModel.findOne(rollID).then((roll: Roll) => {
        if (!roll) {
          res.status(404).json({ error: "Object doesn't exist.", ...rollID });
        } else {
          if (roll.creator !== req.params.userID) {
            res.status(403).json({
              error: "You are not allowed to modify objects of other creators.",
            });
          } else {
            RollModel.findByIdAndDelete(rollID)
              .then(() => {
                res
                  .status(200)
                  .json({ message: "Deleted successfully.", ...rollID });
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

export default new RollsController();
