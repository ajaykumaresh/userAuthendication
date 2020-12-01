const Strategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const userRole = require('../model/userRole');
const atob = require('atob');
const security = require('../security/securitySetup');
const localstrategy = new Strategy({
        passReqToCallback: true,
        passwordField: 'username',
    },
    function (req, username, password, done) {
        if (req.headers['authorization']) {
            let auth = req.headers.authorization.split("Basic ");

            let token = atob(auth[1]).split(":");
            email = token[0];
            password = token[1];
            console.log(token)
        }
        if (email && password) {

            userRole.findOne({
                email: `${email}`
            }).then(async (user, err) => {
                if (err) {
                    return done(err, null)
                }
                if (!user) {
                    return done("We could not find the user", null)
                }
                const passwordVerify = bcrypt.compareSync(password, user.password)

                if (!passwordVerify) {
                    return done("Email or Password not vaild", null)
                }
                if (passwordVerify) {
                    return done(null, user)
                }
            })
        } else {
            if (!email) return done("Enter Email address", null)
            if (!password) return done("Enter password", null)
        }

        // User.findOne({
        //     username: username
        // }, function (err, user) {
        //     if (err) {
        //         return done(err);
        //     }
        //     if (!user) {
        //         return done(null, false);
        //     }
        //     if (!user.verifyPassword(password)) {
        //         return done(null, false);
        //     }
        //     return done(null, user);
        // });
    }
);
module.exports = localstrategy;