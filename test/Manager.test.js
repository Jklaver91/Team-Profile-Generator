const Manager = require("../lib/Manager");

test("Should set office number in the constructor", () => {
    const office = 100;
    const manTest = new Manager("TEST", 123, "email@mail.com", office);
    expect(manTest.officeNumber).toBe(office);
  });