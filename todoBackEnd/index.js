require('./dbConnection/index');
require('dotenv').config();
const cors = require('cors');
const express = require('express');
const authRoutes = require('./Routes/index')
const app = express();
const port = process.env.PORT | 4500;

app.use(cors())
app.use(express.json());
app.use('/',authRoutes);

app.listen(port , ()=>{
    console.log("Server is running on ",port)
})
