/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('settings', {
    settingId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    settingKey: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    settingDescription: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    settingValue: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'settings'
  });
};
