/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_sourceinputdetails', {
    sourceInputDetailId: {
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
    inputType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    inputFileName: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    inputFileLocation: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    inputFileExtension: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    inputFileSizeKB: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    inputFileSheetCount: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    inputDbName: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    inputDbServerName: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    isZipped: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isEncrypted: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isPassword: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    userName: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'm_relationships',
        key: 'relationshipId'
      }
    }
  }, {
    tableName: 'm_sourceinputdetails'
  });
};
