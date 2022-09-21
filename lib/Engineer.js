const Member = require ("./Member");
// adds member class into the engineer class.
class Engineer extends Member {
    constructor (name, id, email, github) {
        super (name, id, email);
        this.github = github;
    }
    getGithub() {
        return this.github;
    }
    getRole() {
        return "Engineer";
    }
}


module.exports = Engineer;