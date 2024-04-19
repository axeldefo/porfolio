const moiSchema = require('../../models/moi.js');
const debug = require('debug')('app:moi');

// get all moi
exports.getMoi = async (req, res) => {
  try {
    debug('Fetching moi');
    const moi = await moiSchema.find();
    res.status(200).json(moi);
    debug('Moi fetched successfully');
  } catch (error) {
    debug('Error fetching moi:', error);
    res.status(500).json({ error: 'Error fetching moi' });
  }
};

//getmoibynum
exports.getMoiByNum = async (req, res) => {
  try{
    debug('Fetching moi by num');
    const { num } = req.params;
    const moi = await moiSchema.findOne({ num });
    if (moi) {
      res.status(200).json(moi);
      debug('Moi fetched successfully');
    } else {
      res.status(404).json({ error: 'Moi not found' });
    } 
  }catch (error) {
    debug('Error fetching moi:', error);
    res.status(500).json({ error: 'Error fetching moi' });
  }
};

//create a new moi
exports.createMoi = async (req, res) => {
  try {
    debug('Creating moi');
    const num = await moiSchema.countDocuments() + 1;
    const moi = new moiSchema({ ...req.body, num});
    await moi.save();
    res.status(201).json(moi);
    debug('Moi created successfully');
  } catch (error) {
    debug('Error creating moi:', error);
    res.status(500).json({ error: 'Error creating moi' });
  }
};

// Update a moi
exports.updateMoi = async (req, res) => {
  try {
    debug('Updating moi');
    const { num } = req.body;
    const moi = await moiSchema.findOneAndUpdate({ num }, req.body, { new: true });
    res.status(200).json(moi);
    debug('Moi updated successfully');
  }
  catch (error) {
    debug('Error updating moi:', error);
    res.status(500).json({ error: 'Error updating moi' });
  }
};

// delete a moi
exports.deleteMoi = async (req, res) => {
  try {
    debug('Deleting moi');
    const { num } = req.params;
    const result = await moiSchema.deleteOne({ num});
    res.status(200).json({ message: result });
    debug(result);
  }
  catch (error) {
    debug('Error deleting moi:', error);
    res.status(500).json({ error: 'Error deleting moi' });
  }
};

