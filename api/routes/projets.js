const express = require('express');
const router = express.Router();
const projets = require('../controllers/projets.js');
const authWithToken = require('../middlewares/authWithToken.js');


router.route('/')
  .get(authWithToken, projets.getProjets)
  .post(authWithToken, projets.createProjet)
  .put(authWithToken, projets.updateProjet)
  .delete(authWithToken, projets.deleteProjet);

module.exports = router;
