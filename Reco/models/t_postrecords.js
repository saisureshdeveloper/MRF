/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_postrecords', {
    postRecordId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    intRecordId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    extRecordId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    postId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 't_posts',
        key: 'postid'
      }
    },
    docType: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    docDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(4),
      allowNull: true
    },
    costCenter: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    businessArea: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    sourceAccount: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    targetAccount: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    sourceTransactionType: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    targetTransactionType: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    postText_1: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    postText_2: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    postText_3: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    postText_4: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    postText_5: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    postDate_1: {
      type: DataTypes.DATE,
      allowNull: true
    },
    postDate_2: {
      type: DataTypes.DATE,
      allowNull: true
    },
    narration: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING(1024),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isConfirmed: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      defaultValue: 'N'
    },
    isReconciled: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    confirmedBy: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    confirmedOn: {
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
    tableName: 't_postrecords'
  });
};
