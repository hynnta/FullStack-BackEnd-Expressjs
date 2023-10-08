import bcrypt from 'bcryptjs';
import mysql from 'mysql2';

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'nodejs_reactjs'
  });

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

const userList = () => { 
    connection.query(
        'SELECT * FROM users',
        function (err, results, fields) {
            if (err) { 
                console.log(err)
            }
        }
    );
}

module.exports={ 
    hashPassword,
    createUser,
    userList,
}