const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

// Connect to mongodb
mongoose
  .connect(url)
  .then((result) => {
    //console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// CREATE the Schema
const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    required: true,
  },
  number: {
    type: String,
    minLength: 7,
    required: true,
  },
  date: Date,
});

// Transform the schema object
phoneBookSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

// export the mongoose model
module.exports = mongoose.model("Phonebook", phoneBookSchema);
