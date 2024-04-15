var express = require('express');
var router = express.Router();
var auth = require('../controllers/auth.js');
var authWithToken = require('../middlewares/authWithToken.js');


//authentification
router.post('/register', auth.register);
router.post('/login', auth.login);
router.get('/logout', auth.logout);

//profile
router.get('/profile', authWithToken, auth.profile);

module.exports = router;