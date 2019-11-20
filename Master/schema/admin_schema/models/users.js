'use strict';
module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    moduleId: {
      type: DataTypes.INTEGER(11), // The data type defined here and 
      references: {
        model: 'modules',
        key: 'moduleId'
      }
    },
    roleId:{
      type: DataTypes.INTEGER(11), // The data type defined here and 
      references: {
        model: 'roles',
        key: 'roleId'
      }
    },
    role: DataTypes.STRING,
    module: DataTypes.STRING,
    userName: DataTypes.STRING,
    loginName: DataTypes.STRING,
    userPassword: DataTypes.STRING
  }, {
   
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });
  users.removeAttribute('moduleModuleId');
  // users.removeAttribute('moduleModuleId');
  
  users.associate = function(models) {
    // associations can be defined here
    users.belongsTo(models.modules,{as: 'Modules',

      foreignKey: 'moduleId',
      targetKey: 'moduleId'})
      users.belongsTo(models.roles,{as: 'Roles',

      foreignKey: 'roleId',
      targetKey: 'roleId'})
  };
  return users;
};