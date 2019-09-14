module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Admin',
          email: 'admin@admin.com',
          password_hash:
            '$2a$08$Igg5.N4NyZIYlziMNgkQlekr2D1CHbOltURtRmSKrRoupBOGKMgYq',
          created_at: new Date(),
          updated_at: new Date(),
          avatar_id: '1',
        },
        {
          name: 'Jon Doe',
          email: 'user@user.com',
          password_hash:
            '$2a$08$Igg5.N4NyZIYlziMNgkQlekr2D1CHbOltURtRmSKrRoupBOGKMgYq',
          created_at: new Date(),
          updated_at: new Date(),
          avatar_id: '1',
        },
      ],
      {}
    ),

  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('users', null, {}),
};
