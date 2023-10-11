import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';



const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {   
    return bcrypt.hashSync(userPassword, salt);
}

const createUser = async (email, password, username) => { 
    let hashPass = hashPassword(password);
    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejs_reactjs', Promise: bluebird});

    const [rows, fields] =
        await connection.execute('INSERT INTO users (email, password, username) VALUES (?, ?, ?)',
            [email, hashPass, username]
        );
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
        const [rows, fields] = await connection.execute('UPDATE users SET email = ?, username = ? WHERE id = ?', [username, email, id]);
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