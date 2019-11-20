/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('rules', {
    ruleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    moduleName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    ruleName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    ruleType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    ruleCode: {
      type: DataTypes.STRING(16),
      allowNull: true,
      unique: true
    },
    ruleDescription: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    ruleDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'rules'
  });
};
