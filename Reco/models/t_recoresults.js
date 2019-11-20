/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_recoresults', {
    recoResultId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'm_relationships',
        key: 'relationshipId'
      }
    },
    intRecordId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    contractId:{
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    extRecordId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    jobExecutionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    recoStatus: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    recoCategory: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    recoSubCategory: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    isAutoApproved: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    processedDt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    processedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    ruleReference: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    groupId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    groupedRecords: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 't_recoresults',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });
};
