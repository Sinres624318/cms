var express = require('express');
var router = express.Router();
var userControl = require('../control/user');

router.post('/',userControl.login);

module.exports = router;