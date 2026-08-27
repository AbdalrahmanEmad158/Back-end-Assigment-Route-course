
const jwt = require('jsonwebtoken')
const userRepository = require("../../app/user/user.repository")
async function authGuard(req,res,next){
  try {
      const authorization = req.headers.authorization


    if (!authorization) {
      throw new Error("Authorization header is required");
    }


   const [type, token] = authorization.split(" ");

    if (type !== "Bearer" || !token) {
      throw new Error("Invalid authorization format");
    }
 
 const paylod = jwt.verify(token,process.env.JWT_SECRET)
  const authorId = paylod.id 

    const userExist = await userRepository.cheakUserExistById(authorId)
    if (!userExist) {
        throw new Error("user not found");
    }
    req.user=paylod
    next()
  } catch (error) {
    next(error)
  }
}

module.exports={authGuard}