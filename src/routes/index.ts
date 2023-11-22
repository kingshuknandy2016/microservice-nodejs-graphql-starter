import express, { Router } from "express";
import { APISRouter } from "./v1Apis";

export class IndexRouter {
  public router: Router;

  constructor() {
    this.router = express.Router();
    this.setRoutes();
  }

  public getRouter(): Router {
    return this.router;
  }
  public setRoutes() {
    this.router.use("/apis", new APISRouter().router);
  }
}
