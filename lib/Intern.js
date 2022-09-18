const Member = require ("./Member");

class Intern extends Member {
    constructor (name, id, email, university) {
        super (name, id, email);
        this.school = university;
    }
    getUniversity() {
        return this.university;
    }
    getRole() {
        return "Intern";
    }
}


module.exports = Intern;