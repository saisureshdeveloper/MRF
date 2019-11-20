/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('privileges', {
    priviledgeId: {
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
    featureId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'roles',
        key: 'roleId'
      }
    },
    isCreateAllowed: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isUpdateAllowed: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isViewAllowed: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isExecuteAllowed: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isApproveAllowed: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isRejectAllowed: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    }
  }, {
    tableName: 'privileges'
  });
};
