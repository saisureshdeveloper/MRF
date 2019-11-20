var express = require('express');
var router = express.Router();
var common_lib = require('../../../common_lib');
var logging = common_lib.logging;
var user = require('../controllers/user.controller')
// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// define the home page route
router.get('/', (req, res)=> {
    logging.logTheinfo("good")
    res.send('Master Api')
  
})
router.get('/user',user.show);

module.exports = router