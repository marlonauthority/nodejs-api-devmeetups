module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'subscribers',
      [
        {
          meetup_id: 1,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          meetup_id: 2,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('subscribers', null, {}),
};
