/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('t_contracts', {
    contractId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    intRecordId:{
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    relationshipId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    processingDateTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referenceText_3: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    amount_2: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    amount_3: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    allocatedDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    allocatedBy: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    sequenceNumber:{
       type: DataTypes.INTEGER(11),
      allowNull: false
    },
    pendingAmount: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    referenceText_5: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    referenceDateTime_1: {
      type: DataTypes.DATE,
      allowNull: true
    },
    referenceText_4: {
      type: DataTypes.STRING(64),
      allowNull: false
    },
    targetContractNumber:{
      type: DataTypes.STRING(64),
      allowNull: true
    },
    processingStatus: {
      type: DataTypes.STRING(16),
      allowNull: false,
      defaultValue: 'New'
    },
    isUserAllocated: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    amount_4: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    createdDt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    createdByUser: {
      type: DataTypes.STRING(32),
      allowNull: false
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
    tableName: 't_contracts',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
  });
};
