const mongoose = require('mongoose');

const statsSchema = new mongoose.Schema({
  totalProjets: {
    type: Number,
    required: true,
    default: 0
  },
  motsClesTop3: {
    type: [String],
    default: []
  },
  technologiesTop5: {
    type: [String],
    default: []
  },
  titresPourcentage100: {
    type: [String],
    default: []
  },
  projetsParAnnee: {
    type: Map,
    of: Number,
    default: {}
  }
});

const Stats = mongoose.model('Stats', statsSchema);

module.exports = Stats;
