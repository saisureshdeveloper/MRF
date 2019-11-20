/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var users= sequelize.define('users', {
    userId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    siteId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'sites',
        key: 'siteId'
      }
    },
    organizationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'organizations',
        key: 'organizationId'
      }
    },
    orgRoleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'orgroles',
        key: 'orgRoleId'
      }
    },
    systemRole: {
      type: DataTypes.STRING(32),
      allowNull: true
    },
    userName: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true
    },
    loginName: {
      type: DataTypes.STRING(16),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    userEmail: {
      type: DataTypes.STRING(32),
      allowNull: true,
      unique: true
    },
    activeSinceDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    deactivatedDt: {
      type: DataTypes.DATE,
      allowNull: true
    },
    loginAttempts: {
      type: DataTypes.INTEGER(6),
      allowNull: true,
      defaultValue: '0'
    },
    status: {
      type: DataTypes.STRING(16),
      allowNull: true
    },
    isSystemUser: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    isLocked: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    isActive: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'Y'
    },
    isPasswordExpired: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      defaultValue: 'N'
    },
    lastLoginDt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'users',
    paranoid: false,
    underscored: false,
    freezeTableName: true,
    timestamps: false,
    updatedAt: false,
    
    classMethods: {
      associate: function(models) {
        
      users.belongsTo(models.orgroles,{as: 'Roles',
  
        foreignKey: 'orgRoleId',
        targetKey: 'orgRoleId'})
        // associations can be defined here
        // roles.belongTo(models.users);

      }
    }
  });

  users.associate=function(models) {
        
    users.belongsTo(models.orgroles,{as: 'Roles',

      foreignKey: 'orgRoleId',
      targetKey: 'orgRoleId'}),
      users.hasMany(models.orguserpreferences,{
      as: 'UserPerferance',
      foreignKey: 'userId',
      targetKey: 'userId'})
      // associations can be defined here
      // roles.belongTo(models.users);

    }
    return users;
};
// Order.associate = models => {
//   Order.belongsTo(models.Customer);
// };