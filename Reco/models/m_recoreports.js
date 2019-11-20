/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_recoreports', {
    reportId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    reportType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    reportCategory: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    reportName: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    reportDesc: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    formatType: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    fileName: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    fileURL: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    version: {
      type: DataTypes.STRING(8),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'm_recoreports'
  });
};
