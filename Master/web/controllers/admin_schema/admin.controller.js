var common_lib = require('../../../../common_lib');
var logging = common_lib.logging;
var bcrypter=common_lib.bcrypter;
var Promise = require("bluebird");
const features = require('../../../schema/admin_schema/models').features;

module.exports= {

    
  listmenuDetails(req, res) {
    logging.logTheinfo("features list value index  Router");
    features.findAll(
        {
            where:{
                moduleId:req.body.moduleId
            }
        }).then(data=>{
            res.send(data)  
        });

  }
}