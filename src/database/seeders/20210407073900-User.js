'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Solange Iyubu',
        email: 'siyubu@exam.com',
        smsWindow:3,
        emailWindow:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Irembo',
        email: 'irembo@test.com',
        smsWindow:3,
        emailWindow:2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};

