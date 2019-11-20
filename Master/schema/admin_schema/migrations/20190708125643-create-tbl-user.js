'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      userId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moduleId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'modules',
          key: 'moduleId'
        }
      },
      roleId: {
        type: Sequelize.INTEGER
      },
      role: {
        type: Sequelize.STRING
      },
      module: {
        type: Sequelize.STRING
      },
      userName: {
        type: Sequelize.STRING
      },
      loginName: {
        type: Sequelize.STRING
      },
      userPassword: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
    paranoid: false,
    underscored: false,
    freezeTableName: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  }
};