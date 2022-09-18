const inquirer = require("inquirer");
const fs = require("fs");
const questions = require("./src/questions");
const startHTML = require("./src/startHTML");
const endHTML = require("./src/endHTML");
const member = [];

function addTeam() {
    inquirer.prompt(questions)
        .then(function ({ name, role, id, email }) {
            let roleStatus = "";
            if (role === "Manager") {
                roleStatus = "office phone number";
            } else if (role === "Engineer") {
                roleStatus = "GitHub username";
            } else {
                roleStatus = "university name";
            }
            inquirer.prompt([{
                name: "roleStatus",
                message: `Enter team member's ${roleStatus}`
            },

            {
                name: "moreMembers",
                type: "rawlist",
                message: "Would you like to add additional team members?",
                choices: [
                    "yes",
                    "no"
                ]
            }
            ])
            .then(function({roleStatus, moreMembers}) {
                let newMember;
                if (role === "Manager") {
                    newMember = new Manager(name, id, email, roleStatus);
                } else if (role === "Engineer") {
                    newMember = new Engineer(name, id, email, roleStatus);
                } else {
                    newMember = new Intern(name, id, email, roleStatus);
                }
                member.push(newMember);
                console.log(newMember);
                genHtml(newMember)
                .then(function() {
                    if (moreMembers === "yes") {
                        addTeam();
                    } else {
                        endHTML();
                    }
                });
        })
            
        });
}

function beginHTML() {
    fs.writeFile("./dist/index.html", startHTML, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function finishHTML() {
    fs.appendFile("./dist/index.html", endHTML, function (err) {
        if (err) {
            console.log(err);
        };
    });
};


addTeam();
beginHTML();
finishHTML();