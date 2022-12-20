const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// get the post data using morgan
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(morgan(":method :url :body")); // log post method, url and data

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

// GET method: fetches number of entries in the phonebook
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

// POST: add new address to the phonebook
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

  phonebook = phonebook.concat(newPhoneAddress);

  return res.status(200).send("Address added successfully!");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

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
