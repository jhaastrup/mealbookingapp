const bcrypt = require('bcryptjs');

const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fullName: process.env.ADMINNAME,
        email: process.env.ADMINEMAIL,
        username: process.env.ADMINUSER,
        password: bcrypt.hashSync(process.env.ADMINPASS, bcrypt.genSaltSync(8)),
        userType: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullName: 'Janet',
        email: 'janet@gmail.com',
        username: 'janneett',
        password: bcrypt.hashSync('janetto', bcrypt.genSaltSync(8)),
        userType: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', null, {});
  }
};
