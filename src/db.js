let mongoose = require('mongoose');
let dotenv = require("dotenv")
dotenv.config({ path: '.env' })

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log("Failed to connect to the db: " + err);
    else
      console.log("Connected to the db");
  })
