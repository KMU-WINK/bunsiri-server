const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userService = require('../services/userService')
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = () => {
    passport.use('google', new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:8888/users/auth/google/callback",
    },async (accessToken, refreshToken, profile, done) => {
        console.log(accessToken)

        try{
            const exUser = await userService.getUserById(profile.email);

            if (exUser){
                return done(null, exUser);
            } else {
                return done(null, { googleProfile: profile });
            }
        } catch (error) {
            done(error);
        }
    }))
}