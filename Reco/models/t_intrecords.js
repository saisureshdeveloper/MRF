/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_intrecords', {
    intRecordsId: {
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
    jobExecutionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
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
    sourceRowId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    currencyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    recordType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    transactionType: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    transactionSubType: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    orderStatus: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'New'
    },
    contractStatus: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'New'
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
    referenceText_1: {
      type: DataTypes.STRING(512),
      allowNull: true,
      unique: true
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
      type: DataTypes.DATE,
      allowNull: true
    },
    referenceDateTime_2: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referenceDateTime_3: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referenceDateTime_4: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referenceDateTime_5: {
      type: DataTypes.DATE,
      allowNull: true
    },
    debitAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    creditAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount_1: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount_2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount_3: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount_4: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount_5: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    recordDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    derivedCol_1: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_2: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_3: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_4: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_5: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_6: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_7: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_8: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_9: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_10: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_11: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    derivedCol_12: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    pendingAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    isSplit: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isMarkedForPosting: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isMatched: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isDeleted: {
      type: DataTypes.CHAR(16),
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
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    extRecordId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    groupId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    contraId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    classification_1: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    classification_2: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    classification_3: {
      type: DataTypes.STRING(32),
      allowNull: true
    }, 
     flag: {
      type: DataTypes.STRING(32),
      allowNull: true
    }
  }, {
    tableName: 't_intrecords',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });
};
