
var common_lib = require('../../../common_lib');
var logging = common_lib.logging;
var bcrypter=common_lib.bcrypter;
var Promise = require("bluebird");
const mrelationships = require('../../models').m_relationships;
const ERP = require('../../models').t_intrecords;
const Bank = require('../../models').t_extrecords;
const tableContrcts=require('../../models').t_contracts;

const db = require('../../models');
const order = require('../../models').m_lookups;
var multer = require('multer');

const recosettings = require('../../models').recosettings;
const dataimports = require('../../models').etl_dataimports;

var sys = require('sys')
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;
var async =  require('async');
var recoresults = require('../../models').t_recoresults
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var dt=new Date();
var ERPController = require('../controllers/ERP.controller');



var moment= require('moment');
module.exports= {
    //Get a list of all mrelationshipsss using model.findAll()
    listbankname(req, res) {
      logging.logTheinfo("mrelationships index  Router");
      
      mrelationships.findAll(
        {
        }).then(data=>{
            res.send(data)  
        })
    },
    listOrder(req,res)
    {
      logging.logTheinfo("listing lookups table value");
      
      order.findAll(
        {
            where:{
                // processingStatus:'Open'
                // referenceDateTime_1: {
                //     // lte: moment().subtract(7, 'days').toDate()
                //     $lt: new Date()
                //   }
            }
            // offset: 0, // <--- OFFSET
            // limit: 8000 // <--- LIMIT
         
          // attributes: ['moduleId', 'roleId','module','bankName','bankId']
        }).then(data=>{
            res.send(data)  
        })
    },
    getQuery(req,res)
    { 
      var key=req.body.query.query;
      console.log("key",key)
        var query= key+" ) a group by a.ContractYear , a.ContractMonth order by  1 desc;" ;
        console.log("query",query)
      
        db.sequelize
            .query(query, {
                model: ERP,
                mapToModel: true // pass true here if you have any mapped fields
            })
            .then(data => {
                var s = data
                console.log("record,",data)
                if(data.length == 0)
                {
                  var obj={
                    label:[],
                    data:[]
                }
                res.send(obj) 
                }
                //console.log("s",s)
                var keys = [];
                var set=[]
                // for(var k in s.dataValues){ keys.push(k);}
                // for (let i = 0; i < keys.length; i++) {
                //     //console.log("sasas",keys[i],s.dataValues[(keys[i]).toString()])
                //     set.push(parseInt(s.dataValues[(keys[i]).toString()]))
                // }

                for (let i = 0; i < data.length; i++) {
                  keys.push(data[i].dataValues.label)
                  set.push(data[i].dataValues.value)
                  
                }
                var obj={
                    label:keys,
                    data:set
                }
                res.send(obj) 
                // Each record will now be an instance of Project
            })
    },
    uploadExcel(req,res)
    {
    //   var path = '';
     
      // obj.where.processingStatus='Open';
      // bankid:bank,
      // CatgeroyType:type,
     

        
            // Multer storage options
            var storage = multer.diskStorage({
                destination: function(req, file, cb) {
            //console.log("obj",req.body)
             // formData:formData
             var obj={};
             obj.where={};
                    if(req.body.bankid)
                    {
                        obj.where.relationshipId=parseInt(req.body.bankid);
                    }
                    if(req.body.CatgeroyType)
                    {
                        obj.where.settingKey=req.body.CatgeroyType;
                    }
                    recosettings.findOne(obj).then(data=>{
                        //console.log("uploading strating",data)
                        // set the directory for the uploads to the uploaded to
                        // var DIR =data.settingValue
                        cb(null, data.settingValue);
                        //define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
                
                    })
                
                },
                filename: function(req, file, cb) {
                  cb(null, file.originalname);
                }
              });
              var upload = multer({ storage: storage }).single('excel');
              // res.send(data)  
              upload(req, res, function (err) {
                if (err) {
                  // An error occurred when uploading
                  //console.log(err);
                  return res.status(422).send("an Error occured")
                }  
                // No error occured.
                //console.log("req.file",req.file)
                var child;
                    // executes `pwd`
                    child = exec(  ' start cmd /k ExecuteRecoETL.bat', function (error, stdout, stderr) {
                    sys.print('stdout: ' + stdout);
                    sys.print('stderr: ' + stderr);
                    if (error !== null) {
                        //console.log('exec error: ' + error);
                    }
                    
                    });
                    // spawn('', ['start cmd /k ExecuteRecoETL.bat'], {
                    //     detached: true
                    // });
                    var path = req.file.path;
                    return res.send("Upload Completed for "+path); 
               
            });   
          
       
    },
    uploadSummary(req,res)
    {
        dataimports.findAll()
        .then(data=>
        {
            res.send(data)
        })
    },
    MatchingRecord(req,res)
    {
        //console.log(req.body)
        // relationID:
        async.waterfall([
            function firstStep(done) {
              //console.log('start!');
              if(!req.body.relationID)
              {
                // res.status(406).end('userName and password does not match.');
                return res.status(406).end("Relation ship Id could not find here")

              }
                recosettings.findOne({
                    where:{
                        relationshipId:parseInt(req.body.relationID),
                        settingKey:"GroupSeqId"
                    }
                }).then(data=>{
                    // res.status(200).send(data)  
                    done(null, data);
                })
             // <- set value to passed to step 2
            },
            function secondStep(recosettingdata, done) {
              //console.log(recosettingdata,req.body);
              // var BankData=req.body.bank;
              var dt=new Date();
              var BankUpdatedData=req.body.bank;
              var ContractUpdatedData=req.body.contract;
              if((BankUpdatedData.length>0) && (ContractUpdatedData.length>0))
              {
                async.parallel({
                  task1: function(callback) {
                    BankUpdatedData.forEach(element => {

                      Bank.update({
                        groupId:recosettingdata.settingValue,
                        processingStatus:"Matched",
                         lastUpdatedBy:req.headers["username"],
                        lastUpdatedDt:dt
                      }, {
                        where: {
                          extRecordsId: element.extRecordsId
                        }
                      }).then(bank=>{
                          //console.log("BAnk YApdat",bank)
                      });
                    })
                      callback(null,"values")
                  
                     
                  },
                  task2: function(callback) {
                    ContractUpdatedData.forEach(element => {
                      ERP.update({
                        groupId:recosettingdata.settingValue,
                        processingStatus:"Matched",
                         lastUpdatedBy:req.headers["username"],
                        lastUpdatedDt:dt
                      }, {
                        where: {
                          intRecordsId: element.intRecordsId
                        }
                      }).then(fc=>{
                        //console.log("fc YApdat",fc)
                    });
                    })
                      callback(null,"values")
                
                    }
                }, function(err, results) {
                  //console.log("step is working Fine",results);
                  // results now equals to: { task1: 1, task2: 2 }
                });
                done(null, recosettingdata); // <- set value to passed to step 3
              }
              else{
                res.status(500).send("bank or Fc Value os empty");
              }
              
            },
            function thirdStep (recosettingdata, done) {
              console.log("req.body.contract",req.body.contract.length,req.body.bank.length);
              var ContractUpdatedData=req.body.contract;
              var BankUpdatedData=req.body.bank;

              let obj ={};
              obj.groupId=recosettingdata.settingValue;
              obj.relationshipId=req.body.relationID;
              obj.recoCategory="SYSTEM-MATCHED";
              obj.processedBy=3;
              obj.intRecordId=parseInt(req.body.contract[0].intRecordsId);
              obj.recoStatus="MATCHED";
              obj.ruleReference="DIRECT MATCHED BY THE USER";
              obj.jobExecutionId=req.body.relationID;
              tableContrcts.findAll({
                where:{
                  intRecordId:ContractUpdatedData[0].intRecordsId
                }
                }).then(data=>{
                  console.log("contract dtae",data)
                  var contractData=data;
                // res.status(200).send(data)  
                for (let i = 0; i < req.body.bank.length; i++) {
                  obj.extRecordId= parseInt(req.body.bank[i].extRecordsId);
                  obj.contractId=parseInt(data[i].contractId);
                  console.log("obj",obj);
                  recoresults.create(obj).then(data=>{
                    console.log('data')}
                  )
                  
                }
              // BankUpdatedData.forEach(element => {
              //   obj.extRecordId=element.extRecordId;
              //   recoresults.create(obj).then(data=>{
              //     //console.log(data)}
              //   )
                
              // });
              recosettings.update({
                settingValue:parseInt(recosettingdata.settingValue) +1,
              
              }, {
                where: {
                  relationshipId:parseInt(req.body.relationID),
                  settingKey:"GroupSeqId"
                }
              }).then(data=>{
                  //console.log("BAnk YApdat",bankres
                  res.status(200).send("matched Successfully")
              });
               
            })
              
          
              done(null); // <- no value set for the next step.
            }
          ],
          function (err) {
            if (err) {
              throw new Error(err);
            } else {
              //console.log('No error happened in any steps, operation done!');
            }
          });
    },
    UnMatchingRecord(req,res)
    {
        //console.log(req.body)
        // relationID:
        async.waterfall([
            function firstStep(done) {
              //console.log('start!');
              if(!req.body.relationID)
              {
                // res.status(406).end('userName and password does not match.');
                return res.status(406).end("Relation ship Id could not find here")

              }
                recosettings.findOne({
                    where:{
                        relationshipId:parseInt(req.body.relationID),
                        settingKey:"GroupSeqId"
                    }
                }).then(data=>{
                    // res.status(200).send(data)  
                    done(null, data);
                })
             // <- set value to passed to step 2
            },
            function secondStep(recosettingdata, done) {
              //console.log(recosettingdata,req.body);
              // var BankData=req.body.bank;
              var dt=new Date();
              var BankUpdatedData=req.body.bank;
              var ContractUpdatedData=req.body.contract;
              if((BankUpdatedData.length>0) && (ContractUpdatedData.length>0))
              {
                async.parallel({
                  task1: function(callback) {
                    BankUpdatedData.forEach(element => {

                      Bank.update({
                        groupId:recosettingdata.settingValue,
                        processingStatus:"Opened",
                         lastUpdatedBy:req.headers["username"],
                        lastUpdatedDt:dt
                      }, {
                        where: {
                          extRecordsId: element.extRecordsId
                        }
                      }).then(bank=>{
                          //console.log("BAnk YApdat",bank)
                      });
                    })
                      callback(null,"values")
                  
                     
                  },
                  task2: function(callback) {
                    ContractUpdatedData.forEach(element => {
                      ERP.update({
                        groupId:recosettingdata.settingValue,
                        processingStatus:"Opened",
                         lastUpdatedBy:req.headers["username"],
                        lastUpdatedDt:dt
                      }, {
                        where: {
                          intRecordsId: element.intRecordsId
                        }
                      }).then(fc=>{
                        //console.log("fc YApdat",fc)
                    });
                    })
                      callback(null,"values")
                
                    }
                }, function(err, results) {
                  //console.log("step is working Fine",results);
                  // results now equals to: { task1: 1, task2: 2 }
                });
                done(null, recosettingdata); // <- set value to passed to step 3
              }
              else{
                res.status(500).send("bank or Fc Value os empty");
              }
              
            },
            function thirdStep (recosettingdata, done) {
              console.log("req.body.contract",req.body.contract.length,req.body.bank.length);
              var ContractUpdatedData=req.body.contract;
              var BankUpdatedData=req.body.bank;

              let obj ={};
              obj.groupId=recosettingdata.settingValue;
              obj.relationshipId=req.body.relationID;
              obj.recoCategory="SYSTEM-OPENED";
              obj.processedBy=3;
              obj.intRecordId=parseInt(req.body.contract[0].intRecordsId);
              obj.recoStatus="OPENED";
              obj.ruleReference="DIRECT MATCHED BY THE USER";
              obj.jobExecutionId=req.body.relationID;
              tableContrcts.findAll({
                where:{
                  intRecordId:ContractUpdatedData[0].intRecordsId
                }
                }).then(data=>{
                  console.log("contract dtae",data)
                  var contractData=data;
                // res.status(200).send(data)  
                for (let i = 0; i < req.body.bank.length; i++) {
                  obj.extRecordId= parseInt(req.body.bank[i].extRecordsId);
                  obj.contractId=parseInt(data[i].contractId);
                  console.log("obj",obj);
                  recoresults.create(obj).then(data=>{
                    console.log('data')}
                  )
                  
                }
              // BankUpdatedData.forEach(element => {
              //   obj.extRecordId=element.extRecordId;
              //   recoresults.create(obj).then(data=>{
              //     //console.log(data)}
              //   )
                
              // });
              recosettings.update({
                settingValue:parseInt(recosettingdata.settingValue) +1,
              
              }, {
                where: {
                  relationshipId:parseInt(req.body.relationID),
                  settingKey:"GroupSeqId"
                }
              }).then(data=>{
                  //console.log("BAnk YApdat",bankres
                  res.status(200).send("matched Successfully")
              });
               
            })
              
          
              done(null); // <- no value set for the next step.
            }
          ],
          function (err) {
            if (err) {
              throw new Error(err);
            } else {
              //console.log('No error happened in any steps, operation done!');
            }
          });
    },
    getRecordByGroupID(req,res)
    { 
      async.waterfall([
        function firstStep(done) {
          //console.log('start!');
          // if(!req.body.relationID)
          // {
          //   // res.status(406).end('userName and password does not match.');
          //   return res.status(406).end("Relation ship Id could not find here")

          // }
          ERP.findAll({
            where: {
              groupId: req.body.groupId
            }
          }).then(data=>{
              //console.log("BAnk YApdat",bank)
              done(null,data)
          });
         // <- set value to passed to step 2
        },
        function secondStep(ERP, done) {
          Bank.findAll({
            where: {
              groupId: req.body.groupId
            }
          }).then(data=>{
              //console.log("BAnk YApdat",bank)
              done(null,ERP,data)
          });
          
        },
        function thirdStep (ERP,Bank, done) {
          recoresults.findAll({
            where: {
              groupId: req.body.groupId
            }
          }).then(data=>{
              //console.log("BAnk YApdat",bank)
              var obj={
                resoresult:data,
                ERP:ERP,
                Bank:Bank
              }
              res.status(200).send(obj);
              // callback(null,"")
          });
      
          done(null); // <- no value set for the next step.
        }
      ],
      function (err) {
        if (err) {
          throw new Error(err);
        } else {
          //console.log('No error happened in any steps, operation done!');
        }
      });

    },
    findingContractValueByderviedCol(req,res)
    {
    //   {
    //   [Op.in]: arrayofTaskId
    // }
      var intrecid=req.body.intrecid;
      tableContrcts.findAll(
        {
          where:{
            intrecordid:intrecid,
            isUserAllocated:'Y'

          }
        }
      )
      .then(data=>{

        res.status(200).send(data)
      })
    },
    CancelRecord(req,res)
    {
      var dt=new Date();

      console.log("req.body.intRecordId",req.body.intRecordId)

      var intRecordId=req.body.intRecordId;
      if(!intRecordId)
        return res.status(500).send("intRecordId is required")
      ERP.update({
        // groupId:recosettingdata.settingValue,
        contractStatus:"Cancelled",
         lastUpdatedBy:req.headers["username"],
        lastUpdatedDt:dt
      },{
        where: {
          intRecordsId: intRecordId
        }
      }).then(data=>{
        var obj={
          message:"Record is Cancelled"
        }
          res.status(200).send(obj);
      });
    },
    ClosedRecord(req,res)
    {
      var dt=new Date();

      console.log("req.body.intRecordId",req.body.intRecordId)
      var intRecordId=req.body.intRecordId;
      if(!intRecordId)
        return res.status(200).send("intRecordId is required")
      ERP.update({
        // groupId:recosettingdata.settingValue,
        contractStatus:"Closed",
         lastUpdatedBy:req.headers["username"],
        lastUpdatedDt:dt
      },{
        where: {
          intRecordsId: intRecordId
        }
      }).then(data=>{  
        logging.logTheinfo("Record is Closed",intRecordId);
        var obj={
          message:"Record is Closed"
        }
          res.status(200).send(obj);
      });
    },
    
    RollOverRecord(req,res)
    {
      var intRecordsId=req.body.intRecordsId;
      var targetnumber=req.body.targetnumber;
      if(!intRecordsId && !targetnumber)
         return res.status(500).send("intRecordId  & targetnumberis required")

         async.waterfall([
          function firstStep(done) {
            tableContrcts.findAll({
              where:{
                referenceText_3:targetnumber
              }
            }).then(val=>{
              console.log("val",val)
              if(val.length > 0)
              {
                done(null,intRecordsId,targetnumber,val);
              }
              else{
                res.status(200).send({
                  flag:false,
                  message:"Number is not available"
                })
              }
            })
           
              
          },
          function secondStep(intRecordsId,targetnumber,result, done) {
            var dt=new Date();
            tableContrcts.update({
            
              targetContractNumber:targetnumber,
              lastUpdatedDt:dt
            }, {
              where: {
                intRecordId: intRecordsId,
                processingStatus:"Matched"
              }
            }).then(data=>{
                console.log("second",data)
                done(null,intRecordsId,targetnumber,result);
            });
            
          },
          function thirdStep (intRecordsId,targetnumber,result, done) {

           tableContrcts.findAll({
              where:{
                targetContractNumber:targetnumber
              }
            }).then(val=>{
              console.log("thrid val",val)
              var gettingamount=0;
              if(val.length > 0)
              {
              var totalcontractvalue=val[0].amount_2;
              console.log("totalcontractvalue",totalcontractvalue)

                for (let i = 0; i < val.length; i++) {
                  gettingamount=gettingamount+(val[i].amount_3?parseFloat(val[i].amount_3):0);
                  if(i == (val.length-1) )
                  {
                    var calculatedValue=totalcontractvalue-gettingamount;
                    console.log("calculatedValue",calculatedValue)
                    var amount_2=parseFloat(calculatedValue)+ parseFloat( result[0].amount_2);
                    console.log("result[0].amount_2;",result[0].amount_2)

                    console.log("amount_2",amount_2)

                    tableContrcts.update({
            
                      amount_2:parseFloat(amount_2),
                      pendingAmount:parseFloat(amount_2),
                      lastUpdatedDt:dt
                    }, {
                      where: {
                        referenceText_3:targetnumber
                      }
                    }).then(data=>{
                        //console.log("BAnk YApdat",bank)
                        ERP.update({
            
                          contractStatus:"Closed",
                          lastUpdatedDt:dt
                        }, {
                          where: {
                            intRecordsId:intRecordsId
                          }
                        }).then(data=>{

                          res.status(200).send({
                            flag:true,
                            message:"Rollover is compledted"
                          })
                        })
                       

                        done(null,data);
                    });
                  }
                  
                }
                // done(null,intRecordsId,targetnumber);
              }
              else{
                res.status(200).send({
                  flag:false,
                  message:"no match record Found"
                })
              }
            })
          }
        ],
        function (err) {
          if (err) {
            throw new Error(err);
          } else {
            //console.log('No error happened in any steps, operation done!');
          }
        });



    },

    FindRecordByGroupId(req,res)
    {
      var groupId=req.body.groupId;
      if(!req.body.groupId)
          return res.status(400).send("Group id is missing")

          async.waterfall([
            function firstStep(done) {
              Bank.findAll({
                where:{
                  groupId:groupId
                }
              }).then(val=>{
                console.log("val",val)
               
                  done(null,val);
                
               
              })
             
                
            },
            function secondStep(Bank, done) {
              ERP.findAll({
                where:{
                  groupId:groupId
                }
              }).then(val=>{
                console.log("val",val)
               
                  done(null,Bank,val);
                
               
              })
              
            },
            function thirdStep (BankData,ERPData, done) {
                var obj={
                  Bank:BankData,
                  ERP:ERPData
                }
                res.status(200).send(obj);
             
            }
          ],
          function (err) {
            if (err) {
              throw new Error(err);
            } else {
              //console.log('No error happened in any steps, operation done!');
            }
          });

    },

    AddContract(req,res)
    {
      // console.log("req.body",req.body)
      tableContrcts.findAll(
        {
          where:{
            intRecordId:req.body.parent.intRecordsId
          }
        }).then(data=>{
            // res.send(data)  
            var obj={};
            obj=req.body.parent;
            obj.intRecordId=req.body.parent.intRecordsId;
            obj.allocatedBy=3
            obj.referenceText_4=req.body.formData.ReferanceNumber;
            obj.amount_3=req.body.formData.Allocatedamount;
            obj.amount_4=req.body.formData.ExchangeRate;
            obj.allocatedDate=req.body.formData.AllocatedDate;
            obj.isUserAllocated='Y'
            obj.sequenceNumber=parseInt(data.length) + 1 ;
            // console.log("obj",obj);
            tableContrcts.create(obj).then(data=>{
              // console.log('data',data)
              ERPController.updatePendingAmount(req,res);
              var obj={
                data:data
              }
              res.status(200).send(obj);
      
            }
            )
        })
     
    },
    DeletedContract(req,res)
    { var dt =new Date();
      tableContrcts.update({
        isUserAllocated:'N',
         lastUpdatedBy:req.headers["username"],
        lastUpdatedDt:dt
      }, {
        where: {
          contractId: req.body.contractId
        }
      }).then(data=>{
        var obj={
          data:data
        }
        ERPController.updatePendingAmount(req,res);
        res.status(200).send(obj);
      }); 
    },
    AddReferanceNumber(req,res)
    {
      var text=req.body.text;
      if(!req.body.text)
          return res.status(400).send("Referance Number is missing")
      var dt =new Date();
      
      ERP.update({
        derivedCol_2:text,
        flag:'N',
         lastUpdatedBy:req.headers["username"],
        lastUpdatedDt:dt
      }, {
        where: {
          intRecordsId: req.body.intRecordsId
        }
      }).then(data=>{
        var obj={
          data:data
        }
        res.status(200).send(obj);
      }); 
    }

}