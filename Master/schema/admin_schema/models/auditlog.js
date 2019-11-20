/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('auditlog', {
    auditLogId: {
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
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    action: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    actionDt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    ipAddress: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    computerName: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    tableName: 'auditlog'
  });
};
