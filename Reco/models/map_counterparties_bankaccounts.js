/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('map_counterparties_bankaccounts', {
    mapId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    counterPartyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_counterparties',
        key: 'counterPartyId'
      }
    },
    bankAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_bankaccounts',
        key: 'bankAccountId'
      }
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
    tableName: 'map_counterparties_bankaccounts'
  });
};
