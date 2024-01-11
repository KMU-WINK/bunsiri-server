const passport = require('passport');
const google = require('./googleStrategy');
const userService = require('../services/userService');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.googleProfile._json.email);
    });

    passport.deserializeUser((id, done) => {
        userService.getUserByEmail(id)
            .then(user => done(null, user))
            .catch(error => done(error));
    });

    google();
}