const authRepository = require('./auth.repository')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register =async (name,email,password) =>{
const userExist = await authRepository.findUserByEmail(email)
if (userExist) {
    throw new Error("user already exist");
}
const hashPassword = await bcrypt.hash(password,10)
const newUser = await authRepository.createUser(email,name,hashPassword)
return newUser
}

const logIn = async (email,password) =>{
const userExist = await authRepository.findUserByEmail(email)
if (!userExist) {
    throw new Error("invalid creadientials");
}

const match = await bcrypt.compare(password,userExist.password_hash)
if (!match) {
    throw new Error("invalid creadientials");
}
const token =  jwt.sign({id:userExist.id, name:userExist.name},process.env.JWT_SECRET,{expiresIn :'1d'})
return token

}

module.exports = {register,logIn}