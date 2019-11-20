/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_recoexecutionlog', {
    logId: {
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
    executionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    taskId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'etl_recotasks',
        key: 'taskid'
      }
    },
    startDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    rowCount: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING(1024),
      allowNull: true
    }
  }, {
    tableName: 'etl_recoexecutionlog'
  });
};
