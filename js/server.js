// // routes/orders.js
// const express = require('express');
// const router = express.Router();
// const { Order, OrderItem } = require('../models');

// // Create new order
// router.post('/', async (req, res) => {
//   try {
//     const { userId, items, total } = req.body;
    
//     const order = await Order.create({
//       user_id: userId,
//       total: total,
//       status: 'pending'
//     });

//     const orderItems = items.map(item => ({
//       order_id: order.id,
//       menu_item_id: item.id,
//       quantity: item.quantity,
//       price: item.price
//     }));

//     await OrderItem.bulkCreate(orderItems);

//     res.status(201).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });