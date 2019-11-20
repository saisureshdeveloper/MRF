/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_internalbankaccounts', {
    internalBankAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    internalAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_internalaccounts',
        key: 'internalAccountId'
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
    tableName: 'm_internalbankaccounts'
  });
};
