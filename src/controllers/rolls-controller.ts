import { RequestHandler } from "express";
import { CallbackError, ObjectId } from "mongoose";
import { Roll } from "../models/roll-model";

class RollsController {
  getHandler: RequestHandler = (req, res, next) => {
    Roll.find(
      (
        err: CallbackError,
        rolls: Array<{
          _id: ObjectId;
          name: string;
          description: string;
          imageURL: string;
        }>
      ) => {
        if (err) {
          res.status(500).json({ error: `${err}` });
        }

        res.status(200).json(rolls);
      }
    );
  };

  postHandler: RequestHandler = (req, res, next) => {
    const rolls = new Roll(req.body);

    rolls.save((err: CallbackError) => {
      if (err) {
        res.status(500).json({ error: `${err}` });
      }

      res.status(201).json(rolls);
    });
  };
}

export default new RollsController();
