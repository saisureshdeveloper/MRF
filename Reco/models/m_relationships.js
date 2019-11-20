/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_relationships', {
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    relationshipName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    relationshipCode: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    counterPartyId_1: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_counterparties',
        key: 'counterPartyId'
      }
    },
    counterPartyId_2: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'm_counterparties',
        key: 'counterPartyId'
      }
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'm_relationships',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });
};
