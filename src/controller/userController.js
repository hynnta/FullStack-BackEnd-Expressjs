import userApiService from '../services/userApiService'

const readUser = async (req, res) => { 

    try {
        let data = await userApiService.getAllUser();
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT, //data
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

const createUser = (req, res) => { 
    try {
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: '', //data
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

const updateUser = (req, res) => { 
    try {
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: '', //data
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

const deleteUser = (req, res) => { 
    try {
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: '', //data
    })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error from server', //error message
            EC: '-1', //error code
            DT: '', //data
        })
    }
}

module.exports = { 
    readUser,
    createUser,
    updateUser,
    deleteUser
}