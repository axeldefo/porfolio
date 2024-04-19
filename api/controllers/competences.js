const comp = require('../../models/competences');
const debug = require('debug')('app:competences');

// get all competences
exports.getCompetences = async (req, res) => {
  try {
    debug('Fetching competences');
    const competences = await comp.find();
    res.status(200).json(competences);
    debug('Competences fetched successfully');
  } catch (error) {
    debug('Error fetching competences:', error);
    res.status(500).json({ error: 'Error fetching competences' });
  }
};

//create a new competence
exports.createCompetence = async (req, res) => {
  try {
    debug('Creating competence');
    const num = await comp.countDocuments()+1;
    const competence = new comp({ ...req.body, num});
    await competence.save();
    res.status(201).json(competence);
    debug('Competence created successfully');
  } catch (error) {
    debug('Error creating competence:', error);
    res.status(500).json({ error: 'Error creating competence' });
  }
};

// Update a competence
exports.updateCompetence = async (req, res) => {
  try {
    debug('Updating competence');
    const { num } = req.body;
    const competence = await comp.findOneAndUpdate({ num }, req.body, { new: true });
    res.status(200).json(competence);
    debug('Competence updated successfully');
  } catch (error) {
    debug('Error updating competence:', error);
    res.status(500).json({ error: 'Error updating competence' });
  }
};

// delete a competence
exports.deleteCompetence = async (req, res) => {
  try {
    debug('Deleting competence');
    const { num } = req.params;
    const result = await comp.deleteOne({ num });
    res.status(200).json({ message: result });
    debug(result);
  } catch (error) {
    debug('Error deleting competence:', error);
    res.status(500).json({ error: 'Error deleting competence' });
  }   
};