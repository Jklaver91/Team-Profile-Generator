const Member = require ("./Member");

class Intern extends Member {
    constructor (name, id, email, university) {
        super (name, id, email);
        this.school = university;
    }
}


module.exports = Intern;