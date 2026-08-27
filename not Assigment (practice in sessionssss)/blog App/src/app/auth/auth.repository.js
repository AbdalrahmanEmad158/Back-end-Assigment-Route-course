const pool = require('../../common/db/db')

const findUserByEmail = async (email)=>
{
    let query = 'select * from users where email = $1' 
    const {rows} = await pool.query(query , [email])
    return rows[0]

}



const createUser = async(email,name,hashedPassword)=>
{
    
    const {rows} = await pool.query(`insert into users (email,name,password_hash)
        values ($1 , $2 , $3) returning *`,[email,name,hashedPassword] )
    return rows[0]
}

module.exports = {findUserByEmail,createUser}