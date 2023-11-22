import logger from "../loggers/logger.winston";
import Employee, { EmployeeInterface } from "../models/employee.model";

export default class EmployeeService {
  public async getEmployees() {
    const employee: Employee[] = await Employee.findAll();
    return employee;
  }

  public async setUser(employeeInput: EmployeeInterface) {
    const c = new Employee(employeeInput);
    return await c.save();
  }
}
