import { RequestHandler } from "express";

class CommonController {
  notFoundHandler: RequestHandler = (req, res, next) => {
    res.status(404).json({
      message: `The endpoint ${req.url} you requested does not exist.`,
    });
  };
}

export default new CommonController();
