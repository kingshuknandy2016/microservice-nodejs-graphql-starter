import Password from "../../../src/helpers/password";

describe("Validate the Password Functionality", () => {
  it("Should be true if registered and login password is same", async () => {
    const mockPassword = "test1234";

    const hashedPassword = await Password.toHash(mockPassword);

    const result = await Password.compare(hashedPassword, mockPassword);
    expect(result).toBe(true);
  });
  it("Should be false if registered and login password is different", async () => {
    const mockRegisterPassword = "test1234";
    const mockLoginPassword = "test12345";
    const hashedPassword = await Password.toHash(mockRegisterPassword);
    const result = await Password.compare(hashedPassword, mockLoginPassword);
    expect(result).toBe(false);
    console.log(result);
  });
});
