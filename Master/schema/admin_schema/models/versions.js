/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('versions', {
    versionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    versionNumber: {
      type: DataTypes.STRING(16),
      allowNull: true,
      unique: true
    },
    minorVersion: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    majorVersion: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    buildVersion: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    versionDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'versions'
  });
};
