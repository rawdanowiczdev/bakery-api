import { RequestHandler } from "express";

class CommonController {
  notFoundHandler: RequestHandler = (req, res, next) => {
    if (req.url !== "/") {
      res.status(404).json({
        error: `Requested '${req.url}' endpoint doesn't exist. Check URL or try different method.`,
      });
    }
    next();
  };

  baseRouteHandler: RequestHandler = (req, res, next) => {
    res.status(303).json({
      message: "This is bakery api. To learn more visit the docs.",
      docs: "https://github.com/rawdanowiczdev/bakery-api",
    });
  };
}

export default new CommonController();
