/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_counterparties', {
    counterPartyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    counterPartyCode: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    referenceNum: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    counterPartyName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    counterPartyDescription: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    isInternalSource: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isExternalSource: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
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
    }
  }, {
    tableName: 'm_counterparties'
  });
};
