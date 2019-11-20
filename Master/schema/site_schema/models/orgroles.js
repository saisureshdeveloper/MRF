/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var orgroles= sequelize.define('orgroles', {
    orgRoleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    siteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    orgModuleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'orgmodules',
        key: 'orgModuleId'
      }
    },
    roleCode: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    roleName: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'orgroles',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
    

  });

 orgroles.associate=function(models) {
    orgroles.hasMany(models.users,{
      foreignKey: 'orgRoleId',
      targetKey: 'orgRoleId'
    }),
    orgroles.belongsTo(models.orgmodules,{
      as: 'Modules',
      foreignKey: 'orgModuleId',
      targetKey: 'orgModuleId'
    })
  }

    return orgroles;
};
