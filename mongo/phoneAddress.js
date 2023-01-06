const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

// Connect to mongodb
mongoose
  .connect(url)
  .then((result) => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

// CREATE the Schema
const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
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
