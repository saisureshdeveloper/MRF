/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_sourceentities-notused', {
    sourceEntityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    counterPartyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'm_counterparties',
        key: 'counterPartyId'
      }
    },
    entityType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    entityName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    entityCode: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'm_sourceentities-notused'
  });
};
