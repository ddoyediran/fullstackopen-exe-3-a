const mongoose = require("mongoose");

const commandArg = process.argv.splice(2);

//console.log(`added ${commandArg[1]} number ${commandArg[2]} to phonebook`);
//console.log(commandArg[0], commandArg[1], commandArg[2]);

// connect to the database
const password = commandArg[0].toString();

const url = `mongodb+srv://phonebook:${password}@cluster0.4idts.mongodb.net/phoneBook?retryWrites=true&w=majority`;

// create a Schema
const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
});

// Instance of the phonebook model

const Phonebook = mongoose.model("Phonebook", phoneBookSchema);

// If only password is passed: display all the data in the databse
if (commandArg.length === 1) {
  mongoose.connect(url).then((result) => {
    Phonebook.find({}).then((result) => {
      result.forEach((phonebook) => {
        console.log(phonebook);
      });
      return mongoose.connection.close();
    });
  });

  //   Phonebook.find({}).then((result) => {
  //     console.log("this line 26 works");
  //     result.forEach((phonebook) => {
  //       console.log(phonebook);
  //       console.log("this line works");
  //     });
  //     console.log("this line 31 works");
  //     mongoose.connection.close();
  //   });
  //   console.log("this line 33 works");
  //   //return;
}

// make connection to the database
if (commandArg.length > 2) {
  mongoose
    .connect(url)
    .then((result) => {
      console.log("connect");

      const newAddress = new Phonebook({
        name: commandArg[1],
        number: commandArg[2],
        date: new Date(),
      });
      return newAddress.save();
    })
    .then(() => {
      console.log("Phone address saved!");
      return mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      return;
    });
}
