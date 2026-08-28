const  pool  = require("../../common/db/db.js");

const createSupplier = async (supplierName,contactNumber)=>{
       const {rows} = await pool.query(
            `INSERT INTO suppliers
             (supplier_name, contact_number)
             VALUES ($1, $2)
             RETURNING *`,
            [supplierName, contactNumber]
        );
        return rows[0]
}

const getAllSuppliers = async ()=>{
       const {rows} = await pool.query(
              `SELECT *
             FROM suppliers
             ORDER BY supplier_id`
        );
        return rows
}

const getSupplierById = async (id)=>{
       const {rows} = await pool.query(
              `SELECT *
             FROM suppliers
             where supplier_id =$1 `
             ,[id]
        );
        return rows[0]
}

const deleteSupplier = async (id)=>{
       const {rows} = await pool.query(
              `DELETE FROM suppliers
             WHERE supplier_id = $1
             RETURNING *`,
            [id]
        );
        return rows[0]
}

const updateSupplier = async (id,newData)=>{
       const {rows} = await pool.query(
          `UPDATE suppliers
             SET supplier_name = $1,
                 contact_number = $2
             WHERE supplier_id = $3
             RETURNING *`,
            [
              
                newData.supplier_name,
                newData.contact_number,
                id
               
            ]
        );
        return rows[0]
}
module.exports = {createSupplier,getAllSuppliers,deleteSupplier,updateSupplier,getSupplierById}