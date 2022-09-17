const Engineer = require("../lib/Engineer");

test("should set up github account in constructor", () => {
    const github = "github";
    const engTest = new Engineer("Foo", 1, "test@test.com", github);
    expect(engTest.github).toBe(github);
  });