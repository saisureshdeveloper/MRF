const Sequelize = require('sequelize');
const db =require('../config_old/connection');
const roles=require('./tbl_role');

const  users = db.define('users',{
    userId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    moduleId:{
        type:Sequelize.INTEGER
    },
    roleId:{
        type:Sequelize.INTEGER
    },
    role:{
        type:Sequelize.STRING
    },
    module:{
        type:Sequelize.STRING
    },
    userName:{
        type:Sequelize.STRING
    },
    loginName:{
        type:Sequelize.STRING
    },
    userPassword:{
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
    tableName: 'users',
    
        classMethods:{
            associate:function(models){
                console.log("model",models);
            users.hasmany(models.roles, { 
                    through: 'roles',foreignKey:'roleId',
                    as: 'Roles'
                } );
                // models.roles.hasMany(models.users, { foreignKey:'roleId'} );

            }
        }
    
    // classMethods:{
    //     associate:function(models){
    //         users.belongsTo(models.roles,{foreignKey: 'roleId',targetKey: 'roleId',foreignKeyConstraint: true})
            
    //     }
    //   },
}
)
// users.associate = function(models) {
//     users.belongsTo(models.roles, {  foreignKey: {
//         name: 'roleId',
//         allowNull: false
//       }})
//   };
// users.belongsTo(roles, {foreignKey: 'roleId'});
module.exports= users;
