
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert(
    'Users',
    [
      {
        name: 'Solange Iyubu',
        email: 'siyubu@exam.com',
        DsmsWindow:3,
        DemailWindow:2,
        MsmsWindow:13,
        MemailWindow:12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Irembo',
        email: 'irembo@test.com',
        DsmsWindow:3,
        DemailWindow:2,
        MsmsWindow:13,
        MemailWindow:12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    {},
  ),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Users', null, {}),
};

