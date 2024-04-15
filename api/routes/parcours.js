const express = require('express');
const router = express.Router();
const parcours = require('../controllers/parcours.js');
const authWithToken = require('../middlewares/authWithToken.js');


router.route('/')
  .get(authWithToken, parcours.getParcours)
  .post(authWithToken, parcours.createParcours)
  .put(authWithToken, parcours.updateParcours);

router.route('/:num')
  .delete(authWithToken, parcours.deleteParcours)
  .get(authWithToken, parcours.getParcoursByNum);

module.exports = router;