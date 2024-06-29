const knex = require('knex')(require('../../knexfile')[process.env.NODE_ENV || 'development']);

module.exports = {
  async getAllUsers() {
    try {
      return await knex('users').select('*');
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  async getUserById(id) {
    try {
      return await knex('users').where({ id }).first();
    } catch (error) {
      throw new Error(`Error fetching user by ID ${id}: ${error.message}`);
    }
  },

  async createUser(username, email, password) {
    try {
      return await knex('users').insert({ username, email, password }).returning('*');
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  async updateUser(id, username, email, password) {
    try {
      const updatedCount = await knex('users')
        .where({ id })
        .update({ username, email, password });

      if (updatedCount === 0) {
        return null;
      }

      return { id, username, email, password };
    } catch (error) {
      throw new Error(`Error updating user with ID ${id}: ${error.message}`);
    }
  },

  async deleteUser(id) {
    try {
      return await knex('users').where({ id }).del();
    } catch (error) {
      throw new Error(`Error deleting user with ID ${id}: ${error.message}`);
    }
  },

  async findUserByEmail(email) {
    try {
      return await knex('users').where({ email }).first();
    } catch (error) {
      throw new Error(`Error fetching user by email: ${error.message}`);
    }
  },
};
