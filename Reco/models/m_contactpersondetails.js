/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_contactpersondetails', {
    contactPersonDetailId: {
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
    contactPersonName: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    contactPersonPhone_1: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    contactPersonPhone_2: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    contactPersonEmail_1: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    contactPersonEmail_2: {
      type: DataTypes.STRING(24),
      allowNull: true
    },
    designation: {
      type: DataTypes.STRING(64),
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
    tableName: 'm_contactpersondetails'
  });
};
