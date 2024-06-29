// controllers/userController.js
const User = require('../models/userModel');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const users = await User.getAllUsers(); // Implement this function in userModel
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async getUserById(req, res) {
        const { id } = req.params;
        try {
            const user = await User.getUserById(id); // Implement this function in userModel
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async createUser(req, res) {
        const { username, email, password } = req.body;

        try {
            const newUser = await User.createUser(username, email, password); // Implement this function in userModel
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async updateUser(req, res) {
        const { id } = req.params;
        const { username, email, password } = req.body;

        try {
            const updatedUser = await User.updateUser(id, username, email, password); // Implement this function in userModel
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    async deleteUser(req, res) {
        const { id } = req.params;

        try {
            const deletedUser = await User.deleteUser(id); // Implement this function in userModel
            res.json(deletedUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
