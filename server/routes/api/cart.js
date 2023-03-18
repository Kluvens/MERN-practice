const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Verify token middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.post('/addToCart', verifyToken, async (req, res) => {
  const { userId, itemId, itemName, itemDescription, itemPrice } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const index = cart.items.findIndex((item) => item.id === itemId);

    if (index !== -1) {
      cart.items[index].quantity += 1;
    } else {
      cart.items.push({
        id: itemId,
        name: itemName,
        description: itemDescription,
        price: itemPrice,
        quantity: 1,
      });
    }

    cart.total = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
