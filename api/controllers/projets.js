const Projet = require('../../models/projets.js');
const debug = require('debug')('projet:controller');


// Get all projets
exports.getProjets = async (req, res) => {
  try {
    debug('Fetching projets');
    const projets = await Projet.find();
    res.status(200).json(projets);
    debug('Projets fetched successfully');
  } catch (error) {
    debug('Error fetching projets:', error);
    res.status(500).json({ error: 'Error fetching projets' });
  }
};

// Get a projet by titre

exports.getProjet = async (req, res) => {
  try {
    debug('Fetching projet');
    const { num } = req.params;
    const projet = await Projet.findOne({ num });
    if (projet) {
      res.status(200).json(projet);
      debug('Projet fetched successfully');
    } else {
      res.status(404).json({ error: 'Projet not found' });
    }
  } catch (error) {
    debug('Error fetching projet:', error);
    res.status(500).json({ error: 'Error fetching projet' });
  }
};

// Create a new projet

exports.createProjet = async (req, res) => {
  try {
    debug('Creating projet');
    const num = await Projet.countDocuments() + 1;
    const projet = new Projet({ ...req.body, num });
    await projet.save();
    res.status(201).json(projet);
    debug('Projet created successfully');
  } catch (error) {
    debug('Error creating projet:', error);
    res.status(500).json({ error: 'Error creating projet' });
  }
};

// Update a projet

exports.updateProjet = async (req, res) => {
  try {
    debug('Updating projet');
    const { titre } = req.body;
    const projet = await Projet.findOneAndUpdate({ titre }, req.body, { new: true });
    res.status(200).json(projet);
    debug('Projet updated successfully');
  } catch (error) {
    debug('Error updating projet:', error);
    res.status(500).json({ error: 'Error updating projet' });
  }
};

// Delete a projet

exports.deleteProjet = async (req, res) => {
  try {
    debug('Deleting projet');
    const { num } = req.params;
    await Projet.deleteOne({ num });
    res.status(200).json({ message: 'Projet deleted successfully' });
    debug('Projet deleted successfully');
  } catch (error) {
    debug('Error deleting projet:', error);
    res.status(500).json({ error: 'Error deleting projet' });
  }
};