import { RequestHandler } from "express";

class TestController {
  getHandler: RequestHandler = (req, res, next) => {
    res.status(200).json({ message: "Get test works." });
  };

  postHandler: RequestHandler = (req, res, next) => {
    res.status(200).json({ message: "Post test works." });
  };
}

export default new TestController();
