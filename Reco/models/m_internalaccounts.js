/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_internalaccounts', {
    internalAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    parentAccountId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'm_internalaccounts',
        key: 'internalAccountId'
      }
    },
    category: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    referenceNum: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    internalAccounName: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    internalAccounDescription: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    lastUpdatedBy: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    lastUpdatedDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'm_internalaccounts'
  });
};
