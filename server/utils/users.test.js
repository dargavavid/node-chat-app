const expect = require('expect');
const {Users} = require('./users');

let users;
beforeEach(() => {
    users = new Users();
    users.users = [{
        id: 123,
        name: 'BTF Dave',
        room: 'BTF Boys'
    },
    {
        id: 124,
        name: 'BTF Jocko',
        room: 'BTF Boys'
    },
    {
        id: 125,
        name: 'SB Richard',
        room: 'SB Unite'
    }
];
});

describe('Users', () => {
    it('should create new user', () => {
        const users = new Users();
        const user = {
            id: 123,
            name: 'aaa',
            room: 'test'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect(resUser).toEqual(user);
        expect(users.users).toEqual([user]);
    });

    it('should remove user', () => {
        const userId = 125;
        users.removeUser(userId);
        expect(users.users.length).toBe(2);
        expect(users.getUser(userId)).toBe(undefined);
    });

    it('should not remove user', () => {
        const userId = 1000;
        users.removeUser(userId);
        expect(users.users.length).toBe(3);
        expect(users.getUser(userId)).toBe(undefined);
    });

    it('should find user', () => {
        const userId = 125;
        const user = users.getUser(userId);
        expect(user).toEqual(users.users[2]);
    });

    it('should not find user', () => {
        const userId = 1000;
        const user = users.getUser(userId);
        expect(user).toBe(undefined);
    });

    it('should return names for BTF Boys room', () => {
        const names = users.getUserList('BTF Boys');
        expect(names).toEqual(['BTF Dave', 'BTF Jocko']);
    });

    it('should return names for SB Unite room', () => {
        const names = users.getUserList('SB Unite');
        expect(names).toEqual(['SB Richard']);
    });
});