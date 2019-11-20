'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('modules', {
      moduleId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      moduleName: {
        type: Sequelize.STRING
      },
      moduleDescription: {
        type: Sequelize.STRING
      },
      moduleCode: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.STRING
      }
     
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('modules');
  }
};