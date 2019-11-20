/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_posts', {
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    postFileName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    postFileURL: {
      type: DataTypes.STRING(512),
      allowNull: false
    },
    postFileSize: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    postApprovedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    postApprovedDatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    totalRecords: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    totalDebits: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    totalCredits: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    postCreatedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    postCreatedDatetime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    recordDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 't_posts'
  });
};
