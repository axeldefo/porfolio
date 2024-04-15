const parcoursSchema = require('../../models/parcours');
const debug = require('debug')('app:parcours');

// Get all parcours
exports.getParcours = async (req, res) => {
  try {
    debug('Fetching parcours');
    const parcours = await parcoursSchema.find();
    res.status(200).json(parcours);
    debug('Parcours fetched successfully');
  } catch (error) {
    debug('Error fetching parcours:', error);
    res.status(500).json({ error: 'Error fetching parcours' });
  }
};

// Get a parcours by titre
exports.getParcoursByNum = async (req, res) => {
  try {
    debug('Fetching parcours');
    const { num } = req.params;
    const parcours = await parcoursSchema.findOne({ num });
    if (parcours) {
      res.status(200).json(parcours);
      debug('Parcours fetched successfully');
    } else {
      res.status(404).json({ error: 'Parcours not found' });
    }
  } catch (error) {
    debug('Error fetching parcours:', error);
    res.status(500).json({ error: 'Error fetching parcours' });
  }
};

// Create a new parcours
exports.createParcours = async (req, res) => {
  try {
    debug('Creating parcours');
    const num = await parcoursSchema.countDocuments()+1;
    const parcours = new parcoursSchema({...req.body, num });
    await parcours.save();
    res.status(201).json(parcours);
    debug('Parcours created successfully');
  } catch (error) {
    debug('Error creating parcours:', error);
    res.status(500).json({ error: 'Error creating parcours' });
  }
};

// Update a parcours
exports.updateParcours = async (req, res) => {
  try {
    debug('Updating parcours');
    const { num } = req.body;
    const parcours = await parcoursSchema.findOneAndUpdate ({ num }, req.body, { new: true });
    res.status(200).json(parcours);
    debug('Parcours updated successfully');
  } catch (error) {
    debug('Error updating parcours:', error);
    res.status(500).json({ error: 'Error updating parcours' });
  }
};

// Delete a parcours
exports.deleteParcours = async (req, res) => {
  try {
    debug('Deleting parcours');
    const { num } = req.params;
    await parcoursSchema.deleteOne({ num });
    res.status(200).json({ message: 'Parcours deleted successfully' });
    debug('Parcours deleted successfully');
  } catch (error) {
    debug('Error deleting parcours:', error);
    res.status(500).json({ error: 'Error deleting parcours' });
  }
};



