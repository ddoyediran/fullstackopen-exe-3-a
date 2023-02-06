const phonebookRouter = require("express").Router();
const Phonebook = require("../models/phoneAddress");

// GET method: fetches all the list in the phonebook
phonebookRouter.get("/api/persons", (req, res) => {
  Phonebook.find({}).then((phonebook) => {
    res.json(phonebook);
  });
});

// GET: fetch a single address from the phonebook
phonebookRouter.get("/api/persons/:id", (req, res, next) => {
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
phonebookRouter.delete("/api/persons/:id", (req, res, next) => {
  Phonebook.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

// POST: add new address to the phonebook
phonebookRouter.post("/api/persons", (req, res, next) => {
  const body = req.body;

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
phonebookRouter.put("/api/persons/:id", (req, res, next) => {
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

module.exports = phonebookRouter;
