const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Author = mongoose.model("author", {
  name: String,
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

module.exports = Author;
