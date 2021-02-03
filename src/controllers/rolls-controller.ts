import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";

import { Roll, RollModel } from "../models/roll-model";

class RollsController {
  getHandler: RequestHandler = (req, res, next) => {
    const rollID = req.params.rollID;

    if (rollID) {
      if (rollID.length === 24) {
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
        res.status(404).json({ error: "Incorrect id format." });
      }
    } else {
      RollModel.find()
        .then((rolls: Roll[]) => res.status(200).json(rolls))
        .catch((err: CallbackError) => res.status(500).json({ error: err }));
    }
  };

  postHandler: RequestHandler = (req, res, next) => {
    const roll = new RollModel({ ...req.body, creator: req.params.userID });
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      roll
        .save()
        .then((roll) =>
          res.status(201).json({ message: "Created successfully.", roll })
        )
        .catch((err: CallbackError) => {
          res.status(500).json({ error: err });
        });
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
  };

  patchHandler: RequestHandler = (req, res, next) => {
    const rollID = { _id: req.params.rollID };
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      if (rollID._id.length === 24) {
        RollModel.findOne(rollID).then((roll: Roll) => {
          if (roll) {
            if (roll.creator === req.params.userID) {
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
            } else {
              res.status(403).json({
                error:
                  "You are not allowed to modify objects of other creators.",
              });
            }
          } else {
            res.status(404).json({ error: "Object doesn't exist.", ...rollID });
          }
        });
      } else {
        res.status(404).json({ error: "Incorrect id format." });
      }
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
  };

  deleteHandler: RequestHandler = (req, res, next) => {
    const rollID = { _id: req.params.rollID };

    if (rollID._id.length === 24) {
      RollModel.findOne(rollID).then((roll: Roll) => {
        if (roll) {
          if (roll.creator === req.params.userID) {
            RollModel.findByIdAndDelete(rollID)
              .then(() => {
                res
                  .status(200)
                  .json({ message: "Deleted successfully.", ...rollID });
              })
              .catch((err: CallbackError) => {
                res.status(500).json({ error: err });
              });
          } else {
            res.status(403).json({
              error: "You are not allowed to modify objects of other creators.",
            });
          }
        } else {
          res.status(404).json({ error: "Object doesn't exist.", ...rollID });
        }
      });
    } else {
      res.status(404).json({ error: "Incorrect id format." });
    }
  };
}

export default new RollsController();
