const inquirer = require("inquirer");
const fs = require("fs");

function addTeam() {
    inquirer.prompt([
        {
        name: "name",
        message: "Please enter your team member's name.",

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
    },
    {
        name: "email",
        message: "Enter the team member's email address.",
    }
    ])
}

addTeam();