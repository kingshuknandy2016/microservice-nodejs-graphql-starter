import { Router, Request, Response } from "express";
import controller from "../../controller";

export class EmployeeRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.setRoutes();
  }

  public setRoutes() {
    this.router.get("/getEmployeeBasic", (req: Request, res: Response) => {
      res.status(200).json({
        message: "Received the Employee Details",
        users: [
          { name: "Ram", age: 23 },
          { name: "Tittoo", age: 42 },
        ],
      });
    });

    const employeeController = new controller.v1.EmployeeController();
    this.router.get("/getEmployees", employeeController.getEmployees);
    this.router.post("/setEmployee", employeeController.setEmployee);
  }
}
