const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  link: {
    type: String,
    required: true,
    validate: {
      validator: (value) =>
        /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+[a-zA-Z0-9](:\d+)?(\/[a-zA-Z0-9._~:/?%#[\]@!$&'()*+,;=-]*)?$/.test(
          value,
        ),
      message: "El enlace debe ser una URL válida",
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },

  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: "user",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("card", cardSchema);
