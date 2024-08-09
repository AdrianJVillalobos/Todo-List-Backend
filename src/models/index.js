// src/models/index.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',  // In-memory SQLite database
    logging: false,       // Disable logging for cleaner output
});

module.exports = sequelize;
