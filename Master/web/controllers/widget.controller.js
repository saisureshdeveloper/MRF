
var common_lib = require('../../../common_lib');
var logging = common_lib.logging;
var bcrypter=common_lib.bcrypter;
var Promise = require("bluebird");
const widgets = require('../../schema/admin_schema/models').widgets;
const modules = require('../../schema/admin_schema/models').modules;
const roles = require('../../schema/admin_schema/models').roles;
const features = require('../../schema/admin_schema/models').features;

var jwt=common_lib.tokenHelper

module.exports= {
  //Get a list of all widgetsss using model.findAll()
  index(req, res) {
    logging.logTheinfo("widgets index  Router");
    console.log(req.body);
    
    widgets.findAll(
      
        {}
        ).then(data=>{
          res.send(data)  
      })
  },
 
  //Get an widgetss by the unique ID using model.findById()
  show(req, res) {
    logging.logTheinfo("widgets show  Router");
    res.status(200).send("show");

  },

  
  

  //Edit an existing widgetss details using model.update()
  update(req, res) {
    logging.logTheinfo("widgets index  Router");
    res.status(200).send("update");

  },

  //Delete an existing widgetss by the unique ID using model.destroy()
  delete(req, res) {
    logging.logTheinfo("widgets delete  Router");
    res.status(200).send("delete");

  }
};