module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'meetups',
      [
        {
          title: 'Meetup de React Native',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec vehicula turpis. Curabitur ac nunc aliquet, cursus tellus fringilla, hendrerit sem. ',
          location: 'New Camp',
          date: new Date(),
          banner_id: 2,
          user_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          title: 'Meetup de Node Js',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec vehicula turpis. Curabitur ac nunc aliquet, cursus tellus fringilla, hendrerit sem. ',
          location: 'New Camp',
          date: new Date(),
          banner_id: 2,
          user_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('meetups', null, {}),
};
