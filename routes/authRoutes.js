const passport = require('passport');
const { check, validationResult, body } = require('express-validator/check');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = mongoose.model('users');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['email', 'profile']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res)  => {
    res.redirect('/');
  });

  app.get('/auth/facebook', passport.authenticate('facebook'));

  app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    res.send(req.user);
  });

  app.post('/api/register', [
    check('email').isEmail(),
    body('email').custom(async (email) => {
      const user = await User.where('password').exists(true).findOne({ email });
      if (user) {
        return Promise.reject('E-mail already in use');
      }
    }),
    check('password')
      .isLength({ min: 5 })
      .withMessage('must be at least 5 chars long')
      .matches(/\d/).withMessage('must contain a number'),
    check('firstName').isLength({ min: 3 }).withMessage('must be at least 3 chars long'),
    check('lastName').isLength({ min: 3 }).withMessage('must be at least 3 chars long')
    ], async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }

      let { email, firstName, lastName, password } = req.body;
      const salt = bcrypt.genSaltSync(10);
      password = bcrypt.hashSync(password, salt);

      let user = await User.findOneAndUpdate({ email }, { firstName, lastName, password });
      if (!user) {
        user = await User.create({firstName, lastName, email, password});
      };
      res.send({ success: true });
  });

};
