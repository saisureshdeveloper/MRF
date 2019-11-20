/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_jobimports', {
    jobImportId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
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
        key: 'relationshipid'
      }
    },
    jobId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'etl_jobs',
        key: 'jobid'
      }
    },
    jobExecutionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    jobConfigurationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dataSourceTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    importDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    importedBy: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    importStatus: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    errorDescription: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    importDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'etl_jobimports'
  });
};
