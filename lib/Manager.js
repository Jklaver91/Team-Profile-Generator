const Member = require ("./Member");

class Manager extends Member {
    constructor (name, id, email, office) {
        super (name, id, email);
        this.officeNumber = office;
    }
}

module.exports = Manager;