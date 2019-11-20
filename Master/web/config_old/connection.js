const Sequelize = require('sequelize');

const db = new Sequelize('admin', 'root', 'reco123@', {
  host: 'localhost',
  dialect:'mysql' ,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    //prevent sequelize from pluralizing table names
    freezeTableName: true
}
});


module.exports=db;