/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var orgmodules= sequelize.define('orgmodules', {
    orgModuleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    siteId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'sites',
        key: 'siteid'
      }
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'organizations',
        key: 'organizationId'
      }
    },
    moduleCode: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    moduleName: {
      type: DataTypes.STRING(32),
      allowNull: false
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
    tableName: 'orgmodules',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // roles.belongTo(models.users);

      }
    }
  });
  orgmodules.associate=function(models) {
    // associations can be defined here
    // orgmodules.belongTo(models.users);
    orgmodules.hasMany(models.orgfeatures,{
     as:'Features',
     foreignKey:'orgModuleId',
     targetKey: 'orgModuleId'

    })
    orgmodules.hasMany(models.widgets,{
      as:'widgets',
      foreignKey:'orgModuleId',
      targetKey: 'orgModuleId'
 
     })
     orgmodules.hasMany(models.extsourcedefinitions,{
      as:'BankTable',
      foreignKey:'orgModuleId',
      targetKey: 'orgModuleId'
 
     })
     orgmodules.hasMany(models.intsourcedefinitions,{
      as:'ERPTable',
      foreignKey:'orgModuleId',
      targetKey: 'orgModuleId'
 
     })
    
  }
  return orgmodules;
};
