const{Router}=require("express")
const authRoter= Router()
const authController = require("./auth.controller")
authRoter.post('/register',authController.register)
authRoter.post('/logIn',authController.login)
/*authRoter.post('/logout')
authRoter.post('/send-otp')
authRoter.post('/verify-otp')
authRoter.post('/resertpassword')
*/
module.exports =authRoter