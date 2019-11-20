/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('settings', {
    settingId: {
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
    settingKey: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    settingDescription: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    settingValue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    }
  }, {
    tableName: 'settings'
  });
};
