const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');
const cors = require('cors');     // ✅ FIX 1: Import CORS

const Person = require('./models/person');

const app = express();
const PORT = 3000;

// MongoDB
const MONGO_URI = 'mongodb://127.0.0.1:27017/persondb';

mongoose.connect(MONGO_URI)
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.log(err));

// View Engine (for browser UI)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(cors());   // ✅ FIX 2: Allow Angular (http://localhost:4200) to access API
app.use(express.urlencoded({ extended: true }));
app.use(express.json());          // ✅ Needed for JSON API
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// -------------------------
// ✅ API ROUTES FOR ANGULAR
// -------------------------

// Get all people (JSON)
app.get('/api/person', async (req, res) => {
  const people = await Person.find().lean();
  res.json(people);
});

// Get one person by ID (JSON)
app.get('/api/person/:id', async (req, res) => {
  const person = await Person.findById(req.params.id).lean();
  res.json(person);
});

// Update a person (JSON)
app.put('/api/person/:id', async (req, res) => {
  const updated = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

// Delete a person (JSON)
app.delete('/api/person/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.json({ message: 'Person deleted' });
});

// -------------------------
// HTML ROUTES (EJS)
// -------------------------

app.get('/', (req, res) => res.redirect('/person'));

app.get('/person', async (req, res) => {
  const people = await Person.find().lean();
  res.render('index', { people });
});

app.get('/person/new', (req, res) => {
  res.render('new');
});

app.post('/person', async (req, res) => {
  await Person.create(req.body);
  res.redirect('/person');
});

app.get('/person/:id/edit', async (req, res) => {
  const person = await Person.findById(req.params.id).lean();
  res.render('edit', { person });
});

app.put('/person/:id', async (req, res) => {
  await Person.findByIdAndUpdate(req.params.id, req.body);
  res.redirect('/person');
});

app.get('/person/:id/delete', async (req, res) => {
  const person = await Person.findById(req.params.id).lean();
  res.render('delete', { person });
});

app.delete('/person/:id', async (req, res) => {
  await Person.findByIdAndDelete(req.params.id);
  res.redirect('/person');
});

// -------------------------
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
