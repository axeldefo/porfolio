const mongoose = require('mongoose');

const projetsSchema = new mongoose.Schema({
  titre: {
    type: String,
    required: true
  },
  descriptionIntro: {
    type: String,
    maxlength: 80
  },
  descriptionComplete: {
    type: String,
    maxlength: 250
  },
  motsCles: {
    type: [String],
    maxlength: 10
  },
  thumbnail: {
    type: String,
    required: true
  },
  imagesIllustration: {
    type: [String],
    validate: {
      validator: function (value) {
        return value.length <= 5;
      },
      message: 'Maximum 5 images d\'illustration sont autorisées.'
    }
  },
  technologies: {
    type: [String],
    required: true
  },
  pourcentage: {
    type: Number,
    min: 0,
    max: 100
  }
});

const Projets = mongoose.model('Projets', projetsSchema);

module.exports = Projets;