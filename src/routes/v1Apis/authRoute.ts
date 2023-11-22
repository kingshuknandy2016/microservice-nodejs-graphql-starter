import { Router, Request, Response } from "express";
import controller from "../../controller";

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  public setRoutes() {
    this.router.get("/getUsersBasic", (req: Request, res: Response) => {
      res.status(200).json({
        message: "Received the User Details",
        users: [
          { name: "Ram", age: 23 },
          { name: "Tittoo", age: 42 },
        ],
      });
    });

    const authController = new controller.v1.AuthController();

    this.router.post("/signUp", authController.signUp);
    this.router.post("/login", authController.login);
  }
}
