const {config} = require('dotenv')
config()

const express = require("express")
const authRoter = require('./app/auth/auth.route.js')
const blogRoter = require('./app/blog/blog.route.js')
const userRoter = require('./app/user/user.route.js')
const pool = require('./common/db/db')
const app = express()

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
app.use('/auth',authRoter)
app.use('/blog',blogRoter)
app.use('/user',userRoter)

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