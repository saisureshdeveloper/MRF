/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_jobconfigurations', {
    jobConfigurationId: {
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
      allowNull: true,
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
    intSourceType: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    extSourceType: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    intSourceDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    extSourceDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    version: {
      type: DataTypes.STRING(4),
      allowNull: true,
      defaultValue: '1'
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'etl_jobconfigurations'
  });
};
