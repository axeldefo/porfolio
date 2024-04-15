const express = require('express');
const router = express.Router();
const authWithToken = require('../middlewares/authWithToken.js');
const moi = require('../controllers/moi.js');

router.route('/')
  .get(authWithToken, moi.getMoi)
  .post(authWithToken, moi.createMoi)
  .put(authWithToken, moi.updateMoi)
  .delete(authWithToken, moi.deleteMoi);

module.exports = router;