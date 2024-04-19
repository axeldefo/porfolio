const Projet = require('../../models/projets.js');
const Stats = require('../../models/stats.js');
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
    const { num } = req.body;
    const projet = await Projet.findOneAndUpdate({ num }, req.body, { new: true });
   
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
    const result = await Projet.deleteOne({ num });
    if(result) await Projet.updateMany(
      { num: { $gt: parseInt(num) } }, // Trouvez les projets avec un numéro supérieur à celui supprimé
      { $inc: { num: -1 } } // Décrémentez leur numéro de 1
    );
    res.status(200).json({ message: result });
    debug(result);
  } catch (error) {
    debug('Error deleting projet:', error);
    res.status(500).json({ error: 'Error deleting projet' });
  }
};

// Get stats
exports.stats = async (req, res) => {
  try {
    debug('Fetching stats');

    // Fetch all projects
    const projets = await Projet.find();

    // Initialize empty stats object
    let stats = {};

    // Calculate stats
    if (projets.length > 0) {
      stats.totalProjects = projets.length;

      // Top keywords
      stats.topKeywords = await calculateTopKeywords(projets);

      // Top technologies
      stats.topTechnologies = await calculateTopTechnologies(projets);

      // Full percentage projects
      stats.fullPercentageProjects = projets.filter(projet => projet.pourcentage === 100).map(projet => ({ title: projet.titre }));

      // Projects by year
      stats.projectsByYear = await calculateProjectsByYear(projets);
    }

    // Update or create Stats document
    const existingStats = await Stats.findOne();
    if (existingStats) {
      await Stats.findOneAndUpdate({}, stats, { new: true }); // Update existing document
    } else {
      const newStats = new Stats(stats);
      await newStats.save(); // Create new document
    }

    res.status(200).json(stats);
    debug('Stats fetched successfully');
  } catch (error) {
    debug('Error fetching stats:', error);
    res.status(500).json({ error: 'Error fetching stats' });
  }
};

// Helper functions for stat calculation

async function calculateTopKeywords(projets) {
  const allKeywords = projets.flatMap(projet => projet.motsCles);
  const keywordCounts = {};

  allKeywords.forEach(keyword => {
    keywordCounts[keyword] = (keywordCounts[keyword] || 0) + 1;
  });

  const topKeywords = Object.entries(keywordCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, 3) // Take top 3
    .map(([keyword, count]) => ({ keyword, count }));

  return topKeywords;
}

async function calculateTopTechnologies(projets) {
  const allTechnologies = projets.flatMap(projet => projet.technologies);
  const technologyCounts = {};

  allTechnologies.forEach(technology => {
    technologyCounts[technology] = (technologyCounts[technology] || 0) + 1;
  });

  const topTechnologies = Object.entries(technologyCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .slice(0, 5) // Take top 5
    .map(([technology, count]) => ({ technology, count }));

  return topTechnologies;
}

async function calculateProjectsByYear(projets) {
  const projectsByYear = {};

  projets.forEach(projet => {
    const year = projet.annee;
    projectsByYear[year] = (projectsByYear[year] || 0) + 1;
  });

  return Object.entries(projectsByYear).map(([year, count]) => ({ year, count }));
}