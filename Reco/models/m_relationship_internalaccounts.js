/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_relationship_internalaccounts', {
    relationshipInternalAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_relationships',
        key: 'relationshipid'
      }
    },
    internalAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_internalaccounts',
        key: 'internalAccountId'
      }
    },
    counterpartyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_counterparties',
        key: 'counterPartyId'
      }
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
    tableName: 'm_relationship_internalaccounts'
  });
};
