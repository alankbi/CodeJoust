const { ExtractJwt } = require('passport-jwt');
const JwtStrategy = require('passport-jwt').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_OR_KEY,
};

function passportConfiguration(passport) {
  passport.use(new JwtStrategy(options, (jwtPayload, done) => {
    User.findById(jwtPayload.id).then((user) => {
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    }).catch(err => done(err, false));
  }));
}

module.exports = { passportConfiguration };
