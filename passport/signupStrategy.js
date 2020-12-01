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
        }
        else {
            return done("Authorization failed", null)
        }
        if (email && password) {

            userRole.findOne({
                email: `${email}`
            }).then(async (user, err) => {

                console.log({
                    user,
                    err,
                    email
                })
                if (err) {
                    return done(err, null)
                } else if (user) {
                    return done('User already exists', null)
                } else {
                    console.log(password)
                    let {
                        username,
                        phonenumber,
                        role,
                    } = req.body,
                        date = new Date();

                    let data = {
                        password: await bcrypt.hash(password, security.Round),
                        email: email,
                        phoneNumber: phonenumber,
                        name: username,
                        role: role,
                        isActivate:true,
                        date: date.toISOString()
                    }
                    let userModel = new userRole(data);
                    userModel
                        .save()
                        .then(sucess => {
                            console.log(sucess);
                            return done(null, sucess)
                        })
                        .catch(err => {
                            return done(err, null)
                        });
                    console.log(user)
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