const mongoose = require("mongoose");

// CREATE the Schema
const phoneBookSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 4,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{7}/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    minLength: 8,
    required: [true, "Phone number required"],
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
