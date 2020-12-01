const express = require('express');
const router = express.Router();
const userAuth = require('../controller/userAuth')
const configEmail = require('../controller/sendEmail')
router.get('/validation', userAuth.getSub).post('/signin', userAuth.signin).post('/signup', userAuth.signup).get('/fetchUser', userAuth.fetchUser);

router.get('/sendEmail',configEmail.sendEmail)
module.exports = router;