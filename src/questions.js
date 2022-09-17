const questions =
[
    {
    name: "name",
    message: "Please enter your team member's name.",
    validate: nameInput => {
        if (nameInput) {
            return true;
        } else {
            console.log("Please enter the team member's name!");
            return false;
        }
    }
},
{
    name: "role",
    type: "list",
    message: "Please select the team member's role,",
    choices: ["Manager", "Engineer", "Intern"]
},
{
    name: "id",
    message: "Please enter the team member's ID number.",
    validate: idInput => {
        if (idInput) {
            return true;
        } else {
            console.log("Please enter the team member's ID number!");
            return false;
        }
    }
},
{
    name: "email",
    message: "Enter the team member's email address.",
    validate: emailInput => {
        if (emailInput) {
            return true;
        } else {
            console.log("Please enter the team member's email!");
            return false;
        }
    }
}]
    
module.exports = questions