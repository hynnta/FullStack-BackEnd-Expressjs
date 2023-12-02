import { raw } from "body-parser";
import db from "../models"
import bcrypt from 'bcryptjs';
import { Op } from "sequelize";

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {   
    return bcrypt.hashSync(userPassword, salt);
}

const checkEmailExist = async (userEmail) => { 
    let user = await db.User.findOne({
        where: {email: userEmail}
    })
    if (user) {
        return true;  
    } 
    return false;
}

const checkPhoneExist = async (userPhone) => { 
    let user = await db.User.findOne({
        where: {phone: userPhone}
    })
    if (user) {
        return true;  
    } 
    return false;
}

const registerNewUser = async (rawUserData) => {
    //check email/phone are exist
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        if (isEmailExist === true) { 
            return {
                EM: 'The Email is already exist', 
                EC: '1'
            }
        }
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        if (isPhoneExist === true) { 
            return {
                EM: 'The Phone is already exist', 
                EC: '1'
            }
        }

        //hash password
        let hashPass = hashPassword(rawUserData.password);
    
        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            phone: rawUserData.phone,
            password: hashPass,
        })

        return {
            EM: 'A user is created successfully',
            EC: 0
        }

    } catch (error) {
        console.log('check error: ', error);
        return {
                EM: 'Something wrongs in service...', 
                EC: -2
            }
    }
}

const checkPassword = (inputPassword, hashPassword) => { 
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async (rawData) => { 
    try {
        
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })

        if (user) {
            console.log('found user with email/phone ')
            let isCorrectPassword = checkPassword(rawData.password, user.password);
            if (isCorrectPassword === true) {
                return {
                    EM: 'ok',
                    EC: 0,
                    DT: ''
                }
            }
        }
        console.log('not found user with email/phone: ', rawData.valueLogin, 'password: ', rawData.password)
        return {
            EM: 'Your email, phone number or password is incorrect!', 
            EC: 1,
            DT: ''
        }
         
    } catch (error) {
        console.log(error)
        return {
                EM: 'Something wrongs in service...', 
                EC: -2
            }
    }
}
 
module.exports = {
    registerNewUser,
    checkPassword,
    handleUserLogin
}