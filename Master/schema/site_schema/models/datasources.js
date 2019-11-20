/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datasources', {
    dataSourceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    parentEntityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    subEntityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    moduleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    dataSourceName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    dataSourceDescription: {
      type: DataTypes.STRING(256),
      allowNull: true
    },
    dataSourceCategoryName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    dataSourceTypeName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    senderDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    dataSourceDetails: {
      type: DataTypes.JSON,
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
    lastUpdateDt: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
    tableName: 'datasources'
  });
};
