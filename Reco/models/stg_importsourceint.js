/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stg_importsourceint', {
    importSourceIntId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    jobId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'etl_jobs',
        key: 'jobId'
      }
    },
    jobImportId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_relationships',
        key: 'relationshipId'
      }
    },
    recordType: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    processingStatus: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'New'
    },
    processingDateTime: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    currencyId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    referenceText_1: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_2: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_3: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_4: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_5: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_6: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_7: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_8: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_9: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_10: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_11: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_12: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_13: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_14: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceText_15: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    referenceDateTime_1: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    referenceDateTime_2: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    referenceDateTime_3: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    referenceDateTime_4: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    referenceDateTime_5: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    debitAmount: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    creditAmount: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    amount_1: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    amount_2: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    amount_3: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    amount_4: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    amount_5: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    transactionType: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    createdDateTime: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    createdByUser: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    recordDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'stg_importsourceint'
  });
};
