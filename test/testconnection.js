require('dotenv').config();
const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

knex.raw('SELECT 1')
  .then(() => {
    console.log('Database connection successful');
    knex.destroy();
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    knex.destroy();
  });
