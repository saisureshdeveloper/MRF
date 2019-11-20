/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_recoreports', {
    recoReportId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    reportId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_recoreports',
        key: 'reportId'
      }
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    generatedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    generatedDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    duration: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    reportName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    fileName: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    fileURL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    comments: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'Y'
    },
    parameters: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 't_recoreports'
  });
};
