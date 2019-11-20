var common_lib = require('../../../../common_lib');
var logging = common_lib.logging;
var bcrypter=common_lib.bcrypter;
var Promise = require("bluebird");
const sites = require('../../../schema/site_schema/models').sites;
const orgModules=require('../../../schema/site_schema/models').orgmodules;

module.exports= {

    
  listSiteDetails(req, res) {
    logging.logTheinfo("site list value index  Router");
    sites.findAll(
        {
    
         attributes: ['siteId','siteName','siteCode']
        }).then(data=>{
            res.send(data)  
        });

  },
  listmoduleDetails(req, res) {
    logging.logTheinfo("orgModules list value index  Router");

    orgModules.findAll(
        {
            where:{
                organizationId:req.body.orgId,
                siteId:req.body.siteId,
                isActive:'Y'

            },
            order: [
                ['orgModuleId', 'ASC']]
        
        }).then(data=>{
            res.send(data)  
        });

  },
}