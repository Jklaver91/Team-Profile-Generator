const Intern = require("../lib/Intern");

test("Should set University name in the constructor", () => {
    const university = "University";
    const intTest = new Intern("TEST", 123, "email@mail.com", university);
    expect(intTest.university).toBe(university);
  });