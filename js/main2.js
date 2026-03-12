// // server.js
// const express = require('express');
// const cors = require('cors');
// const sequelize = require('./config/database');
// const authRoutes = require('./routes/auth');
// const menuRoutes = require('./routes/menu');
// const orderRoutes = require('./routes/orders');

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/menu', menuRoutes);
// app.use('/api/orders', orderRoutes);

// // Database connection
// sequelize.sync()
//   .then(() => {
//     app.listen(5000, () => {
//       console.log('Server running on port 5000');
//     });
//   })
//   .catch(err => console.log(err));