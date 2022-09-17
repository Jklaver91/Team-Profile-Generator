const Member = require("../lib/Member");

describe("Member", () => {
    //Arrange
    it("should create an instance of a Member object.", () => {
    
    //Act 
    const mem = new Member();
    
    //Assert
    expect(typeof(mem)).toBe("object");
    });
});