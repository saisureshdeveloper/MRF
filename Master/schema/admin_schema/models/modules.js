'use strict';
module.exports = (sequelize, DataTypes) => {
  const modules = sequelize.define('modules', {
    moduleId: {
      type: DataTypes.INTEGER,
        primaryKey: true
    },
    moduleName: DataTypes.STRING,
    moduleDescription: DataTypes.STRING,
    moduleCode: DataTypes.STRING,
    isActive: DataTypes.STRING
  }, {
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
  });
  modules.removeAttribute('id');

  modules.associate = function(models) {
    // associations can be defined here
    modules.hasMany(models.features,{
      foreignKey: 'moduleId',
      targetKey: 'moduleId'
    })

  };
  return modules;
};