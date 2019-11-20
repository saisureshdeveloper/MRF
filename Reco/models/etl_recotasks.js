/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_recotasks', {
    TaskId: {
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
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_relationships',
        key: 'relationshipid'
      }
    },
    parentTaskId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'etl_recotasks',
        key: 'TaskId'
      }
    },
    ruleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'etl_recorules',
        key: 'ruleId'
      }
    },
    taskName: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    phase: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    taskType: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    sequence: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    onSuccess: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    onError: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'etl_recotasks'
  });
};
