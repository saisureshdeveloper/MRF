var express = require('express');
var router = express.Router();
var common_lib = require('../../../common_lib');
var logging = common_lib.logging;
var ERP = require('../controllers/ERP.controller');
var bank = require('../controllers/Bank.controller')
var commonctrl= require('../controllers/common.controller')
var jwt=common_lib.tokenHelper;

var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = 'D:\\project_structure\\MRF\\uploads\\';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo

// Multer storage options
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, DIR);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});
var upload = multer({ storage: storage }).single('excel');

function ensuretoken(req,res,next)
{
  const bearerHeader = req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined')
  {
    const bearer= bearerHeader.split(" ");
    const bearerToken=bearer[1];
    req.token = bearerToken;
    console.log("bearerHeader",bearerHeader)
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
    console.log("bearerHeader",bearerHeader)

    return res.json({ error_status:403,success: false, message: 'Forbidden.' });
    
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


router.post('/Erpvolume',ensuretoken,ERP.Erpvolume)
router.post('/ERP',ensuretoken,ERP.list);
router.put('/getWidgetsData',ensuretoken,ERP.getWidgetsData);
router.get('/listrelationship',ensuretoken,commonctrl.listbankname);
router.get('/listtypesofOrder',ensuretoken,commonctrl.listOrder);

router.put('/query',ensuretoken,commonctrl.getQuery);
router.post('/getTableValueByQuery',ensuretoken,ERP.getTableValueByQuery)
router.post('/getBankTableValueByQuery',ensuretoken,bank.getBankTableValueByQuery)
router.post('/FindRecordByReferance',ensuretoken,bank.FindRecordByReferance)



router.post('/bank',ensuretoken,bank.list);
//our file upload function.
router.post('/upload', commonctrl.uploadExcel )
router.get('/uploadsummary',ensuretoken, commonctrl.uploadSummary )

router.post('/MatchingRecord',ensuretoken, commonctrl.MatchingRecord )
router.post('/ClosedRecord',ensuretoken, commonctrl.ClosedRecord )
router.post('/CancelRecord',ensuretoken, commonctrl.CancelRecord )
router.post('/RollOverRecord', ensuretoken,commonctrl.RollOverRecord )
router.post('/FindRecordByGroupId', ensuretoken,commonctrl.FindRecordByGroupId )

router.post('/AddContract',ensuretoken, commonctrl.AddContract )
router.post('/DeletedContract',ensuretoken, commonctrl.DeletedContract )
router.post('/AddReferanceNumber',ensuretoken, commonctrl.AddReferanceNumber )






router.post('/getRecordByGroupID',ensuretoken, commonctrl.getRecordByGroupID )
router.post('/findingContractValueByderviedCol',ensuretoken,commonctrl.findingContractValueByderviedCol)


// function (req, res, next) {
//   var path = '';
//   upload(req, res, function (err) {
//      if (err) {
//        // An error occurred when uploading
//        console.log(err);
//        return res.status(422).send("an Error occured")
//      }  
//     // No error occured.
//      path = req.file.path;
//      return res.send("Upload Completed for "+path); 
// });     
// }

module.exports = router