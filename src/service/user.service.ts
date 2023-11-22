import logger from "../loggers/logger.winston";
import User, { UserInterface } from "../models/user.model";

export default class UserService {
  public async getUsers() {
    const users: User[] = await User.findAll();
    return users;
  }

  public async setUser(userInput: UserInterface) {
    const c = new User(userInput);
    return await c.save();
  }

  public async registerUser(userInput: UserInterface) {
    const user: User = new User(userInput);
    return await user.save();
  }

  public async findUserByEmail(email: string): Promise<User | null> {
    return await User.findOne({
      where: {
        email: email,
      },
    });
  }
}
