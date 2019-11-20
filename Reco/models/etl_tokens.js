/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_tokens', {
    tokenId: {
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
      allowNull: false
    },
    executionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    taskId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    updateToken: {
      type: DataTypes.DATE,
      allowNull: false
    },
    executionCode: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    tableName: 'etl_tokens'
  });
};
