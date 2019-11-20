/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('organizations', {
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    parentOrganizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    organizationName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    organizationDescription: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    organizationType: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    organizationCode: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    activeSinceDt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    deactivatedDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    businessArea: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    siteId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'sites',
        key: 'siteid'
      }
    }
  }, {
    tableName: 'organizations'
  });
};
