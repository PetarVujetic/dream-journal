const mongoose = require('mongoose')
const router = require('express').Router()
const Dream = require('./Dream')

router.get('/dream-types', (req, res)=>{
  res.send(Dream.schema.path('dreamType').enumValues)
})

module.exports = router