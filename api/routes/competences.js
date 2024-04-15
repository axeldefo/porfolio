const express = require('express');
const router = express.Router();
const authWithJWT = require('../middlewares/authWithToken.js');
const competences = require('../controllers/competences.js');

router.route('/')
  .get(authWithJWT, competences.getCompetences)
  .post(authWithJWT, competences.createCompetence)
  .put(authWithJWT, competences.updateCompetence)
  .delete(authWithJWT, competences.deleteCompetence);

module.exports = router;