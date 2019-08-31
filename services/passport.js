const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});


passport.use(new LocalStrategy((username, password, done)  => {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false, { message: 'Unknown user' }); }
      
      bcrypt.compare(password, user.password, function(err, res) {
        if (err) {
          return done(null, false); 
        }
        if(res) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Invalid password' }); 
        }
      });
    });
  }
));

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      const { id , emails: [{ value: email }], displayName: fullName } = profile;
      const existingUser = await User.findOne({ googleId: id })
      
      if (existingUser) {
        return done(null, existingUser);
      } 

      const updatingUser = await User.findOneAndUpdate({ email }, { googleId: id }, {new: true});
    
      if (updatingUser) {
        return done(null, updatingUser);
      }


      const user = await new User({ googleId: id, email, fullName}).save()
      done(null, user); 
    }
  )
);

passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    const { id , emails: [{ value: email }], displayName: fullName } = profile;
    const existingUser = await User.findOne({ facebookId: id })
    
    if (existingUser) {
      return done(null, existingUser);
    }

    const updatingUser = await User.findOneAndUpdate({ email }, { facebookId: id }, {new: true});
    
    if (updatingUser) {
      return done(null, updatingUser);
    }
    
    const user = await new User({ facebookId: id, email, fullName }).save()
    done(null, user); 
  }
));