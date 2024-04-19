const express = require('express');
const router = express.Router();
const authWithToken = require('../middlewares/authWithToken.js');
const moi = require('../controllers/moi.js');

router.route('/')
  .get(authWithToken, moi.getMoi)
  .put(authWithToken, moi.updateMoi)
  .post(authWithToken, moi.createMoi);

router.route('/:num')
  .get( moi.getMoiByNum)
  .delete(authWithToken, moi.deleteMoi);

module.exports = router;