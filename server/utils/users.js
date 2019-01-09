class Users 
{
    constructor()
    {
        this.users = [];
    }
    addUser(id, name, room)
    {
        var user =
        {
            id,
            name,
            room
        }
        this.users.push(user);
        console.log("addUser : ",user);
        return user;
    }
    getUser(id)
    {
        var user = this.users.filter((user) => user.id === id);
        console.log(`getUser(${id}) : ${user[0]}`);
        return user[0];
    }
    getUserList(room)
    {
        var users = this.users.filter((user) =>
        {
            return user.room == room;
        });
        var namesArray = users.map((user) => user.name);
        console.log("getUserList(users) : ", users);
        console.log("getUserList : ", namesArray);
        return namesArray;
    }
    removeUser(id)
    {
        var user = this.getUser(id);
        if(user)
        {
            this.users = this.users.filter((user) => user.id != id);
        }
        console.log(`removeUser(${id}) : ${user}`);
        return user;
    }
};

module.exports = {Users};