import { genSalt, hash, compare } from "bcrypt";

export default class Password {
  static saltRounds = 8;

  static async toHash(password: string) {
    const hashedPassword = await hash(password, this.saltRounds);
    return hashedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return compare(suppliedPassword, storedPassword);
  }
}
