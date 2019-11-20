/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('m_charges', {
    chargeId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    chargeName: {
      type: DataTypes.STRING(32),
      allowNull: false,
      unique: true
    },
    chargeDescription: {
      type: DataTypes.STRING(64),
      allowNull: true
    },
    chargeType: {
      type: DataTypes.STRING(32),
      allowNull: false
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
    tableName: 'm_charges'
  });
};
