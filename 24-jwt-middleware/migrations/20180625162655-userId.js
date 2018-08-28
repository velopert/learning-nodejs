module.exports = {
  up: (queryInterface, Sequelize) => [
    queryInterface.addColumn('posts', 'userId', {
      type: Sequelize.INTEGER,
    }),
    queryInterface.addConstraint('posts', ['userId'], {
      type: 'foreign key',
      name: 'posts_user_fk',
      references: {
        table: 'users',
        field: 'id',
      },
    }),
  ],
  /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */

  down: async (queryInterface, Sequelize) => [
    queryInterface.removeColumn('posts', 'userId'),
    queryInterface.removeConstraint('posts', 'posts_user_fk'),
  ],
};
