/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('datasourcecategories', {
    dataSourceCategoryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    dataSourceCategoryName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    dataSourceCategoryCode: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'datasourcecategories'
  });
};
