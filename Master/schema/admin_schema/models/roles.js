'use strict';
module.exports = function(sequelize, DataTypes) {
  var roles = sequelize.define('roles', {

    roleId:{
        type:DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    moduleId:{
        type:DataTypes.INTEGER
    },
    moduleCode:{
        type:DataTypes.STRING
    },
    roleName:{
        type:DataTypes.STRING
    },
    roleCode:{
        type:DataTypes.STRING
    },
    roleDescription:{
        type:DataTypes.STRING
    },
    isActive:{
        type:DataTypes.STRING
    }
  }, {
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        roles.belongTo(models.users);

      }
    }
  });
  return roles;
};