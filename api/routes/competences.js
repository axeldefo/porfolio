const express = require('express');
const router = express.Router();
const authWithJWT = require('../middlewares/authWithToken.js');
const competences = require('../controllers/competences.js');

router.route('/')
  .get( competences.getCompetences)
  .put(authWithJWT, competences.updateCompetence)
  .post(authWithJWT, competences.createCompetence);

router.route('/:num')
  .delete(authWithJWT, competences.deleteCompetence);

module.exports = router;