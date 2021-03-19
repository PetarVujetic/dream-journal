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

//Routes

// Gets all dream types
router.get('/dream-types', (req, res)=>{
  res.send(Dream.schema.path('dreamType').enumValues)
})

//Gets a single dream by id
router.get('/:dreamId', async (req, res)=>{
  const dream = await Dream.findById(req.params.dreamId)
  if(!dream) return res.status(400).send('Dream not found')
  res.status(200).send(dream)
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
  } catch (err) {
    console.log("Something went wrong with dream creation");
    res.status(500).send(err)
  }
res.send(dream)
})

// Delete a dream
router.delete('/:dreamId', async function (req, res) {
  await Dream.findByIdAndRemove(req.params.dreamId, function (err, dream) {
    if (err) res.status(500).send("There was a problem deleting the dream.");
    if (!dream) return res.send("Error finding the dream")

    res.status(200).send("Dream: " + dream.title + " was deleted.");
  });
});

// Update a dream
router.put('/:dreamId', async function (req, res) {
  await Dream.findByIdAndUpdate(req.params.dreamId, req.body, { new: true }, function (err, dream) {
    if (err) return res.status(500).send("There was a problem updating the dream.");
    if (!dream) res.send("Error finding the dream")
    res.status(200).send(dream);
  });
});

module.exports = router