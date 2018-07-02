const expect = require("expect");

const { Users } = require("./users");

describe("Users", () => {

    // beforeEach, which will run before test cases and will add some seed data (some users)
    let users;
    beforeEach(() =>{
        users = new Users();
        users.users = [{
            id: "1",
            name: "Mike",
            room: "Node"
        }, {
            id: "2",
            name: "Jane",
            room: "React"
        }, {
            id: "3",
            name: "Julie",
            room: "Node"
        }];
    });

    it("should add new user", () => {
        let users = new Users();
        let user = {
            id: "123",
            name: "Deki",
            room: "Node"
        };

        let resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should remove a user", () => {
        let userId = "1";
        let user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it("should not remove a user", () => {
        let userId = "100";
        let user = users.removeUser(userId);

        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });

    it("should find a user", () => {
        let userId = "2";
        let user = users.getUser(userId);

        expect(user.id).toBe(userId);
    });

    it("should not find a user", () => {
        let userId = "100";
        let user = users.getUser(userId);

        expect(user).toNotExist();
    });

    it("should return names for Node room", () => {
        let userList = users.getUserList("Node");

        expect(userList).toEqual(["Mike", "Julie"]);
    });

    it("should return names for React room", () => {
        let userList = users.getUserList("React");

        expect(userList).toEqual(["Jane"]);
    });

});