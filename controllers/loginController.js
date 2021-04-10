const passport = require('passport');
const jwt = require('jsonwebtoken');

exports.index = (req, res) => res.json("this is working");


exports.login = function (req, res) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
          if (err || !user) {
              return res.status(400).json({
                  message: 'Something is not right',
                  user : user
              });
          }
  
  req.login(user, {session: false}, (err) => {
  
  // generate a signed son web token with the contents of user object and return it in the response
  
  const token = jwt.sign({ user }, 'your_jwt_secret');
             return res.json({user, token});
          });
      })(req, res);
  };
