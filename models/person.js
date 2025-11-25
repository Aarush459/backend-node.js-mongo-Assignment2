// models/person.js
const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  gender: String,
  mobile: String
}, { timestamps: true });

module.exports = mongoose.model('Person', personSchema);
