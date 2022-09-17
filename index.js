const inquirer = require("inquirer");
const fs = require("fs");
const questions = require("./src/questions");
const startHTML = require("./src/startHTML");
const endHTML = require("./src/endHTML");

function addTeam() {
    inquirer.prompt(questions)
}

function beginHTML(){
    fs.writeFile("./dist/index.html", startHTML, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

function finishHTML(){
    fs.appendFile("./dist/index.html", endHTML, function (err) {
        if (err) {
            console.log(err);
        };
    });
};

addTeam();
beginHTML();
finishHTML();