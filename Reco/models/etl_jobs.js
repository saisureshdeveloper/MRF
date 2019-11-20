/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_jobs', {
    jobId: {
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
    activeSinceDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    jobName: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastExecutionDt: {
      type: DataTypes.DATE,
      allowNull: true
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
    tableName: 'etl_jobs'
  });
};
