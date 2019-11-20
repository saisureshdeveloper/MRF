/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_bankaccounts', {
    bankAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    bankName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    branchCode: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    bankIFSCcode: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    bankAccountNum: {
      type: DataTypes.STRING(24),
      allowNull: false
    },
    customerRelationshipNum: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    currencyCode: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    bankAccountDescription: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    accountHolderName_1: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    accountHolderName_2: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    nomineeName: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    nomineeRelationship: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    isNomineeRegistered: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isJointAccount: {
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
    },
    branchName: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    branchLocation: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    branchAddress: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    branchState: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    accountType: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    tableName: 'm_bankaccounts'
  });
};
