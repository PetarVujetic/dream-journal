const mongoose = require('mongoose')
const router = require('express').Router()
const Dream = require('./Dream')
const bodyParser = require('body-parser')
const moment = require('moment')
const joi = require('joi')
const dreamValidation = require('./dreamValidation')


//Middlewares
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//ROUTES

// Gets all dream types
router.get('/dream-types', (req, res)=>{
  res.send(Dream.schema.path('dreamType').enumValues)
})

// Creates a dream
router.post('/create-dream', async (req, res)=>{
  
  //Dream validation
  const {error} = dreamValidation(req.body)
  if(error) return res.status(400).send(error.details[0].message)

  const dream = new Dream({
    title: req.body.title,
    description: req.body.description,
    dreamType: req.body.dreamType
  })
  try {
    dream.save()
    res.status(201).send(dream)
  } catch (err) {
    console.log("Something went wrong with dream creation");
    res.status(500).send(err)
  }

})

//Search by type, title and date
// Pagination query params(page, limit)
router.get('/search', async (req, res)=>{

  let { dreamType, title, startDate, endDate} = req.body
  const { page = 1, limit = 10} = req.query

  let query = {
    ...dreamType ? {"dreamType": dreamType} : {},
    ...title ? { "title": title } : {},
    ...startDate && endDate ? { createdDate: {$gt: startDate, $lt: endDate}} : {}
  }
  
  try {
  let dreams = await Dream.find(query).limit(limit * 1).skip((page - 1) * limit).sort('-createdDate')
  if(!dreams) return res.status(400).send("No dreams found")
  res.send({total: dreams.length, dreams});
  } catch (err) {
    return res.status(500).send(err)
  }
  
})

//Gets a single dream by id
router.get('/:dreamId', async (req, res)=>{
  try {
    const dream = await Dream.findById(req.params.dreamId)
    if(!dream) return res.status(400).send('Dream not found')
    res.status(200).send(dream)
  } catch (error) {
    res.status(500).send(error)
  }
 
})

// Delete a dream
router.delete('/:dreamId', async function (req, res) {
 
  try {
    const dream = await Dream.findByIdAndRemove(req.params.dreamId)
    if (!dream) return res.status(400).send("Error finding the dream")
    res.status(200).send("Dream: " + dream.title + " was deleted.");
  } catch (err) {
    return res.status(500).send("There was a problem deleting the dream")
  }
});
 
// Update a dream
router.put('/:dreamId', async function (req, res) {
 
try {
  const dream = await Dream.findByIdAndUpdate(req.params.dreamId, req.body, { new: true })
  if (!dream) return res.status(400).send("Error finding the dream")
  res.status(201).send(dream);
} catch (err) {
  return res.status(500).send("There was a problem updating the dream");
}
});



module.exports = router