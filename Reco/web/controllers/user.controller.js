
var common_lib = require('common_lib');
var logging = common_lib.logging;
var bcrypter=common_lib.bcrypter;


module.exports= {
  //Get a list of all Userss using model.findAll()
  index(req, res) {
    logging.logTheinfo("user index  Router");
    res.status(200).send("Index");
    
  },
  //Logging User method
  signin(req,res){
    logging.logTheinfo("user signin  Router");

    res.status(200).send("signin");
    
  },

  //Get an Users by the unique ID using model.findById()
  show(req, res) {
    logging.logTheinfo("user show  Router");
    res.status(200).send("show");

  },

  //Create a new Users using model.create()
  create(req, res) {
    logging.logTheinfo("user create  Router");

    bcrypter.encryptPassword("sample",function(result)
    {
      // console.log("result",result)
      encrypt.push(result);
      logging.logTheinfo(result)

      var obj={
          status:"true",
          data:result
      }
     
    res.send("create",obj);
    });
  },

  //Edit an existing Users details using model.update()
  update(req, res) {
    logging.logTheinfo("user index  Router");
    res.status(200).send("update");

  },

  //Delete an existing Users by the unique ID using model.destroy()
  delete(req, res) {
    logging.logTheinfo("user delete  Router");
    res.status(200).send("delete");

  },

};