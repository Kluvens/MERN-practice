const express = require('express');
const router = express.Router();

// Load User model
const User = require('../../models/User');

const validateRegisterInput = require('../../validation/Register');

const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

router.post('/login', function(req, res) {
  User.findOne({email: req.body.email}).then(function(user) {
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        req.session.accout_type = 'customer';
        req.session.user_id = user_id;
        res.status(200).send({user: user.name, account_type: 'customer'});
      } else {
        res.status(401).send("Oh, something went wrong");
      }
    } else {
      res.status(401).send("Oh, something went wrong");
    }
  }).catch(error => {
    res.status(501).send("error");
  });
});

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', (req, res) => {
  // Validate input data
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if user already exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      // Create new user
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({ user }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

module.exports = router;