/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('extsourcedefinitions', {
    extSourceDefinitionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    sourceExtColPos: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    sourceExtColName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    targetTableName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    targetTableColPos: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    targetTableColName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    columnActionDetails: {
      type: DataTypes.JSON,
      allowNull: true
    },
    orgModuleId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'extsourcedefinitions',
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
