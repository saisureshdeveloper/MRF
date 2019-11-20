var express = require('express');
var router = express.Router();
var common_lib = require('../../../common_lib');
var logging = common_lib.logging;
var user = require('../controllers/user.controller')
var wigets = require('../controllers/widget.controller')
var site = require('../controllers/site_schema/sites.controller');
var admin = require('../controllers/admin_schema/admin.controller')

var jwt=common_lib.tokenHelper;
function ensuretoken(req,res,next)
{
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined')
  {
    const bearer= bearerHeader.split(" ");
    const bearerToken=bearer[1];
    req.token = bearerToken;
      // verifies secret and checks exp
    // jwt.verify(req.token, config.SecretKey, function(err, decoded) {
      jwt.verifyToken(req.token,function(decoded){

    if (!decoded) {
      return res.json({ success: false, message: 'Failed to authenticate token.' });       
    }
    else {
      // if everything is good, save to request for use in other routes
        console.log("decode,",decoded.user,req.headers["id"])
        if(req.headers["id"] == decoded.user)
        {
          next();
        }
        else{
          // res.sendStatus(403);
          return res.json({ error_status:403,success: false, message: 'Forbidden.' });
        }
      }
     });
    
    // next();
  }
  else
  {
    return res.json({ error_status:403,success: false, message: 'Forbidden.' });
    
  }
}


function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  } else {
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}
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
router.get('/index',user.index);

router.get('/user',user.show);
router.put('/create',user.create);
router.put('/signin',user.signin);


/* wigets api router */
router.put('/listwidgets',wigets.index);
// GettingToken= JSON.stringify(req.headers["authorization"])

// Site SChema
router.get('/listsite',ensuretoken,site.listSiteDetails);
router.put('/listmodule',site.listmoduleDetails);


//admin schema
router.put('/listmenuDetails',admin.listmenuDetails);



router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

module.exports = router