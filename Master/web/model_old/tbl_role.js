const Sequelize = require('sequelize');
const db =require('../config_old/connection');
const users = require('./tbl_user')
const  roles = db.define('roles',{
    roleId:{
        type:Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    moduleId:{
        type:Sequelize.INTEGER
    },
    moduleCode:{
        type:Sequelize.STRING
    },
    roleName:{
        type:Sequelize.STRING
    },
    roleCode:{
        type:Sequelize.STRING
    },
    roleDescription:{
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
    tableName: 'roles',
    classMethods:{
        associate:function(models){
            // models.users.belongsTo(models.roles, { foreignKey:'roleId'} );
        roles.belongTO(models.users, { foreignKey:'roleId'} );

        }
    }
}
)
// roles.associate = function(models) {
//     roles.hasMany(models.users)
//   };
// roles.hasMany(users);
// roles.belongTo(users,{foreignKey: 'roleId'})

module.exports= roles;
