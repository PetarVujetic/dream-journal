const express = require('express')
const dotenv = require('dotenv')
const db = require('./db')

dotenv.config({path: '.env'})
const app = express()

let PORT = process.env.PORT || 8000

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT: http://localhost:${PORT}`);
})