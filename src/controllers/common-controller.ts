import { RequestHandler } from "express";

class CommonController {
  notFoundHandler: RequestHandler = (req, res, next) => {
    res.status(404).json({
      error: `Requested '${req.url}' endpoint doesn't exist.`,
    });
  };
}

export default new CommonController();
