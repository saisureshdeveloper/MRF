/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_extsourcedefinitions', {
    extSourceDefinitionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'm_relationships',
        key: 'relationshipid'
      }
    },
    sourceExtColPos: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    sourceExtColName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    targetTableName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    targetTableColPos: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    targetTableColName: {
      type: DataTypes.STRING(32),
      allowNull: false
    }
  }, {
    tableName: 'm_extsourcedefinitions'
  });
};
