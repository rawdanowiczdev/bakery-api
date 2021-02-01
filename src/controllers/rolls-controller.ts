import { RequestHandler } from "express";
import { CallbackError } from "mongoose";

import { Roll, RollModel } from "../models/roll-model";

class RollsController {
  getHandler: RequestHandler = (req, res, next) => {
    RollModel.find((err: CallbackError, rolls: Roll[]) => {
      if (err) {
        res.status(500).json({ error: `${err}` });
      }

      res.status(200).json(rolls);
    });
  };

  postHandler: RequestHandler = (req, res, next) => {
    const roll = new RollModel(req.body);

    roll.save((err: CallbackError) => {
      if (err) {
        res.status(500).json({ error: `${err}` });
      }

      res.status(201).json(roll);
    });
  };
}

export default new RollsController();
