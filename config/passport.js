const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const Article = require('../models/article');
const bcrypt = require('bcryptjs');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user)
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" })
        }
      })
    });
  }
));

// passport.use(
//     new LocalStrategy((username, password, done) => {
//       User.findOne({ username: username }, (err, user) => {
//         if (err) { 
//           return done(err);
//         };
//         if (!user) {
//           return done(null, false, { message: "Incorrect username" });
//         }
//         bcrypt.compare(password, user.password, (err, res) => {
//           if (res) {
//             // passwords match! log user in
//             return done(null, user)
//           } else {
//             // passwords do not match!
//             return done(null, false, { message: "Incorrect password" })
//           }
//         })
//         return done(null, user);
//       });
//     })
//   );

  
// jwt
const passportJWT = require("passport-jwt");
const JWTStrategy   = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : process.env.SECRET_KEY,
    },
    function (jwtPayload, cb) {
        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        // don't need to do this   
        // User.findOne({username: jwtPayload.user.username })
        //     .then(user => {
        //         if (user.username === "Hamlet") {
        //           return cb(null, user);
        //         }
        //     })
        //     .catch(err => {
        //         return cb(err);
        //     }); 
        return cb (null, jwtPayload)
        
}));
