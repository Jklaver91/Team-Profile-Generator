const inquirer = require("inquirer");
const fs = require("fs");
const questions = require("./src/questions");
const startHTML = require("./src/startHTML");
const endHTML = require("./src/endHTML");
const member = [];
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");


//prompts the shared questions for the roles before searching for the role and asking the appropriate questions
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
// prompt to add more users to the team
            {
                name: "moreMembers",
                type: "rawlist",
                message: "Would you like to add additional team members?",
                choices: [
                    "yes",
                    "no"
                ]
            }])
// creates a new object to avoid writing over old object
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
//generates card for the new object.
                genHtml(newMember)
//if the team prompt was ya run entire function again, if no run the end html function.
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

//function to write our starting html.
function beginHTML() {
    fs.writeFile("./dist/index.html", startHTML, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

//funciton to write our closing html.
function finishHTML() {
    fs.appendFile("./dist/index.html", endHTML, function (err) {
        if (err) {
            console.log(err);
        };
    });
};

//function to write our member card html.
function genHtml(member){
    return new Promise(function(resolve, reject) {
//grabbing the data from the object
        const name = member.getName();
        const role = member.getRole();
        const id = member.getId();
        const email = member.getEmail();
        let html = "";
//conditionals to check role and send correct data to the function.
        if (role === "Manager") {
            const phone = member.getPhone();
// html for each setting with appropriate generation.
            html = 
            `<div class="p-0 mx-3">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">Manager: ${name}</div>
                <div class="card-body">
                <p>ID: ${id}</p>
                <p>Email: <a href="mailto:${email}" target="_blank">${email}</a></p>
                <p>Office Phone Number: <a href="tel:${phone}" target="_blank">${phone}</a></p>
                </div>
            </div>
            </div>`;
        } 
        else if (role === "Engineer") {
            const github = member.getGithub();
            html = 
// html for each setting with appropriate generation.
            `<div class="p-0 mx-3">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">Engineer: ${name}</div>
                <div class="card-body">
                <p>ID: ${id}</p>
                <p>Email: <a href="mailto:${email}" target="_blank">${email}</a></p>
                <p>Github: <a href="https://github.com/${github}" target="_blank">${github}</a></p>
                </div>
            </div>
            </div>`; 
    
        } 
        else {
            const university = member.getUniversity();
// html for each setting with appropriate generation.
            html =  
            `<div class="p-0 mx-3">
            <div class="card shadow">
                <div class="card-header bg-primary text-white">Intern: ${name}</div>
                <div class="card-body">
                <p>ID: ${id}</p>
                <p>Email: <a href="mailto:${email}" target="_blank">${email}</a></p>
                <p>University: ${university}</p>
                </div>
            </div>
            </div>`
        }
//appends our cards to the file. 
        fs.appendFile("./dist/index.html", html, function (err) {
            if (err) {
                return reject(err);
            };
            return resolve();
        });
    });
}
//running our program
beginHTML();
addTeam();