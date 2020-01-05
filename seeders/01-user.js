'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    let data = [
      {
        username : "Gordon Ramsey",
        email : "test@gmail.com",
        password : "user"
      }
    ];
    data.map(item => {
      item.createdAt = Sequelize.literal('NOW()');
      item.updatedAt = Sequelize.literal('NOW()');
      return item;
    });
    return queryInterface.bulkInsert('Users', data, {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
