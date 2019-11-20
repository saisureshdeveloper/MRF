/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var orguserpreferences= sequelize.define('orguserpreferences', {
    orgUserPreferenceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    orgModuleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'orgmodules',
        key: 'orgModuleId'
      }
    },
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'users',
        key: 'userId'
      }
    },
    userPreferenceKey: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    userPreferenceDescription: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    userPreferenceValue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    }
  }, {
    tableName: 'orguserpreferences',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });

  orguserpreferences.associate=function(models) {
    orguserpreferences.belongsTo(models.users,{as: 'UserPerferance',

    foreignKey: 'userId',
    targetKey: 'userId'})
  }

  return orguserpreferences;


};
