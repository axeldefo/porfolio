const express = require('express');
const router = express.Router();
const projets = require('../controllers/projets.js');
const authWithToken = require('../middlewares/authWithToken.js');


router.route('/')
  .get( projets.getProjets)
  .post(authWithToken, projets.createProjet)
  .put(authWithToken, projets.updateProjet);
  

router.route('/:num')
  .get( projets.getProjet)
  .delete(authWithToken, projets.deleteProjet);
  
router.get('/stats/all', authWithToken, projets.stats);
module.exports = router;
