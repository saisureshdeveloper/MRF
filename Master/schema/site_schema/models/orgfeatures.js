'use strict';
module.exports = (sequelize, DataTypes) => {
  const orgfeatures = sequelize.define('orgfeatures', {
    orgFeatureId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    orgModuleId: {
        type: DataTypes.INTEGER(11), // The data type defined here and 
        references: {
          model: 'orgmodules',
          key: 'orgModuleId'
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
    freezeTableName: true,
    updatedAt: false,
  });
  // orgfeatures.removeAttribute('id');

  orgfeatures.associate = function(models) {
    // associations can be defined here
    // orgfeatures.hasMany(models.users,{
    //   foreignKey: 'conversation_id',
    //   targetKey: 'conversation_id'
    // })
    orgfeatures.belongsTo(models.orgmodules,{
      as: 'Features',
      foreignKey: 'orgModuleId',
      targetKey: 'orgModuleId'
    })

    

  };
  return orgfeatures;
};