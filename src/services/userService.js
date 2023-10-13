import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index';



const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {   
    return bcrypt.hashSync(userPassword, salt);
}

const createUser = async (email, password, username) => {
    let hashPass = hashPassword(password);
    
    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (err) { 
        console.log('check error: ', err)
    }
        
}

const userList = async () => {

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejs_reactjs', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (error) { 
        console.log('check err: ', error)
    }
}

const deleteUser = async (id) => { 
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejs_reactjs', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('DELETE FROM users WHERE id=?', [id]);
        return rows;
    } catch (error) { 
        console.log('check err: ', error)
    }
}

const getUserById = async (id) => { 
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejs_reactjs', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users WHERE id=?', [id]);
        return rows;
    } catch (error) { 
        console.log('check err: ', error)
    }   
}

const updateUser = async (email, username, id) => { 
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejs_reactjs', Promise: bluebird});

    try {
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?', [email, username, id]);
        return rows;
    } catch (error) { 
        console.log('check err: ', error)
    }   
} 
    
module.exports={ 
    hashPassword,
    createUser,
    userList,
    deleteUser,
    getUserById,
    updateUser
} 