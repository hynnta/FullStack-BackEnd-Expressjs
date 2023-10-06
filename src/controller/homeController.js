const handleHello = (req, res) => { 
    return res.render("home.ejs")
}
const hendleUser = (req, res) => { 
    return res.render("user.ejs")
}

module.exports = {
    handleHello,
    hendleUser
}