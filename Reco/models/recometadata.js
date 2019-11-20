/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recometadata', {
    metadataId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    metadataCode: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    metadataKey: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    metadataValue: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    metadataDescription: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    isSystem: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    }
  }, {
    tableName: 'recometadata'
  });
};
