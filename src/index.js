// src/index.js
const express = require('express');
const cors = require('cors');  // Import cors package
const sequelize = require('./models');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Routes
app.use('/api', todoRoutes);

// Sync Database and Start Server
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(error => {
    console.error('Unable to connect to the database:', error);
});
