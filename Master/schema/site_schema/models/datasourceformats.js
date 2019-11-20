/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datasourceformats', {
    dataSourceFormatId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    dataSourceName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    dataSourceType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    dataSourceFormatDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    dataSourceAuthDetails: {
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
    tableName: 'datasourceformats'
  });
};
