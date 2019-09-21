module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'default1',
          path: 'https://api.adorable.io/avatars/80/abott@adorable.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'default2',
          path: 'https://picsum.photos/id/979/940/300',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('files', null, {}),
};
