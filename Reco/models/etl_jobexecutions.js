/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_jobexecutions', {
    jobExecutionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    jobId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'etl_jobs',
        key: 'jobid'
      }
    },
    executionStartDt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    executionEndDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    executedBy: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    executionStatus: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    totalRecordsInt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    totalRecordsExt: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    executionDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    intFromDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    intToDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    extFromDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    extToDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    recoPercentageERP: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    recoPercentageBank: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    finalRecoPercentage: {
      type: DataTypes.DECIMAL,
      allowNull: true
    }
  }, {
    tableName: 'etl_jobexecutions'
  });
};
