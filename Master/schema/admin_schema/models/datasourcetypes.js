/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datasourcetypes', {
    dataSourceTypeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    dataSourceTypeName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    dataSourceTypeCode: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true
    },
    dataSourceDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'datasourcetypes'
  });
};
