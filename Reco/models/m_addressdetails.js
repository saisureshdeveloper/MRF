/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_addressdetails', {
    addressDetailId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    unitType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    unitId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    addressType: {
      type: DataTypes.STRING(32),
      allowNull: false
    },
    address_1: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    address_2: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    address_3: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    city: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    state: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    country: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    pincode: {
      type: DataTypes.STRING(8),
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
    tableName: 'm_addressdetails'
  });
};
