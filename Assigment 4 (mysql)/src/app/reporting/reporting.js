const{Router}=require("express")
const  pool  = require("../../common/db/db.js");
const reportingRoter = new Router()


reportingRoter.get("/total-sold", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                p.productid,
                p.productname,
                COALESCE(SUM(s.quantity_sold), 0) AS TotalQuantitySold
            FROM products p
            LEFT JOIN sales s
                ON p.productid = s.product_id
            GROUP BY
                p.productid,
                p.productname
            ORDER BY TotalQuantitySold DESC
        `);

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

reportingRoter.get("/highest-stock", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM Products
            ORDER BY StockQuantity DESC
            LIMIT 1
        `);

        /*
        حل اخر 
          SELECT *
            FROM Products
           

			where StockQuantity in
             (select max(StockQuantity)from products) */

        res.json(result.rows[0]);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

reportingRoter.get("/suppliers-f", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT *
            FROM Suppliers
            WHERE Supplier_name LIKE 'F%'
        `);

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


reportingRoter.get("/never-sold", async (req, res) => {
    try {
        const result = await pool.query(`
             SELECT products.* from products
   
           left JOIN sales s
                ON products.productid = s.product_id
				 WHERE s.sale_id IS NULL
        `);

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});


reportingRoter.get("/sales-details", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                p.productname,
                s.quantity_sold,
                s.saledate
            FROM Sales s
            INNER JOIN Products p
                ON s.product_id = p.ProductID
            ORDER BY s.SaleDate
        `);

        res.json(result.rows);

    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
});

module.exports = reportingRoter
