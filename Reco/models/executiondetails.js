/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('executiondetails', {
    executionDetailsId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    executionLogId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    intSourceDataId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    extSourceDataId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    recoStatus: {
      type: DataTypes.STRING(16),
      allowNull: true,
      defaultValue: 'Open'
    },
    recoCategory: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    recoSubCategory: {
      type: DataTypes.STRING(16),
      allowNull: true
    }
  }, {
    tableName: 'executiondetails'
  });
};
