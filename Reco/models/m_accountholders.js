/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_accountholders', {
    accountHolderId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    accountHolderType: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    accountHolderCode: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    countryCode: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    acountHolderName: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    vendorName: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    accountNumber: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    bankCode: {
      type: DataTypes.STRING(36),
      allowNull: true
    },
    bankDetails: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'Y'
    }
  }, {
    tableName: 'm_accountholders'
  });
};
