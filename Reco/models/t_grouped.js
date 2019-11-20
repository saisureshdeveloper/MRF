/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_grouped', {
    groupId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    intRecordId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    extRecordId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    groupType: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    groupSubType: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    isMatched: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isDeleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 't_grouped'
  });
};
