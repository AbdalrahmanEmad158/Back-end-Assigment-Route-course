const pool = require('../../common/db/db')
const createBlog = async(title,content,authorId)=>
{
    const {rows} = await pool.query(`insert into blog (title,content,author_id)
        values ($1 , $2 , $3) returning *`,[title,content,authorId] )
    return rows[0]
}

async function hardDeleteBlog(id, authorId) {
  const { rows } = await pool.query(`DELETE
                                   FROM blog
                                   WHERE id = $1
                                     AND author_id = $2
                                   RETURNING *`,[id, authorId]);

  return rows[0]; 
}

async function softDeleteBlog(id, authorId) {
  
    const {rows} = await pool.query(`UPDATE blog
                                   SET is_deleted = TRUE , updated_at = now()
                                   WHERE id = $1
                                     AND author_id = $2
                                     and is_deleted = false
                                   RETURNING *`, [id, authorId]);

    return rows[0];
}


async function restoreBlog(id, authorId) {
   
    const {rows} = await pool.query(`UPDATE blog
                               SET is_deleted = FALSE , updated_at = now()
                               WHERE id = $1
                                 AND author_id = $2
                               RETURNING *`, [id, authorId]);

    return rows[0];
}

async function getBlogById(id) {

    const {rows} = await pool.query(`SELECT *
                                   FROM blog
                                   WHERE id = $1
                                   and is_deleted = FALSE`, [id]);

    return rows[0];
}

async function updateBlog(id, newData)  {
    const {rows} = await pool.query(`UPDATE blog
                                      SET title      = $1,
                                          content    = $2,
                                          updated_at = NOW()
                                      WHERE id = $3
                                      RETURNING *`, [newData.title, newData.content, id]);

    return rows[0];
}

async function getAllBlogs(){
       const {rows} = await pool.query(`SELECT *
                                   FROM blog
                                   where is_deleted = false
                                  `);

    return rows;
}

module.exports ={getAllBlogs,createBlog,hardDeleteBlog,
  softDeleteBlog,restoreBlog,getBlogById,updateBlog}