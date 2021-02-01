import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";

import { Roll, RollModel } from "../models/roll-model";

class RollsController {
  getHandler: RequestHandler = (req, res, next) => {
    const rollID = req.params.rollID;

    if (rollID) {
      RollModel.findById(rollID)
        .then((roll: Roll) => res.status(200).json(roll))
        .catch((err: CallbackError) =>
          res.status(500).json({ error: `${err}` })
        );
    } else {
      RollModel.find()
        .then((rolls: Roll[]) => res.status(200).json(rolls))
        .catch((err: CallbackError) =>
          res.status(500).json({ error: `${err}` })
        );
    }
  };

  postHandler: RequestHandler = (req, res, next) => {
    const roll = new RollModel(req.body);
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      roll
        .save()
        .then((roll) => res.status(201).json(roll))
        .catch((err: CallbackError) => {
          res.status(500).json({ error: `${err}` });
        });
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
  };

  patchHandler: RequestHandler = (req, res, next) => {
    const rollID = { _id: req.params.rollID };
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      RollModel.findOneAndUpdate(rollID, req.body, {
        useFindAndModify: false,
      })
        .then(() => res.status(201).json({ ...rollID, ...req.body }))
        .catch((err: CallbackError) => {
          res.status(500).json({ error: `${err}` });
        });
    } else {
      return res.status(422).json({ errors: errors.array() });
    }
  };
}

export default new RollsController();
