/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('messages', {
    messageId: {
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
    messageCode: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    messageValue: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    }
  }, {
    tableName: 'messages'
  });
};
