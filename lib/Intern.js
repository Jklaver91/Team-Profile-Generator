const Member = require ("./Member");
// adds member class into the intern class.
class Intern extends Member {
    constructor (name, id, email, university) {
        super (name, id, email);
        this.university = university;
    }
    getUniversity() {
        return this.university;
    }
    getRole() {
        return "Intern";
    }
}


module.exports = Intern;