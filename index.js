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

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

//http://localhost:3001/api/persons
