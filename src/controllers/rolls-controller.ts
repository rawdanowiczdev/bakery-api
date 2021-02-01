import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CallbackError } from "mongoose";

import { Roll, RollModel } from "../models/roll-model";

class RollsController {
  getHandler: RequestHandler = (req, res, next) => {
    const rollID = req.params.rollID;

    if (rollID) {
      RollModel.findById(rollID, (err: CallbackError, roll: Roll) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        }

        res.status(200).json(roll);
      });
    } else {
      RollModel.find((err: CallbackError, rolls: Roll[]) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        }

        res.status(200).json(rolls);
      });
    }
  };

  postHandler: RequestHandler = (req, res, next) => {
    const roll = new RollModel(req.body);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    roll.save((err: CallbackError) => {
      if (err) {
        res.status(500).json({ error: `${err}` });
      }

      res.status(201).json(roll);
    });
  };
}

export default new RollsController();
