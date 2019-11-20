/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('recosettings', {
    settingId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    settingKey: {
      type: DataTypes.STRING(128),
      allowNull: false
    },
    settingDescription: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    settingValue: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'm_relationships',
        key: 'relationshipId'
      }
    },
    isSystem: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    }
  }, {
    tableName: 'recosettings',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });
};
