const mongoose = require('mongoose');

const acquis = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  }
});

const ParcoursSchema = new mongoose.Schema({
  dateDebut: {
    type: Date,
    required: true
  },
  dateFin: {
    type: Date,
    required: true
  },
  titre: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 150
  },
  lieu: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Formation', 'Expérience professionnelle', 'Alternance'],
    required: true
  },
  acquis: [acquis],
  logo : {
    type: String,
    required: true
  }
});

const Parcours = mongoose.model('Parcours', ParcoursSchema);

module.exports = Parcours;