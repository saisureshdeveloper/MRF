/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_recoassignments', {
    recoAssignments: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    taskCode: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    queueCode: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    taskStatus: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    recoResultId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 't_posts',
        key: 'postId'
      }
    },
    intRecordsId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    extRecordsId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    assignedDt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    processedDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    processedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    }
  }, {
    tableName: 't_recoassignments'
  });
};
