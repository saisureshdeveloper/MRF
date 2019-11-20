/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('userpreferences', {
    userPreferenceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    moduleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'modules',
        key: 'moduleId'
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
    tableName: 'userpreferences'
  });
};
