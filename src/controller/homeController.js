import userService from '../services/userService'

const handleHello = (req, res) => { 
    return res.render("home.ejs")
}
const hendleUser = async (req, res) => { 
    let viewUsers = await userService.userList();
    return res.render("user.ejs", {viewUsers});
}
const handleCreateUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    let username = req.body.username;

    userService.createUser(email, password, username);

    return res.redirect("/users")
}

const handleDeleteUser = async (req, res) => { 
    await userService.deleteUser(req.params.id);
    return res.redirect("/users")
}

const getUpdateUser = async (req, res) => {
    let id = req.params.id;
    let user = await userService.getUserById(id);
    let userData = {};
    userData = user;
    // if (user && user.length > 0) { 
    //     userData = user[0];
    // }
    console.log('check user: ', user);
    return res.render("userUpdate.ejs", {userData});
}

const handleUpdateUser = async (req, res) => { 
    let email = req.body.email;
    let username = req.body.username;
    let id = req.body.id;
    console.log('check body: ', req.body);
    await userService.updateUser(email, username, id);
    return res.redirect("/users");
}

module.exports = {
    handleHello,
    hendleUser,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    getUpdateUser
}