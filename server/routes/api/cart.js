const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.redirect("/login");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.redirect("/login");
    }
    req.user = user;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

// @route   POST /api/cart
// @desc    Add a product to cart
// @access  Private
router.post('/addToCart', authMiddleware, async (req, res) => {
  const { name, description, price, quantity } = req.body;
  const user = req.user.id;

  try {
    let cart = await Cart.findOne({ user });

    // If cart does not exist, create a new cart
    if (!cart) {
      cart = new Cart({
        user,
        products: [{ name, description, price, quantity }]
      });

      await cart.save();

      return res.status(201).json({ message: 'Product added to cart' });
    }

    // If cart exists, check if product already exists in cart
    const productIndex = cart.products.findIndex(product => product.name === name);

    if (productIndex !== -1) {
      // If product exists, update quantity
      cart.products[productIndex].quantity += quantity;
    } else {
      // If product does not exist, add to cart
      cart.products.push({ name, description, price, quantity });
    }

    await cart.save();

    res.json({ message: 'Product added to cart' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;