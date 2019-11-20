/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_sourcedatamodels', {
    sourceDataModelId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_relationships',
        key: 'relationshipId'
      }
    },
    sourceEntityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    colName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    colDescription: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    colDataType: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    colSequence: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    isNull: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    isUnique: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isPrimaryKey: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isDerived: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'm_sourcedatamodels'
  });
};
