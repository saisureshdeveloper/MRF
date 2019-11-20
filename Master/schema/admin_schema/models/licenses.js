/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('licenses', {
    licenseId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    licensedTo: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    licenseType: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    activatedOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    expiryOn: {
      type: DataTypes.DATE,
      allowNull: false
    },
    licenseDetails: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    tableName: 'licenses'
  });
};
