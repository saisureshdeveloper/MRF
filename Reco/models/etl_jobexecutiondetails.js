/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_jobexecutiondetails', {
    jobExecutionDetailId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    jobExecutionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    jobId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sequence: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    }
  }, {
    tableName: 'etl_jobexecutiondetails'
  });
};
