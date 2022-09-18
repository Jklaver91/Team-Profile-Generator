const inquirer = require("inquirer");
const fs = require("fs");
const questions = require("./src/questions");
const startHTML = require("./src/startHTML");
const endHTML = require("./src/endHTML");
const member = [];
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

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
            }])
            .then(function({roleStatus, moreMembers}) {
                console.log(role);
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
                        finishHTML();
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

function genHtml(member){
    return new Promise(function(resolve, reject) {
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let data = "";
        if (role === "Manager") {
            const officePhone = member.getPhone();
            data = 
            `<div class="p-0 mx-3">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">Manager: ${name}</div>
                <div class="card-body">
                <p>ID: ${id}</p>
                <p>Email: ${email}</p>
                <p>Office Phone Number: ${officePhone}</p>
                </div>
            </div>
            </div>`;
        } 
        else if (role === "Engineer") {
            const github = member.getGithub();
            data = 
            `<div class="p-0 mx-3">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">Engineer: ${name}</div>
                <div class="card-body">
                <p>ID: ${id}</p>
                <p>Email: ${email}</p>
                <p>Github: ${github}</p>
                </div>
            </div>
            </div>`; 
    
        } 
        else {
            const university = member.getUniversity();
            data =  
            `<div class="p-0 mx-3">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">Intern: ${name}</div>
                <div class="card-body">
                <p>ID: ${id}</p>
                <p>Email: ${email}</p>
                <p>University: ${university}</p>
                </div>
            </div>
            </div>`
        }
        fs.appendFile("./dist/index.html", data, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}

beginHTML();
addTeam();