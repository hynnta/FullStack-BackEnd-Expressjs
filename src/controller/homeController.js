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

module.exports = {
    handleHello,
    hendleUser,
    handleCreateUser,
    handleDeleteUser
}