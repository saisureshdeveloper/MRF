
var common_lib = require('../../../common_lib');
var logging = common_lib.logging;
var bcrypter=common_lib.bcrypter;
var Promise = require("bluebird");
const db = require('../../models');

const ERP = require('../../models').t_intrecords;
const t_contracts = require('../../models').t_contracts;
const tableContrcts=require('../../models').t_contracts;


const models = require('../../models')
const Moment = require('moment');
const MomentRange = require('moment-range');
 
const moment = MomentRange.extendMoment(Moment);
const Op = models.Sequelize.Op;
const sequelize = models.Sequelize;


module.exports= {
    Erpvolume(req, res) {
      var obj={};
      obj.where={};
      obj.where.processingStatus='Open';
      if(req.body.relationId)
      {
        obj.where.relationshipId=parseInt(req.body.relationId);
      }
      if(req.body.columnname && req.body.findtext)
      { 
        obj.where[req.body.columnname]={
            [Op.like]:'%'+req.body.findtext+'%'

        
      }

      }

      ERP.count(obj).then(data=>{
          var value={
            COUNT:data
          };
            res.send(value)  
        })
    }
    ,
    //Get a list of all ERPss using model.findAll()
    list(req, res) {
      logging.logTheinfo("ERP index  Router");
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
        obj.order=[['intRecordsId', 'ASC']];
        obj.offset= skip;
        obj.limit= count;

console.log("obj*******",obj)
      ERP.findAll(obj).then(data=>{
            res.send(data)  
        })
    },
    getWidgetsData(req, res)
    {
      // var startDate = moment(new Date(), 'MM-DD-YYYY')
      //  var endDate = startDate.subtract(30, "days");
      var startDate = moment('2019-06-01');
      var endDate = moment('2019-07-01 ');
      // const range = moment.range(startDate, endDate)
      // const arrayOfDates = Array.from(range.by('days'))
      // console.log(arrayOfDates)

      function getDateArray(start, end) {
        var arr = [];
        var dt = new Date(start);
        var dtend = new Date(end);
        while (dt <= dtend) {
  
          arr.push(new Date(dt));
          dt.setDate(dt.getDate() + 1);
        }
        return arr;
      }

      var dateArr=getDateArray(startDate,endDate);
        var obj={};
        obj.where={};
        obj.where.processingStatus='Open';
        obj.where.referenceDateTime_1={
          [Op.between]: [new Date('2019-06-01'), new Date()]
        };
        if(req.body.relationshipId)
        {
          obj.where.relationshipId=req.body.relationshipId
        }
        obj.attributes=['referenceDateTime_1',  [sequelize.fn('COUNT', 'referenceDateTime_1'), 'DateCount'] ]
        obj.group=['referenceDateTime_1']
            ERP.findAll(obj).then(data => {
               return res.send(data)

               /**
                * {
              where: {
                processingStatus: 'Open',
                // intRecordsId: {
                //   [Op.between]:[164805,164815]
                // }
                referenceDateTime_1: {
                  [Op.between]: [new Date('2019-06-01'), new Date()]
                }
  
                // referenceDateTime_1: {
  
                //   "$between": ["2018-03-31T21:00:00.000Z","2018-05-30T05:23:59.007Z"]
                //   // between: [startDate, endDate]
                //     // lte: moment().subtract(7, 'days').toDate()
                //     // $lt: new Date()
                //   }
              },
              attributes: ['referenceDateTime_1',
                [sequelize.fn('COUNT', 'referenceDateTime_1'), 'DateCount']
              ],
              group: ['referenceDateTime_1']
              // offset: 0, // <--- OFFSET
              // limit: 30, // <--- LIMIT,
              // order: "referenceDateTime_1" 
              // order: [['referenceDateTime_1', 'DESC']],
  
              // attributes: ['referenceDateTime_1']
            }
                * 
                */
              // console.log("data",data[1].referenceDateTime_1)
              //   var result = [];
              // for (var k = 0; k < dateArr.length; k++) {
              //   for (var l = 0; l < data.length; l++) {
              //    console.log(   dateArr[k] ,"+", data[l].referenceDateTime_1,(new Date(dateArr[k]).getTime() === new Date(data[l].referenceDateTime_1).getTime()));
              //     if (dateArr[k] === data[l].referenceDateTime_1) {
              //       var obj = {};
              //       obj.date = dateArr[k];
              //       obj.value = data[l].DateCount
              //       result.push(obj);
              //     } 
              //     // else {
              //     //   var obj = {};
              //     //   obj.date = dateArr[k];
              //     //   obj.value = 0;
              //     //   result.push(obj);
              //     // }
              //   }
              //   if ((dateArr.length - 1) == k) {
              //     res.send(result)
  
              //   }
              // }
            })
        
    
     
    },

    getTableValueByQuery(req,res)
    {
        var query=req.body.query;
        db.sequelize
            .query(query, {
                model: ERP,
                mapToModel: true // pass true here if you have any mapped fields
            })
            .then(data => {
               
                res.send(data) 
                // Each record will now be an instance of Project
            })
    },
    AddRecordTContract(req,res)
    {
      t_contracts.bulkCreate(data)
      .then(function(response){
          res.json(response);
      })
      .catch(function(error){
          res.json(error);
      })
    },
    updatePendingAmount(req,res)
    {
      var obj={}
      console.log("req.body",req.body.parent.intRecordsId)
      tableContrcts.findAll(
        {
          where:{
            intRecordId:req.body.parent.intRecordsId,
            isUserAllocated:'Y'
          }
        }).then(data=>{
          var pendingamount=0;
          var derviedCol="";
          if(data.length>0)
          {
            var SumofAmount= data.reduce((a, b) => a + parseFloat((b.amount_3 || 0)), 0);
            pendingamount=parseFloat((req.body.parent.amount_2 - SumofAmount));
            derviedCol= data.reduce(function(prevVal,currVal,idx){
              return idx == 0 ? currVal.referenceText_4 : prevVal + ', ' + currVal.referenceText_4;
          }, '')

            console.log("happy",req.body.parent.amount_2,
            pendingamount,derviedCol)
          }
          else{
            pendingamount=req.body.parent.amount_1;
            derviedCol=null;
          }
          ERP.update({
            pendingAmount:pendingamount,
            derivedCol_2:derviedCol,
            flag:'Y',
          }, {
            where: {
              intRecordsId: req.body.parent.intRecordsId
            }
          }).then(data=>{
            var obj={
              data:data
            }
            console.log("Updated cool",obj)

            // res.status(200).send(obj);
          }); 
        })

      // ERP.count(obj).then(data=>{
      //   var value={
      //     COUNT:data
      //   };
      //     // res.send(value)  
      //     console.log("value",value)
      //     return;
      // })
    }
  



}