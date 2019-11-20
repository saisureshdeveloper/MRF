/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('widgets', {
    widgetId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    moduleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'modules',
        key: 'moduleId'
      }
    },
    module: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    widgetName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    widgetDescription: {
      type: DataTypes.STRING(256),
      allowNull: false
    },
    widgetCode: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true
    },
    widgetSequence: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    widgetType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    widgetActionDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    widgetDataSourceDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    widgetDisplayDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    widgetChartDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'widgets',
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
