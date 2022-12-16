const { response } = require("express");
const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 3001;

let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

// GET method: fetches all the list in the phonebook
app.get("/api/persons", (req, res) => {
  if (!phonebook) {
    return res.status(404).json({ message: "phonebook is empty" });
  }

  return res.status(200).send(phonebook);
});

app.get("/info", (req, res) => {
  const numberOfEntries = phonebook.length;

  const currentDate = new Date();
  console.log(`Phone book has info for ${numberOfEntries} people`);
  console.log(currentDate);
  //res.send(`Phone book has info for ${numberOfEntries} people`);
  //res.send(currentDate);
  return;
});

// GET: fetch a single address from the phonebook
app.get("/api/persons/:id", (req, res) => {
  const person = phonebook.find((personDetails) => {
    return personDetails.id === parseInt(req.params.id);
  });

  if (!person) {
    return res.status(404).json({ message: "Person not found in the list" });
  }

  return res.status(200).send(person);
});

// DELETE: delete an address from the phonebook
app.delete("/api/persons/:id", (req, res) => {
  //   phonebook = phonebook.filter((phonebook) => {
  //     return phonebook.id != parseInt(req.params.id);
  //   });

  //   return res.status(204).end();

  // Alternative solution
  const personIndex = phonebook.findIndex((phonebook) => {
    return phonebook.id === parseInt(req.params.id);
  });

  if (personIndex < 0) {
    return res.status(404).send("Address note found!");
  }

  phonebook.splice(personIndex, 1);

  return res.status(204).end();
});

app.post("/api/persons/", (req, res) => {
  // check if number and name are not empty
  if (!req.body.name || !req.body.number) {
    return res.status(404).send("Name or number is missing");
  }

  for (let i = 0; i < phonebook.length; i++) {
    if (req.body.name === phonebook[i].name) {
      return res.status(404).json({ error: "name must be unique" });
    }
  }

  const newPhoneAddress = {
    id: generateId(),
    name: req.body.name,
    number: req.body.number,
  };

  //   if (!newPhoneAddress) {
  //     return res.status(404).send("Address missing!");
  //   }

  //   if (!newPhoneAddress.name || !newPhoneAddress.number) {
  //     return res.status(404).send("Name or number is missing");
  //   }

  phonebook = phonebook.concat(newPhoneAddress);

  return res.status(200).send("Address added successfully!");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

//http://localhost:3001/api/persons

// HELPER Function
/**
 *
 * @param {no params}
 * @returns {integer}
 */
function generateId() {
  const id = Math.floor(Math.random() * 1000);

  return id;
}
