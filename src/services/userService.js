import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';



const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {   
    return bcrypt.hashSync(userPassword, salt);
}

const createUser = (email, password, username) => { 
    let hashPass = hashPassword(password);

    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) { 
                console.log(err)
            }
        }
    );
}

const userList = async () => {

    const connection = await mysql.createConnection({host:'localhost', user: 'root', database: 'nodejs_reactjs', Promise: bluebird});
    let users = [];
    // connection.query(
    //     'SELECT * FROM users',
    //     function (err, results, fields) {
    //         if (err) { 
    //             console.log(err);
    //             return users;
    //         }
    //         return users = results;
    //     }
    // );
    try {
        const [rows, fields] = await connection.execute('SELECT * FROM users');
        return rows;
    } catch (error) { 
        console.log('check err: ', error)
    }
}

module.exports={ 
    hashPassword,
    createUser,
    userList,
}