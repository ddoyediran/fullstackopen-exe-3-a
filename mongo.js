const mongoose = require("mongoose");

const commandArg = process.argv.splice(2);

console.log(`added ${commandArg[1]} number ${commandArg[2]} to phonebook`);
//console.log(commandArg[0], commandArg[1], commandArg[2]);

// connect to the database
const password = commandArg[0];

const url = `mongodb+srv://phonebook:${password}@cluster0.4idts.mongodb.net/phoneBook?retryWrites=true&w=majority`;

// create a Schema
const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: Number,
  date: Date,
});

// Instance of the phonebook model

const Phonebook = mongoose.model("Phonebook", phoneBookSchema);

// If only password is passed: display all the data in the databse
if (commandArg.length === 1) {
  Phonebook.find({}).then((result) => {
    result.forEach((phonebook) => {
      console.log(phonebook);
    });
    mongoose.connection.close();
  });
  return;
}
