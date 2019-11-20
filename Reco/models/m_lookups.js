/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_lookups', {
    lookupId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    lookupKey: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lookupValue: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lookupDescription: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'Y'
    },
    isSystem: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    }
  }, {
    tableName: 'm_lookups',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });
};
