const mongoose = require('mongoose');


const ElementsSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  niveau: {
    type: String,
    enum: ['Débutant', 'Intermédiaire', 'Avancé'],
    default: 'Débutant'
  },
});

const CompetencesSchema = new mongoose.Schema({
  num : {
    type: Number,
    required: true,
    unique: true
  },
  titre: {
    type: String,
    required: true,
  },
  elements: [ElementsSchema],
});


const Competences = mongoose.model('Competences', CompetencesSchema);

module.exports = Competences;
