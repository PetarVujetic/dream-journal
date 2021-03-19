const Joi = require('joi')

//Create dream validation 
const dreamValidation  = (data)=>{
  const schema = Joi.object({
    title: Joi.string().min(3).required(),
    description: Joi.string().min(6).required(),
    dreamType: Joi.string().valid("happy", "sad", "exciting", "scary").required()
  })

 return schema.validate(data);
}


module.exports = dreamValidation
