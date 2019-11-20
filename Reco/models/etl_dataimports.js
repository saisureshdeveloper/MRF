/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_dataimports', {
    importId: {
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
    counterPartyId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_counterparties',
        key: 'counterpartyid'
      }
    },
    jobId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'etl_jobs',
        key: 'jobid'
      }
    },
    sourceType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    extractionType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    fileType: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    relationshipName: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    bankName: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    downloadURL: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    fileSizeBytes: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    referenceFromDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    referenceToDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    rowCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    processingStatus: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    processingDatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    validationStatus: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    isProcessed: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isDeleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isZipped: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isEncrypted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
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
    Filepath: {
      type: DataTypes.STRING(5000),
      allowNull: true
    }
  }, {
    tableName: 'etl_dataimports',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });
};
