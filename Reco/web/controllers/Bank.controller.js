
var common_lib = require('../../../common_lib');
var logging = common_lib.logging;
var bcrypter=common_lib.bcrypter;
var Promise = require("bluebird");
const bank = require('../../models').t_extrecords;
const db = require('../../models');
var moment= require('moment');
module.exports= {
    //Get a list of all bankss using model.findAll()
    list(req, res) {
      logging.logTheinfo("bank index  Router");
      var count;
      var skip;

      if(req.body.limit)
      {
        count=parseInt(req.body.limit);
      }
      else{
        count=25
      }
      if(req.body.offset)
      {
        skip= parseInt((req.body.offset)*( count))
      }
      else{
        skip=0;
      }
      var obj={};
        obj.where={};
        // obj.where.processingStatus='Open';
        if(req.body.relationId)
        {
          obj.where.relationshipId=parseInt(req.body.relationId);
        }
        if(req.body.classification_1)
        {
          obj.where.classification_1=req.body.classification_1;
        }
        if(req.body.columnname && req.body.findtext)
        { 
          obj.where[req.body.columnname]={
              [Op.like]:'%'+req.body.findtext+'%'

          
        }

        }
        obj.order=[['extRecordsId', 'ASC']];
        obj.offset= skip;
        obj.limit= count;
      
      bank.findAll(
        obj).then(data=>{
            res.send(data)  
        })
    },

    getBankTableValueByQuery(req,res)
    {
        var query=req.body.query;
        db.sequelize
            .query(query, {
                model: bank,
                mapToModel: true // pass true here if you have any mapped fields
            })
            .then(data => {
               
                res.send(data) 
                // Each record will now be an instance of Project
            })
    },

    FindRecordByReferance(req,res)
    {
        if(req.body.ref)
        {
          var str =req.body.ref ;
          var arr = str.split(",");
          console.log("arr dplit",arr)
          bank.findAll(
            {
              where:{
                referenceText_4:arr
              }
            }).then(data=>{
                res.status(200).send(data)  
            })
        }
        else{
          res.status(200).send("Required Field is needed");

        }
    }
   
}