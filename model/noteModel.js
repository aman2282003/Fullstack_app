const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: String },
  username: { type: String }
});
const noteModel = mongoose.model("note", noteSchema);

module.exports = noteModel;
