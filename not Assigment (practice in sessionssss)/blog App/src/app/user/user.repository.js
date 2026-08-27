const pool = require('../../common/db/db')

const findUserById = async (Id)=>
{
    let query = 'select * from users where id = $1' 
    const {rows} = await pool.query(query , [Id])
    return rows[0]

}

const cheakUserExistById = async (id)=>
{
    let query = 'select Exists (select 1 from users where id = $1) as result' 
    const {rows} = await pool.query(query , [id])
    return rows[0].result

}
module.exports = {findUserById,cheakUserExistById}