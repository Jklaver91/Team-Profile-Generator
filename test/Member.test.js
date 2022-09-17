const Member = require("../lib/Member");

describe("Member", () => {
    //Arrange
    it("should create an instance of a Member object.", () => {
    
    //Act 
    const mem = new Member();
    
    //Assert
    expect(typeof(mem)).toBe("object");
    });
    
    //Arrange
    it("should set name from constructor", () => {
        const name = "NAME";
    //Act    
        const memName = new Member(name);
    //Assert
        expect(memName.name).toBe(name);
    });

    //Arrange
    it("should set id from constructor", () => {
        const id = 123;
    //Act    
        const memId = new Member("test", id);
    //Assert
        expect(memId.id).toBe(id);
    });
    
    //Arrange
    it("should set email from constructor", () => {
        const email = "test@test.com";
    //Act    
        const memEmail = new Member("TEST", 123, email);
    //Assert
        expect(memEmail.email).toBe(email);
    });
});