const {config} = require('dotenv')
config()

const express = require("express");


const productsRoter = require('./app/Products/Products.route.js')
const salesRoter = require('./app/Sales/Sales.route.js')
const suppliersRoter = require('./app/Suppliers/Suppliers.route.js')

const pool  = require("./common/db/db.js");
const reportingRoter = require('./app/reporting/reporting.js');

const app = express();

app.use(express.json());

app.get("/health",async (req,res)=>
{
    const result = await pool.query(`
    SELECT 
        current_database(),
        current_schema()
`);
res.json(result.rows);
    })



app.use(express.json())

app.use('/products',productsRoter)
app.use('/suppliers',suppliersRoter)
app.use('/sales',salesRoter)
app.use('/reporting',reportingRoter)




    app.use((req, res) => {
    res.status(404).json({
        message: "URL or method is not correct"
    })});

    app.use((err, req, res, next) => {
    console.error(err);

    res.json({
        message: err.message,
        success:false,
        stack : err.stack
    });
});



app.listen(3000,(console.log("server is running on port 3000")))