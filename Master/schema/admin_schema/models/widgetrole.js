/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('widgetrole', {
    widgetRoleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    widgetId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'widgetrole'
  });
};
