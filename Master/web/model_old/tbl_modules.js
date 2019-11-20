const Sequelize = require('sequelize');
const db =require('../config_old/connection');
const roles=require('./tbl_role');

const  modules = db.define('modules',{
    moduleId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    moduleName:{
        type:Sequelize.STRING
    },
    moduleDescription:{
        type:Sequelize.STRING
    },
    moduleCode:{
        type:Sequelize.STRING
    },
    isActive:{
        type:Sequelize.STRING
    }
},
{
    timestamps: false,

    // don't delete database entries but set the newly added attribute deletedAt
    // to the current date (when deletion was done). paranoid will only work if
    // timestamps are enabled
    paranoid: false,
  
    // don't use camelcase for automatically added attributes but underscore style
    // so updatedAt will be updated_at
    underscored: false,
  
    // disable the modification of tablenames; By default, sequelize will automatically
    // transform all passed model names (first parameter of define) into plural.
    // if you don't want that, set the following
    freezeTableName: true,
  
    // define the table's name
    tableName: 'modules',
    
        classMethods:{
            associate:function(models){
                console.log("model",models);
              
                // models.roles.hasMany(models.modules, { foreignKey:'roleId'} );

            }
        }
    
    // classMethods:{
    //     associate:function(models){
    //         modules.belongsTo(models.roles,{foreignKey: 'roleId',targetKey: 'roleId',foreignKeyConstraint: true})
            
    //     }
    //   },
}
)
// modules.associate = function(models) {
//     modules.belongsTo(models.roles, {  foreignKey: {
//         name: 'roleId',
//         allowNull: false
//       }})
//   };
// modules.belongsTo(roles, {foreignKey: 'roleId'});
module.exports= modules;
