const express = require('express')
const dotenv = require('dotenv')
const db = require('./db')
const Dream = require('./Dream/Dream')
const dreamController = require('./Dream/dreamController')
const morgan = require('morgan')

// Config and variable setup
dotenv.config({path: '.env'})
const app = express()
let PORT = process.env.PORT || 8000

//Middlewares
app.use(morgan('combined'))

//Routes
app.use('/api/dream', dreamController)

app.listen(PORT, ()=>{
    console.log(`Server listening on PORT: http://localhost:${PORT}`);
})