import { NextFunction, Request, Response } from "express";
import EmployeeService from "../../service/employee.service";

const employeeService = new EmployeeService();
export class EmployeeController {
  public async getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await employeeService.getEmployees();
      return res
        .status(200)
        .json({ data: data, message: "Successfully got all the employees" });
    } catch (error) {
      next(error);
    }
  }

  public async setEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, age } = req.body;
      const data = await employeeService.setUser({ name, age });
      return res
        .status(200)
        .json({ data, message: "Successfully Inserted the employee" });
    } catch (error) {
      next(error);
    }
  }
}
