const express = require("express");
const mongoose = require("mongoose");
const config = require("./utils/config");
const cors = require("cors");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const phonebookRouter = require("./controllers/phoneAddress");

const app = express();

mongoose.set("strictQuery", false);

//logger.info("connecting to", config.MONGODB_URI);

// Connect to mongodb
mongoose
  .connect(config.MONGODB_URI)
  .then((result) => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(middleware.requestLogger);

app.use("/api/persons", phonebookRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
