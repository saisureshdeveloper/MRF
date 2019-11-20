/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('widget_role', {
    widgetRoleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    widgetId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'widgets',
        key: 'widgetid'
      }
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'roles',
        key: 'roleId'
      }
    }
  }, {
    tableName: 'widget_role'
  });
};
