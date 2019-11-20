/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_sourcedataformats', {
    sourceDataFormatId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sourceEntityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sourceInputDetailId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    sourceSectionType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    attributeName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    attributeRowPos: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    attributeColPos: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    attributeCalcPos: {
      type: DataTypes.STRING(64),
      allowNull: true
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
    tableName: 'm_sourcedataformats'
  });
};
