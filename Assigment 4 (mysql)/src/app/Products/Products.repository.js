const  pool  = require("../../common/db/db.js");

const createProduct = async (ProductName, Price, StockQuantity,SupplierID)=>{
       const {rows} = await pool.query(
         `INSERT INTO products
             (productname, price, stockquantity, supplierid)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [ProductName, Price, StockQuantity, SupplierID]
        );
        return rows[0]
}

const getAllProducts = async ()=>{
       const {rows} = await pool.query(
              `SELECT *
             FROM products
             ORDER BY productid`
        );
        return rows
}

const getProductById = async (id)=>{
       const {rows} = await pool.query(
              `SELECT *
             FROM products
             where productid =$1 `
             ,[id]
        );
        return rows[0]
}

const deleteProduct = async (id)=>{
       const {rows} = await pool.query(
              `DELETE  FROM products
             where productid =$1
             RETURNING *`,
            [id]
        );
        return rows[0]
}

const updateProduct = async (id,newData)=>{
       const {rows} = await pool.query(
          `UPDATE products
             SET productname = $1,
                 price = $2,
                 stockquantity = $3,
               supplierid = $4
             WHERE productid = $5
             RETURNING *`,
            [
           
                newData.productname,
                newData.price,
                 newData.stockquantity,
                  newData.supplierid,
                id
               
            ]
        );
        return rows[0]
}
module.exports = {createProduct,updateProduct,deleteProduct,getAllProducts,getProductById}
