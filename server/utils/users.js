class Users {
    constructor () {
        this.users = []; // Create an empty users array
    }

    addUser(id, name, room) {
        let user = {id, name, room}; // Create the user object
        this.users.push(user);       // Add created user to the array of users
        
        return user;
    }

    removeUser(id) {
        let user = this.getUser(id);

        if(user) {
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUserList(room) {
        let users = this.users.filter(user => user.room === room);
        let namesArray = users.map(user => user.name);

        return namesArray;
    }
}

module.exports = { Users };