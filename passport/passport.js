var passport = require('passport');
var jwt = require('jsonwebtoken');
var bearerStrategy = require('passport-http-bearer');
var User = require('../models/userSchema');


passport.use(new bearerStrategy(function (token, done) {
    jwt.verify(token, "HS384"), function (err, decoded) {
        if (err) return (err);
        if (decoded) {
            User.findOne({ token: token }, function (err, users) {
                if (err) { return done(err); }
                if (!users) { return done(null, false); }
                return done(null, users);
            });
        }
    }
})
);