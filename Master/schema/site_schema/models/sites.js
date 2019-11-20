/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sites', {
    siteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    siteName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    siteCode: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    EndDate: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'sites',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        // roles.belongTo(models.users);

      }
    }
  });
};
