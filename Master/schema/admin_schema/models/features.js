'use strict';
module.exports = (sequelize, DataTypes) => {
  const features = sequelize.define('features', {
    featureId: {
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
    parentFeatureID:DataTypes.INTEGER,
    featureName: DataTypes.STRING,
    featureDescription: DataTypes.STRING,
    url:DataTypes.STRING,
    toolTip:DataTypes.STRING,
    featureCode:DataTypes.STRING,
    featureDisplayDetails:DataTypes.STRING,
    featureActionDetails:DataTypes.STRING,
    isActive: DataTypes.STRING
  }, {
    timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
  });
  features.removeAttribute('id');

  features.associate = function(models) {
    // associations can be defined here
    // features.hasMany(models.users,{
    //   foreignKey: 'conversation_id',
    //   targetKey: 'conversation_id'
    // })

  };
  return features;
};