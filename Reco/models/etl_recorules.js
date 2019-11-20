/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('etl_recorules', {
    ruleId: {
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
    relationshipCode: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    ruleType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    ruleDescription: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    ruleCode: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    executionCode: {
      type: DataTypes.STRING(64),
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
    tableName: 'etl_recorules'
  });
};
