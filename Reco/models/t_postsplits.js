/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_postsplits', {
    splitId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    intRecordsId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    extRecordsId: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_relationships',
        key: 'relationshipId'
      }
    },
    internalAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'm_internalaccounts',
        key: 'internalAccountId'
      }
    },
    transactionType: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    splitAmount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    isDeleted: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    sequence: {
      type: DataTypes.INTEGER(6),
      allowNull: false
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
    tableName: 't_postsplits'
  });
};
