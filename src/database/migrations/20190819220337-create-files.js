module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('files', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        default: 'default',
      },
      path: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        default: 'https://api.adorable.io/avatars/80/abott@adorable.png',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        default: new Date(),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        default: new Date(),
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('files');
  },
};
