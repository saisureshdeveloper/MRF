
var common_lib = require('../../../common_lib');
var logging = common_lib.logging;
var bcrypter=common_lib.bcrypter;
var Promise = require("bluebird");
const User = require('../../schema/site_schema/models').users;
const features = require('../../schema/site_schema/models').orgfeatures;
const orgroles = require('../../schema/site_schema/models').orgroles;
const modules = require('../../schema/site_schema/models').orgmodules;
const orgperferance = require('../../schema/site_schema/models').orguserpreferences;
const widgets = require('../../schema/site_schema/models').widgets;
const intsourcedefinitions = require('../../schema/site_schema/models').intsourcedefinitions;

const extsourcedefinitions = require('../../schema/site_schema/models').extsourcedefinitions;
// const bcrypt = require('bcryptjs');




var jwt=common_lib.tokenHelper

module.exports= {
  //Get a list of all Userss using model.findAll()
  index(req, res) {
    logging.logTheinfo("user index  Router");
    
    User.findAll(
      {
      //   include: [
      //     { 
      //       model: modules,
      //       as: 'Modules',
      //       include:[
      //         {
      //           model:features
      //         }
      //       ]
      //   },{ 
      //     model: roles,
      //     as: 'Roles'
      // }
      // ]
        // attributes: ['moduleId', 'roleId','module','userName','userId']
      }).then(data=>{
          res.send(data)  
      })
  },
  //Logging User method
  signin(req,res){
    logging.logTheinfo("user signin  Router");
    
    var username= req.body.username;
    var password = req.body.password;
    if((req.body.username)&&(req.body.password))
    {
      User.findOne(
        {
          where:{
            loginName:req.body.username
          },
          include:[ 
            { 
            model:orgroles,
            as: 'Roles',
            include:[
              {
              model:modules,
               as: 'Modules',
               include:[ 
                { 
                model:features,
                as: 'Features'},
                { 
                  model:widgets,
                  as: 'widgets'},
                  { 
                    model:extsourcedefinitions,
                    as: 'BankTable'},
                    { 
                      model:intsourcedefinitions,
                      as: 'ERPTable'}
                ]
                
            }
            ]
          },
          {
            model:orgperferance,
            as: 'UserPerferance',
          }
        ]
          
          // attributes: ['moduleId', 'roleId','module','userName','userId']
        }
      )
      .then(data=>{
       
        if (data) {
       
          bcrypter.checkPassword(req.body.password, data.password, (result) => {
            console.log("flag result",result)
            if (result) {

              // var token = jwt.sign({ user: data.userId }, 'ADVENT KEY12345@', {
              //     expiresIn: 86400 // expires in 24 hours
              //   });
              var tokendata = []
              const gettingtoken = new Promise(
                (resolve, reject) => { // fat arrow
                  //Encrypt Password by using bcrypter
                  var processingData = jwt.createToken({
                    user: data.userId
                  })
                  tokendata.push(processingData);
                  if (processingData) {
                    resolve(processingData);
                  } else {
                    const reason = new Error('Token is not genearate');
                    reject(reason);
                  }
                }
              );
              gettingtoken
                .then((tokendata) => {
                  data.password=""
                  return res.send({
                    "status": true,
                    "code": 200,
                    "success": "login sucessfull",
                    "data":  data,
                    "token": tokendata
                  });
                })
              // var token = jwt.createToken({ user: data.userId })
              // console.log("token",token);



            } else {
              res.status(406).end('userName and password does not match.');
              // res.status(406);
              // res.send({
              //   "code":406,
              //   "status":false,
              //   "success":"userName and password does not match"
              //     });
            }
          })


        } else {
          res.status(406);
          res.send({
            "code": 406,
            "status": false,
            "success": "userName does not exits"
          });
        }
      })
      .catch(err =>{
        // handle error;
        console.log(err)
        var err = new Error('You must be logged in to view this page.');
        err.status = 401;
        // return next(err);
        res.status(401);
        res.send({
          "code":401,
          "status":false,
          "failed":err
        })
      });

    }
    else{
      res.status(406);
      res.send({
        "code":406,
        "status":false,
        "success":"some field does not exits"
          });
    }
  
 
    // User.findAll()
    // .then(data=>{
    //     console.log("data",data)
    //    return res.status(200).send(data);        
    //     //  product;
    // })
  },

  //Get an Users by the unique ID using model.findById()
  show(req, res) {
    logging.logTheinfo("user show  Router");
    res.status(200).send("show");

  },

  //Create a new Users using model.create()
  create(req, res) {
    var encryptpass=[];
    if ((req.body.userEmail && req.body.userName && req.body.password)) {
      
     
         var passval;
        bcrypter.encryptPassword(req.body.password,function(result)
        {
          console.log("result",result)
          passval=result;
          var userData={};
        userData=req.body;
        userData.password=passval;
          // var userData = {    // assign the value to object
          //   email: req.body.email,
          //   userName: req.body.username,
          //   password:encryptPassword[0],
          // }
          //use schema.create to insert data into the db
          console.log("userData",userData,passval)
          User.create(userData).then(data=>{
            res.send(data)  
        })
          //   if (err) {
          //     return res.status(200).send(err);
          //   } else {
          //     logging.logTheinfo("user create  Router");
          //      return res.status(200).send("show");
          //     // return res.redirect('/profile');
          //   }
          // });
        });
        
          // logging.logTheinfo("user create  Router",userData);
          // return res.redirect('/profile');
     
    }
    else{
      return res.status(500).send("field is required");
    }

  },
  //Edit an existing Users password details using model.update()
  resetpassword(req, res) {
    logging.logTheinfo("user index  Router");
    res.status(200).send("Resset passwordm");

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

  }
};