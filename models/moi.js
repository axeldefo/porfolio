const mongoose = require('mongoose');

const moiSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true
  },
  salutation: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  linkedin: {
    type: String,
    required: true
  },
  github: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
});

const Moi = mongoose.model('Moi', moiSchema);

module.exports = Moi;