const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Phonebook = require("./models/phoneAddress");
// require("dotenv").config();

const app = express();

/**
 * Error handling middleware
 * @param {error, req, res, next}
 * @returns {JSON Error}
 */

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  next(error);
};

// get the post data using morgan
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(morgan(":method :url :body")); // log post method, url and data

const PORT = process.env.PORT || 3001;

// GET method: fetches all the list in the phonebook
app.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((phonebook) => {
    res.json(phonebook);
  });
});

// GET method: fetches number of entries in the phonebook
// app.get("/info", (req, res) => {
//   const numberOfEntries = phonebook.length;

//   const currentDate = new Date();
//   console.log(`Phone book has info for ${numberOfEntries} people`);
//   console.log(currentDate);
//   //res.send(`Phone book has info for ${numberOfEntries} people`);
//   //res.send(currentDate);
//   return;
// });

// GET: fetch a single address from the phonebook
app.get("/api/persons/:id", (req, res, next) => {
  Phonebook.findById(req.params.id)
    .then((phonebook) => {
      if (!phonebook) {
        return res.status(404).end();
      }
      res.json(phonebook);
    })
    .catch((error) => next(error));
});

// DELETE: delete an address from the phonebook
app.delete("/api/persons/:id", (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// POST: add new address to the phonebook
app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  // if (body.name === undefined || body.number === undefined) {
  //   return res.status(400).json({ error: "Phone address missing!" });
  // }

  const phoneDetails = new Phonebook({
    name: body.name,
    number: body.number,
  });

  phoneDetails
    .save()
    .then((savedDetails) => {
      res.json(savedDetails);
    })
    .catch((error) => next(error));
});

// PUT: update address in the phonebook
app.put("/api/persons/:id", (req, res, next) => {
  const { name, number } = req.body;

  Phonebook.findByIdAndUpdate(
    req.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedDetails) => {
      res.json(updatedDetails);
    })
    .catch((error) => next(error));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

// HELPER Function
/**
 * @param {no params}
 * @returns {integer}
 */
function generateId() {
  const id = Math.floor(Math.random() * 1000);

  return id;
}
