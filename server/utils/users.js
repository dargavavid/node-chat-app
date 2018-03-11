class Users {
    constructor() {
        this.users = [];
    }
    addUser(id, name, room) {
        const user = {id, name, room};
        this.users.push(user);
        return user;
    }
    getUser(id) {
        return this.users.find(x => x.id === id);
    }
    getUserList(room) {
        return this.users.filter(x => x.room === room).map(x => x.name);
    }
    removeUser(id) {
        const user = this.getUser(id);
        this.users = this.users.filter(x => x.id !== id);
        return user;
    }
}

module.exports = {Users};