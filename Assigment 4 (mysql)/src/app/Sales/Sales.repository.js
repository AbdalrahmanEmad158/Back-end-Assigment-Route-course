const  pool  = require("../../common/db/db.js");


const createSale = async (product_id,quantity_sold)=>{
       const {rows} = await pool.query(
            `INSERT INTO sales
           (product_id,quantity_sold)
             VALUES ($1, $2)
             RETURNING *`,

             
            [product_id, quantity_sold]
        );
        return rows[0]
} 


const getAllSales = async ()=>{
       const {rows} = await pool.query(
              `SELECT *
             FROM sales
             ORDER BY sale_id`
        );
        return rows
}

const getSalesByProductId = async (product_id)=>{
       const {rows} = await pool.query(
              `SELECT *
             FROM sales
             where product_id =$1 `
             ,[product_id]
        );
        return rows
}


module.exports = {getAllSales,getSalesByProductId,createSale}