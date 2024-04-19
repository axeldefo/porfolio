const express = require('express');
const router = express.Router();
const parcours = require('../controllers/parcours.js');
const authWithToken = require('../middlewares/authWithToken.js');


router.route('/')
  .get( parcours.getParcours)
  .post(authWithToken, parcours.createParcours)
  .put(authWithToken, parcours.updateParcours);

router.route('/:num')
  .delete(authWithToken, parcours.deleteParcours)
  .get(parcours.getParcoursByNum);

module.exports = router;